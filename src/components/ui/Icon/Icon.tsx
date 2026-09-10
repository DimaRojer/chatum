type IconProps = {
    name: string;
    width?: number;
    height?: number;
    className?: string;
};

export const Icon = ({ name, width = 24, height = 24, className }: IconProps) => (
    <svg className={className} width={width} height={height} color="inherit">
        <use href={`/spritemap.svg#${name}`} />
    </svg>
);