import AuthLayout from "@/layouts/AuthLayout";
import { RegisterForm } from "@/components/auth/form/RegisterForm/RegisterForm";
import { LoginForm } from "@/components/auth/form/LoginForm/LoginForm";
export default function LoginPage() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}