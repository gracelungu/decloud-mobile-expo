import React, { useState } from "react";
import { StatusBar, Switch, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import WalletIcon from "../../assets/icons/Wallet.svg";
import ContractIcon from "../../assets/icons/Contract.svg";
import EthereumIcon from "../../assets/icons/ethereum.svg";
import CloudIcon from "../../assets/icons/Cloud.svg";
import RemoveIcon from "../../assets/icons/Remove.svg";
import styles from "./styles";
import colors from "../../styles/colors";
import authAtom from "../../store/atoms/auth";
import { useAtom } from "jotai";
import shortenAddress from "../../helpers/shortenAddress";
import cloudAtom from "../../store/atoms/cloud";
import { getContractWithSigner, loadContract } from "../../web3";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import useLogin from "../../hooks/useLogin";

function SettingsScreen() {
  const [{ connected }] = useAtom<any>(authAtom);
  const { connectWallet, killSession } = useLogin();
  const [loading, setLoading] = useState(false);
  const connector = useWalletConnect();
  const [
    {
      accounts: [account],
    },
  ] = useAtom<any>(authAtom);
  const [{ address: cloudAddress }] = useAtom<any>(cloudAtom);

  const transferOwnership = async () => {
    const contract = await loadContract(connector);
    const contractWithSigner = await getContractWithSigner(connector, contract);
    await contractWithSigner.transferOwnership(account, {
      gasLimit: 3000000,
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Connected Wallet</Text>
            <View style={styles.itemSubContainer}>
              <WalletIcon width={s(18)} height={s(18)} />
              <Text style={styles.itemSubtitle}>
                {account ? shortenAddress(account) : ""}
              </Text>
            </View>

            {!connected && (
              <TouchableOpacity onPress={connectWallet}>
                <Text style={styles.itemButtonText}>Connect your wallet</Text>
              </TouchableOpacity>
            )}

            {connected && (
              <TouchableOpacity onPress={killSession}>
                <Text style={styles.itemButtonText}>
                  Disconnect your wallet
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Cloud address</Text>
            <View style={styles.itemSubContainer}>
              <ContractIcon width={s(18)} height={s(18)} />
              <Text style={styles.itemSubtitle}>
                {cloudAddress ? shortenAddress(cloudAddress) : ""}
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Network</Text>
            <View style={styles.itemSubContainer}>
              <EthereumIcon width={s(18)} height={s(18)} />
              <Text style={styles.itemSubtitle}> Ropsten test network</Text>
            </View>
          </View>

          {/* {cloudAddress && (
            <TouchableOpacity
              style={[styles.itemContainer, styles.action]}
              onPress={transferOwnership}
              disabled
            >
              <Text style={[styles.itemSubtitle, styles.actionText]}>
                Transfer ownership
              </Text>
            </TouchableOpacity>
          )} */}

          <Text style={[styles.title, { paddingTop: s(30) }]}>
            Synchronization
          </Text>

          <View style={styles.itemContainer}>
            <View style={styles.itemSubContainer}>
              <CloudIcon width={s(18)} height={s(18)} />
              <View style={styles.titleContainer}>
                <Text style={styles.itemSubtitle}>
                  Automatic gallery synchronization
                </Text>

                <Switch
                  disabled
                  style={styles.switch}
                  trackColor={{ false: colors.lightGray, true: colors.primary }}
                  thumbColor={colors.white}
                  ios_backgroundColor={colors.lightGray}
                  value={false}
                />
              </View>
            </View>
            <Text style={styles.lowerText}>
              Once turned on, files added to the gallery will be automatically
              uploaded to IPFS
            </Text>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.itemSubContainer}>
              <RemoveIcon width={s(18)} height={s(18)} />
              <View style={styles.titleContainer}>
                <Text style={styles.itemSubtitle}>Delete local files</Text>

                <Switch
                  disabled
                  style={styles.switch}
                  trackColor={{ false: colors.lightGray, true: colors.primary }}
                  thumbColor={colors.white}
                  ios_backgroundColor={colors.lightGray}
                  value={false}
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
