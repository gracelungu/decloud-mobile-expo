import createAtomWithPersistence from "./utils";

const contactsAtom = createAtomWithPersistence("contacts", {
  files: [],
  unsynched: [],
});

export default contactsAtom;
