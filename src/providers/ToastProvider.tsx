import React from "react";
import { RootSiblingParent } from 'react-native-root-siblings';

export default function ToastProvider({children}: {children: React.ReactNode}) {
    return( 
        <RootSiblingParent>
            {children}
        </RootSiblingParent>
    )
}