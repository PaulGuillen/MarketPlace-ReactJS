import React from "react";

interface StatusCardProps {
  status: "success" | "error";
  title: string;
  message: string;
  buttonText: string;
  onClick: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  status,
  title,
  message,
  buttonText,
  onClick,
}) => {
  const isSuccess = status === "success";
  const bgColor = isSuccess ? "bg-green-500" : "bg-red-500";
  const textColor = isSuccess ? "text-green-900" : "text-red-900";
  const icon = isSuccess ? "✔" : "✘";

  return (
    <div
      className={`w-80 h-96 flex flex-col justify-between items-center p-6 rounded-lg shadow-lg ${bgColor} text-white`}
    >
      <div className="text-6xl opacity-20">{icon}</div>

      <div className="text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className={`text-sm mt-2 ${textColor}`}>{message}</p>
      </div>

      <button
        onClick={onClick}
        className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default StatusCard;
