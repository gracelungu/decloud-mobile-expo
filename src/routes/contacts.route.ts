import { CONTACTS_SCREEN } from "../constants/screens";
import Icon from "../assets/icons/Contacts.svg";
import IconActive from "../assets/icons/Contacts-filled.svg";
import ContactsScreen from "../screens/Contacts";

const contactsRouter = {
  Icon,
  IconActive,
  name: CONTACTS_SCREEN,
  component: ContactsScreen,
  options: {
    title: CONTACTS_SCREEN,
    headerShown: false,
  },
};

export default contactsRouter;
