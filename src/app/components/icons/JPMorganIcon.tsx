import Image from "next/image";

interface IconProps {
    width?: number;
    height?: number;
}

export function JPMorganIcon({ width = 40, height = 40 }: IconProps) {
  return (
      <Image
          src="/JPMorgan_logo.svg"
          alt="JPMorgan Logo"
          width={width}
          height={height}
      />
  );
}
