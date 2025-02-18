

interface RideInputProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RideInput: React.FC<RideInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="bg-slate-900 h-16 w-full text-white px-10"
      type="text"
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
    />
  );
};

export default RideInput;