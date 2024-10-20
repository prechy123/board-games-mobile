import React from "react";
import PaperProvider from "./PaperProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import AuthProvider from "./AuthProvider";

export default function AllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ToastProvider>
        <PaperProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PaperProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
