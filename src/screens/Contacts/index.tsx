import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "react-native";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Empty from "../../components/Empty";
import Contact from "../../components/Contact";
import Sync from "../../components/Sync";
import authAtom from "../../store/atoms/auth";
import cloudAtom from "../../store/atoms/cloud";
import contactsAtom from "../../store/atoms/contacts";
import colors from "../../styles/colors";
import { getContractWithSigner, loadContract } from "../../web3";
import styles from "./styles";
import useContacts from "../../hooks/useContacts";

function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const connector = useWalletConnect();
  const [cloud] = useAtom(cloudAtom);
  const [{ connected }] = useAtom<any>(authAtom);
  const [refreshing, setRefreshing] = useState(false);
  const [{ files, unsynched }, setContacts] = useAtom<any>(contactsAtom);
  const { contacts: phoneBook } = useContacts();

  const getFiles = async () => {
    if (!connected || !cloud.address) return;

    setRefreshing(true);
    const contract = await loadContract(connector, cloud.address);
    const contractWithSigner = await getContractWithSigner(connector, contract);
    const files = await contractWithSigner.getFiles("contact", {
      gasLimit: 3000000,
    });

    const extractedFiles = files.map((file: any[]) => ({
      name: file[0],
      phoneNumbers: [{ number: file[1] }],
    }));
    setContacts({ files: extractedFiles, unsynched });
    setRefreshing(false);
  };

  const refresh = () => {
    getFiles();
  };

  const setFiles = () => {
    setContacts({ files: [...unsynched, files], unsynched: [] });
  };

  useEffect(() => {
    if (phoneBook) {
      setContacts({ files: phoneBook, unsynched: filesToSync(phoneBook) });
    }
  }, [phoneBook]);

  const filesToSync = (files: any) => {
    return unsynched.filter(
      (file: any) =>
        file.name &&
        file.phoneNumbers &&
        file.phoneNumbers.length &&
        file.phoneNumbers.length > 0 &&
        file.phoneNumbers[0].number
    );
  };

  const ListHeader = () => (
    <>
      <View style={[styles.titleContainer, { marginTop: insets.top }]}>
        <Text style={styles.title}>Contacts</Text>
        <Sync
          fileType="contact"
          files={filesToSync(unsynched)}
          setFiles={setFiles}
        />
      </View>
      <>
        {unsynched.length > 0 && (
          <Text style={styles.subtitle}>
            {unsynched.length} file(s) have not been synched.
          </Text>
        )}
        {unsynched.length === 0 && (
          <Text style={styles.subtitle}>All files have been synched</Text>
        )}
      </>
    </>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <FlatList
        onRefresh={refresh}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.black}
          />
        }
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={Empty}
        data={[...unsynched, ...files]}
        renderItem={({ item }) => <Contact contact={item} />}
        numColumns={2}
      />
    </>
  );
}

export default ContactsScreen;
