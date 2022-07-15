import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";
import SyncIcon from "../../assets/icons/Synchronize.svg";
import { DEFAULT_ADDRESS } from "../../constants/web3";
import authAtom from "../../store/atoms/auth";
import cloudAtom from "../../store/atoms/cloud";
import { getContractWithSigner, loadContract } from "../../web3";
import styles from "./styles";

type Props = {
  fileType: string;
  files: any[];
  setFiles: () => void;
};

const Sync: React.FC<Props> = ({ fileType, files, setFiles }) => {
  const connector = useWalletConnect();
  const [loading, setLoading] = useState(false);
  const [cloud, setCloud] = useAtom(cloudAtom);
  const [
    {
      connected,
      accounts: [account],
    },
  ] = useAtom<any>(authAtom);

  if (!connected || files.length === 0) return null;

  const createCloudAddress = async (contractWithSigner: any) => {
    const contractAddress = await contractWithSigner.createAddressCloud();
    setCloud({
      address: contractAddress,
    });
  };

  const checkOrCreateCloud = async () => {
    const contract = await loadContract(connector);
    const contractWithSigner = await getContractWithSigner(connector, contract);
    const response = await contractWithSigner.ownerToContract(account);

    if (response === DEFAULT_ADDRESS) {
      Alert.alert(
        "Create your private cloud",
        "Before synching you must create your private cloud address. This is the address that will be used to store your files.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Create",
            onPress: async () => await createCloudAddress(contractWithSigner),
          },
        ],
        { cancelable: true }
      );

      return false;
    }

    setCloud({
      address: response,
    });

    return true;
  };

  const synchronize = async () => {
    const isSet = await checkOrCreateCloud();
    if (!isSet) return;

    setLoading(true);

    const filesToUpload = files.map((item: any) => {
      let name = "";
      let file = "";

      if (typeof item === "string") {
        file = item;
        name = item.split("/").pop();
      }

      if (typeof item === "object") {
        name = item.name;
        if (
          item.phoneNumbers &&
          item.phoneNumbers.length &&
          item.phoneNumbers.length > 0
        ) {
          file = item.phoneNumbers[0].number;
        }
      }

      return [name, file, fileType, Date.now()];
    });

    console.log({ filesToUpload: filesToUpload.length });

    try {
      const contract = await loadContract(connector, cloud.address);
      const contractWithSigner = await getContractWithSigner(
        connector,
        contract
      );
      await contractWithSigner.createFiles(fileType, filesToUpload, {
        gasLimit: 3000000,
      });
    } catch (e) {
      console.log(e);
    }

    setFiles();
    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={synchronize}
      disabled={loading}
    >
      {!loading && (
        <>
          <SyncIcon width={18} height={18} />
          <Text style={styles.text}>Synchronize</Text>
        </>
      )}

      {loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
};

export default Sync;
