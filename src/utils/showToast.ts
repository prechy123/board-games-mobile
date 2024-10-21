import Toast from 'react-native-toast-message';

export function showSuccessToast(topic: string,message: string) {
  Toast.show({
    type: 'success',
    text1: topic,
    text2: message,
    position: "bottom",
    visibilityTime: 7000
  });
}
export function showErrorToast(topic: string,message: string) {
  Toast.show({
    type: "error",
    text1: topic,
    text2: message,
    position: "bottom",
    visibilityTime: 7000
  });
}
export function showInfoToast(topic: string,message: string) {
  Toast.show({
    type: "info",
    text1: topic,
    text2: message,
    position: "bottom",
    visibilityTime: 7000
  });
}

export function endToast() {
  Toast.hide();
}