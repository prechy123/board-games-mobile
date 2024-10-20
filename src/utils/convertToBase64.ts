import * as FileSystem from "expo-file-system";

const convertToBase64 = async (uri: string) => {
  const response = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return `data:image/jpeg;base64,${response}`; // Adjust the MIME type based on your image
};

export default convertToBase64;
