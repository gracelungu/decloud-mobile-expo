import React from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import WalletIcon from "../../assets/icons/Wallet.svg";
import ContractIcon from "../../assets/icons/Contract.svg";
import PolygonIcon from "../../assets/icons/Polygon.svg";
import CloudIcon from "../../assets/icons/Cloud.svg";
import RemoveIcon from "../../assets/icons/Remove.svg";
import styles from "./styles";
import colors from "../../styles/colors";

function SettingsScreen() {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Connected Wallet</Text>
            <View style={styles.itemSubContainer}>
              <WalletIcon width={s(18)} height={s(18)} />
              <Text style={styles.itemSubtitle}> EF32XXXXXXXXXXC266 </Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.itemButtonText}>Login with metamask</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Cloud address</Text>
            <View style={styles.itemSubContainer}>
              <ContractIcon width={s(18)} height={s(18)} />
              <Text style={styles.itemSubtitle}> EF32XXXXXXXXXXC266 </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Network</Text>
            <View style={styles.itemSubContainer}>
              <PolygonIcon width={s(18)} height={s(18)} />
              <Text style={styles.itemSubtitle}> Polygon Matic </Text>
            </View>
          </View>

          <Text style={styles.title}>Synchronization</Text>

          <View style={styles.itemContainer}>
            <View style={styles.itemSubContainer}>
              <CloudIcon width={s(18)} height={s(18)} />
              <View style={styles.titleContainer}>
                <Text style={styles.itemSubtitle}>
                  Automatic synchronization
                </Text>

                <Switch
                  style={styles.switch}
                  trackColor={{ false: colors.lightGray, true: colors.primary }}
                  thumbColor={colors.white}
                  ios_backgroundColor={colors.lightGray}
                  value={true}
                />
              </View>
            </View>
            <Text style={styles.lowerText}>
              Once turned on, added files will be automatically uploaded to IPFS
            </Text>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.itemSubContainer}>
              <RemoveIcon width={s(18)} height={s(18)} />
              <View style={styles.titleContainer}>
                <Text style={styles.itemSubtitle}>Delete local files</Text>

                <Switch
                  style={styles.switch}
                  trackColor={{ false: colors.lightGray, true: colors.primary }}
                  thumbColor={colors.white}
                  ios_backgroundColor={colors.lightGray}
                  value={true}
                />
              </View>
            </View>
            <Text style={styles.lowerText}>
              Once a file is deleted, both the cloud and local versions will be
              erased.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default SettingsScreen;
