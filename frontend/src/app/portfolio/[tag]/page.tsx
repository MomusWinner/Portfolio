import { Analitic } from "@/components/Analitic";
import Portfolio from "@/components/Portfolio";
import React from "react";

interface PortfolioParams {
  params: Promise<{ tag: string }>;
}

export default function HomeId({ params }: PortfolioParams) {
  const { tag } = React.use(params);

  return (
    <>
      <Analitic tag={tag} />
      <Portfolio />
    </>
  );
}
