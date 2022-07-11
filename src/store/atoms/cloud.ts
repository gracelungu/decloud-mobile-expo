import createAtomWithPersistence from "./utils";

const cloudAtom = createAtomWithPersistence("cloud", {
  address: "",
  photos: [],
});

export default cloudAtom;
