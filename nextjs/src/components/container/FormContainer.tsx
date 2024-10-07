interface FormContainerProps {
  headerHTML?: string;
  header?: React.ReactNode;
  body?: React.ReactNode;
  onSubmit?: (data: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function FormContainer({ headerHTML, header, body, onSubmit }: FormContainerProps) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        {/* form header */}
        {(headerHTML || header) && (
          <div
            className={`px-6 py-6 font-mono sm:text-center `}
            dangerouslySetInnerHTML={headerHTML ? { __html: headerHTML } : undefined}
          >
            {header}
          </div>
        )}

        {/* form container */}
        <div className="px-6 py-0 sm:mb-16 ">
          <div className="mx-auto ">{body}</div>
        </div>
      </div>
    </form>
  );
}
