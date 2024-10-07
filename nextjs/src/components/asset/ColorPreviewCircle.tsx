export function ColorPreviewCircle({ hexColor }: { hexColor: string }) {
  return (
    <>
      <span
        className={`h-7 w-7 rounded-full border border-gray block`}
        style={{ backgroundColor: hexColor }}
      ></span>
    </>
  );
}
