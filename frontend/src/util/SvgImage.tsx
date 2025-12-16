type SVGIconProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  className?: string;
};

export function SVGImage({ Icon, size = 40, className }: SVGIconProps) {
  return <Icon width={size} height={size} className={className} />;
}
