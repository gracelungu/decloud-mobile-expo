import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = { ...createJSONStorage(() => AsyncStorage), delayInit: true };
const createAtomWithPersistence = (key: string, data: any) =>
  atomWithStorage(key, JSON.stringify(data), storage);

export default createAtomWithPersistence;
