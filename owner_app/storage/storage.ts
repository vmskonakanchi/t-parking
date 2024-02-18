import { MMKVLoader, create } from "react-native-mmkv-storage";

const storage = new MMKVLoader().initialize();

const useStorage = create(storage);

export default useStorage;
