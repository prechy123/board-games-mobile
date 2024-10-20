import React from "react";
import Toast from "react-native-toast-message";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toast />
    </>
  );
}
