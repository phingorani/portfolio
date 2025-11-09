import Image from 'next/image';

interface SteamIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SteamIcon({ width = 24, height = 24, className }: SteamIconProps) {
  return (
    <Image
      src="/Steam_icon_logo.svg"
      alt="Steam Logo"
      width={width}
      height={height}
      className={className}
    />
  );
}
