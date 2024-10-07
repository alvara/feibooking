export function ModalContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={` max-w-3xl p-8  mx-auto bg-white rounded-xl  ${className}`}>{children}</div>
  );
}
