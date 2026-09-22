import AuthLayout from "@/layouts/AuthLayout";
import { RegisterForm } from "@/components/auth/form/RegisterForm/RegisterForm";

export default function LoginPage() {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
}