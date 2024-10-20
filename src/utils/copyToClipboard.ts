import { setStringAsync } from "expo-clipboard";

const copyToClipboard = async (value: string) => {
  await setStringAsync(value);
};

export default copyToClipboard;
