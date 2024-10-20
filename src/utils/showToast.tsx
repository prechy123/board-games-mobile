import Toast from 'react-native-toast-message';

export function showSuccessToast(topic: string,message: string) {
  Toast.show({
    type: 'success',
    text1: topic,
    text2: message,
    position: "bottom"
  });
}
export function showErrorToast(topic: string,message: string) {
  Toast.show({
    type: "error",
    text1: topic,
    text2: message,
    position: "bottom"
  });
}
export function showInfoToast(topic: string,message: string) {
  Toast.show({
    type: "info",
    text1: topic,
    text2: message,
    position: "bottom"
  });
}

export function endToast() {
  Toast.hide();
}