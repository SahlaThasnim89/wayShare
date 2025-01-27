import { GreenButtonProps } from "../types/greenButtonTypes";

const GreenButton = ({ type = 'submit', className, children }:GreenButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-green-600 text-white my-3 py-3 px-4 rounded-full w-full ${className}`}
    >
      {children}
    </button>
  );
};

export default GreenButton;