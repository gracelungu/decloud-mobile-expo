import React, { useEffect } from "react";
import styles from "./styles";
import HandIllustration from "../../assets/illustrations/hand.svg";
import { Text, View } from "react-native";
import { s } from "react-native-size-matters";
import { useAtom } from "jotai";
import Button from "../Button";
import useLogin from "../../hooks/useLogin";
import authAtom from "../../store/atoms/auth";

function Empty() {
  const [{ connected }] = useAtom<any>(authAtom);
  const { connectWallet, killSession } = useLogin();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HandIllustration width={s(200)} height={s(200)} />

        {!connected && (
          <Text style={styles.text}>
            Connect your preferred wallet to upload and access your files
          </Text>
        )}

        {connected && (
          <Text style={styles.text}>No files have been uploaded yet!</Text>
        )}

        {!connected && (
          <Button title="Connect your wallet" onPress={connectWallet} />
        )}

        {connected && (
          <Button title="Disconnect your wallet" onPress={killSession} />
        )}
      </View>
    </View>
  );
}

export default Empty;
