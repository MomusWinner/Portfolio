import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
};

export default function PortfolioImage({ src, alt }: Props) {
  return (
    <div className="flex justify-center">
      <Image
        className="w-full h-auto"
        src={src}
        alt={alt}
        priority
        width={0}
        height={0}
        sizes="100vw"
      />
    </div>
  );
}
