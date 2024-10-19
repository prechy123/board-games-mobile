import React from "react";
import PaperProvider from "./PaperProvider";

export default function AllProvider({children}: {children: React.ReactNode}) {
    return (
        <PaperProvider>
            {children}
        </PaperProvider>
    )
}