import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import SyncIcon from "../../assets/icons/Synchronize.svg";
import styles from "./styles";

function Sync() {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  useEffect(() => {
    console.log(connector.accounts);
  }, [connector]);

  return (
    <TouchableOpacity style={styles.container} onPress={connectWallet}>
      <SyncIcon width={20} height={20} />
      <Text style={styles.text}>Synchronize</Text>
    </TouchableOpacity>
  );
}

export default Sync;
