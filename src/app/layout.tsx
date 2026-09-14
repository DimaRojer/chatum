import type { Metadata } from "next";
import "./globals.css";
import "./main.scss";

export const metadata: Metadata = {
    title: "Chatum",
    description: "Рабочий чат",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode;}>) {
    return (
        <html lang="ru">
            <body>
                <main className="page">
                    {children}
                </main>  
            </body>
        </html>
    );
}