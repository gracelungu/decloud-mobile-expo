import { useAtom } from "jotai";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import SyncIcon from "../../assets/icons/Synchronize.svg";
import authAtom from "../../store/atoms/auth";
import styles from "./styles";

function Sync() {
  const [{ connected }] = useAtom<any>(authAtom);

  if (!connected) return null;

  return (
    <TouchableOpacity style={styles.container}>
      <SyncIcon width={18} height={18} />
      <Text style={styles.text}>Synchronize</Text>
    </TouchableOpacity>
  );
}

export default Sync;
