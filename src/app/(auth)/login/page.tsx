import AuthLayout from "@/layouts/AuthLayout";
import { LoginForm } from "@/components/auth/form/LoginForm/LoginForm";

export default function LoginPage() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}