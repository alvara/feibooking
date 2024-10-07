export function MiniSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`max-w-2xl mx-auto mb-24 px-4 sm:px-0 ${className}`}>{children}</div>;
}
