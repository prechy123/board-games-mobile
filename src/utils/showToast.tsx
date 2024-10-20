import Toast from "react-native-root-toast";

export function showToastShort(message: string): string {
  return Toast.show(message, {
    duration: Toast.durations.SHORT,
  });
}

export function showToastLong(message: string) : string {
  return Toast.show(message, {
    duration: Toast.durations.LONG,
  });
}

export function endToast(id: string) {
  Toast.hide(id);
}