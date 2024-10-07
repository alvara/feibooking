type SeverityType = 'success' | 'info' | 'warning' | 'error';

export function Alert({
  severity,
  children,
}: {
  severity: SeverityType;
  children: React.ReactNode;
}) {
  const stylesMap: Record<
    SeverityType,
    { bgColor: string; textColor: string; icon: string; alt: string }
  > = {
    success: {
      bgColor: 'bg-[#DFF2BF]',
      textColor: 'text-[#4F8A10]',
      icon: '/img/success-icon.png',
      alt: 'success icon',
    },
    info: {
      bgColor: 'bg-[#BDE5F8]',
      textColor: 'text-[#00529B]',
      icon: '/img/info-icon.png',
      alt: 'info icon',
    },
    warning: {
      bgColor: 'bg-[#FEEFB3]',
      textColor: 'text-[#9F6000]',
      icon: '/img/warning-icon.png',
      alt: 'warning icon',
    },
    error: {
      bgColor: 'bg-[#FDE5E5]',
      textColor: 'text-[#D11]',
      icon: '/img/alert-icon.png',
      alt: 'error icon',
    },
  };

  const currentStyle = stylesMap[severity];

  return (
    <div
      className={`flex items-center p-4  gap-6 ${currentStyle.bgColor} ${currentStyle.textColor}`}
    >
      <img className="w-[2.5rem]" src={currentStyle.icon} alt={currentStyle.alt} />
      <div>{children}</div>
    </div>
  );
}
