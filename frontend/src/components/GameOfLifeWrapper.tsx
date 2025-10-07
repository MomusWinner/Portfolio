"use client";

// import GameOfLife from '@/components/GameOfLife';
import dynamic from "next/dynamic";

const HorizontalModule = dynamic(
  () => import("@/components/GameOfLife").then((mod) => mod.default),
  {
    ssr: false,
    // suspense: true,
    loading: () => <p>. . .</p>,
  }
);

export default function PortfolioGameWrapper() {
  return <HorizontalModule />;
}
