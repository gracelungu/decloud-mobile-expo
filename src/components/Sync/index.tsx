import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";
import SyncIcon from "../../assets/icons/Synchronize.svg";
import authAtom from "../../store/atoms/auth";
import cloudAtom from "../../store/atoms/cloud";
import { getContract, getProvider } from "../../web3";
import styles from "./styles";

function Sync() {
  const [loading, setLoading] = useState(false);
  const [cloud, setCloud] = useAtom(cloudAtom);
  const [contract, setContract] = useState<any>(null);
  const [{ connected }] = useAtom<any>(authAtom);

  if (!connected) return null;

  const connector = useWalletConnect();

  const loadContract = async () => {
    setLoading(true);
    const response = await getContract(connector);
    setContract(response);
    setLoading(false);
  };

  const getContractWithSigner = async () => {
    const provider = await getProvider(connector);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    return contractWithSigner;
  };

  const checkOrCreateCloud = async () => {
    if (!contract) return;
    const response = await contract.getOwnerAddressCloud();

    console.log({ response });

    const contractWithSigner = await getContractWithSigner();

    if (response === "0x0000000000000000000000000000000000000000") {
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
            onPress: async () => {
              const contractAddress =
                await contractWithSigner.createAddressCloud();
              setCloud({
                address: contractAddress,
              });
            },
          },
        ],
        { cancelable: true }
      );

      return;
    }

    setCloud({
      ...cloud,
      address: response,
    });
  };

  useEffect(() => {
    loadContract();
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={checkOrCreateCloud}>
      {!loading && (
        <>
          <SyncIcon width={18} height={18} />
          <Text style={styles.text}>Synchronize</Text>
        </>
      )}

      {loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
}

export default Sync;
