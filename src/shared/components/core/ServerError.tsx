interface ServerErrorProps {
  message?: string;
}

export function ServerError({ message }: ServerErrorProps) {
  return (
    <div className="bg-red-800 text-white rounded-xl p-3 my-6">
      {message || "A server error occurred!"}
    </div>
  );
}
