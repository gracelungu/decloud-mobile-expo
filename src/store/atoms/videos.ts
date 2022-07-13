import createAtomWithPersistence from "./utils";

const videosAtom = createAtomWithPersistence("videos", {
  files: [],
  unsynched: [],
});

export default videosAtom;
