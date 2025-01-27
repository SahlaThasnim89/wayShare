
const RideButton = ({ label, onClick }: { label: any; onClick?: () => void }) => {
    return (
      <button
        className="bg-slate-900 mt-3 px-9 text-white h-16 rounded-3xl"
        onClick={onClick}
      >
        {label}
      </button>
    );
  };

export default RideButton