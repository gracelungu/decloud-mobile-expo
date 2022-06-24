import createAtomWithPersistence from "./utils";

const authAtom = createAtomWithPersistence("auth", {
  connected: false,
  accounts: [],
});

export default authAtom;
