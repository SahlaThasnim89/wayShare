

const RideInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      className="bg-slate-900 h-16 w-full text-white px-10"
      type="text"
      placeholder={placeholder}
    />
  );
};

export default RideInput;