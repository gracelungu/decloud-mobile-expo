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
    await contractWithSigner.transferOwnership(account);
    setCloud({
      address: contractAddress,
    });
  };

  const checkOrCreateCloud = async () => {
    const contract = await loadContract(connector);
    const contractWithSigner = await getContractWithSigner(connector, contract);
    const response = await contractWithSigner.getOwnerAddressCloud();

    if (response === DEFAULT_ADDRESS) {
      Alert.alert(
        "Create your private cloud",
        "Do you want to create a new cloud?",
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

    const filesToUpload = files.map((photo: any) => [
      photo.split("/").pop(),
      photo,
      fileType,
      Date.now(),
    ]);

    const contract = await loadContract(connector, cloud.address);
    const contractWithSigner = await getContractWithSigner(connector, contract);
    contractWithSigner.createFiles(fileType, filesToUpload, {
      gasLimit: 3000000,
    });

    setFiles();
    setLoading(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={synchronize}>
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
