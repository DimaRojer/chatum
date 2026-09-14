import { SettingsSidebar } from "@/components/Sidebar/SettingsSidebar/SettingsSidebar";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header className="header">
                <div className="head">
                    <h1 className="head__title">
                        Настройки
                    </h1>
                </div>
            </header>

            <div className="page-wrapper">
                <SettingsSidebar />

                <div className="page-content">
                    {children}
                </div>
            </div>
        </>
    );
}