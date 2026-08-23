type FieldErrorProps = {
  id: string;
  message?: string;
  className?: string;
};

function FieldError({
  id,
  message,
  className = "field-error",
}: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <span id={id} className={className} role="alert">
      {message}
    </span>
  );
}

export default FieldError;
