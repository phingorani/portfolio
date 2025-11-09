import Image from 'next/image';

interface IconProps {
  width?: number;
  height?: number;
}

export function HyattIcon({ width = 24, height = 24 }: IconProps) {
  return (
    <Image
      src="/Hyatt_Logo.svg"
      alt="Hyatt Logo"
      width={width}
      height={height}
    />
  );
}
