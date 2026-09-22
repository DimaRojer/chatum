interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children}: AuthLayoutProps) {
    return (
        <div className="auth">
            <div className="auth__container">
                {children}
            </div>
        </div>
    );
}