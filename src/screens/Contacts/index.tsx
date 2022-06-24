import React from "react";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Contact from "../../components/Contact";
import Sync from "../../components/Sync";
import styles from "./styles";

const contacts = [
  {
    phone: "+5511999999999",
    name: "John Doe",
    picture:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
];

const ListHeader = () => (
  <>
    <Text style={styles.title}>Contacts</Text>
    <Text style={styles.subtitle}>102 contacts have not been synched</Text>
  </>
);

function ContactsScreen() {
  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={ListHeader}
        data={[...contacts, ...contacts, ...contacts]}
        renderItem={({ item }) => <Contact contact={item} />}
      />
      <Sync />
    </>
  );
}

export default ContactsScreen;
