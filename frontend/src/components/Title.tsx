interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Title1({ children, className = "" }: TitleProps) {
  return <h1 className={`text-4xl font-bold mb-4 ${className}`}>{children}</h1>;
}

export function Title2({ children, className = "" }: TitleProps) {
  return <h2 className={`text-3xl font-semibold mb-3 ${className}`}>{children}</h2>;
}

export function Title3({ children, className = "" }: TitleProps) {
  return (
    <div>
      <h3 className={`text-2xl font-medium mb-2 ${className}`}>{children}</h3>
      <hr />
    </div>
  );
}
