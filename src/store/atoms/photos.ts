import createAtomWithPersistence from "./utils";

const photosAtom = createAtomWithPersistence("photos", {
  files: [],
  unsynched: [],
});

export default photosAtom;
