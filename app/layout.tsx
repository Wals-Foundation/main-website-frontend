import Page from "@/components/page/ui/page-component";
import ReduxProvider from "@/logic/store/ReduxProvider";
import React from "react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <Page children={children} />
                </ReduxProvider>
            </body>
        </html>
    )
}