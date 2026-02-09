import Image from 'next/image';

export function DepaulIcon() {
  return (
    <Image
      src="/depaul.png"
      alt="DePaul University Logo"
      width={24}
      height={24}
      loading="lazy"
    />
  );
}
