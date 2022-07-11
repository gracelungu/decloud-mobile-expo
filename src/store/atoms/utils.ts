import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = { ...createJSONStorage(() => AsyncStorage), delayInit: true };
const createAtomWithPersistence = (key: string, data: any) =>
  atomWithStorage(key, data, storage);

export default createAtomWithPersistence;
