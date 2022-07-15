import { PINATA_JWT } from "../../../credentials";
import createAtomWithPersistence from "./utils";

const settingsAtom = createAtomWithPersistence("settings", {
  pinataToken: PINATA_JWT,
});

export default settingsAtom;
