import React from "react";
import PaperProvider from "./PaperProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

export default function AllProvider({children}: {children: React.ReactNode}) {
    return (
        <PaperProvider>
            <ThemeProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </ThemeProvider>
        </PaperProvider>
    )
}