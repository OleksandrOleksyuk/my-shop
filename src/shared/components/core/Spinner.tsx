import { useEffect, useState } from "react";

export function Spinner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const debounce = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(debounce);
  }, [setShow]);
  return show ? (
    <div className="flex w-full justify-center items-center py-2">
      <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    </div>
  ) : null;
}
