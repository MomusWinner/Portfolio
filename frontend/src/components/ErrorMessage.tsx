import React from "react";

type Props = {
  children: React.ReactNode;
};

export function ErrorMessage({ children }: Props) {
  return <h1 className={`error bg-m-red`}>{children}</h1>;
}
