export function InputLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="py-1 label">
      <span className="font-semibold ">{children}</span>
    </label>
  );
}
