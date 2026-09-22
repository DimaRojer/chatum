import "./Btn.scss";

interface BtnProps {
    type?: "button" | "submit" | "reset";
    variant?: "default" | "transparent" | "red";
    onClick?: () => void;
    children: React.ReactNode;
}

export const Btn = ({type = "button", variant = "default", children, onClick}: BtnProps) => {
    const className =
        variant === "transparent"
            ? "btn-primary btn-primary--transparent"
            : variant === "red"
                ? "btn-primary btn-primary--red"
                : "btn-primary";
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    );
};