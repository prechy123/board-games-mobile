import React from "react";
import PaperProvider from "./PaperProvider";
import ThemeProvider from "./ThemeProvider";

export default function AllProvider({children}: {children: React.ReactNode}) {
    return (
        <PaperProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </PaperProvider>
    )
}