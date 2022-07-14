import * as ContactsApi from "expo-contacts";
import { useEffect, useState } from "react";

const useContacts = () => {
  const [contacts, setContacts] = useState<any[]>();
  const getContacts = async () => {
    const { status } = await ContactsApi.requestPermissionsAsync();
    if (status === "granted") {
      const { data: contacts } = await ContactsApi.getContactsAsync({
        fields: [ContactsApi.Fields.PhoneNumbers],
      });

      setContacts(contacts);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return { contacts };
};

export default useContacts;
