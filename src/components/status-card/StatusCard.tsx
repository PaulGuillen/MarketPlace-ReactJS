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
  const iconColor = isSuccess ? "text-green-500" : "text-red-500";
  const buttonColor = isSuccess ? "bg-green-500" : "bg-red-500";
  const hoverColor = isSuccess ? "hover:bg-green-600" : "hover:bg-red-600";
  const icon = isSuccess
    ? "https://cdn-icons-png.flaticon.com/512/845/845646.png" 
    : "https://cdn-icons-png.flaticon.com/512/1828/1828665.png";

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-96 border border-gray-300 rounded-lg shadow-lg p-6 text-center bg-white bg-opacity-90 backdrop-blur-md">
        <div className="flex justify-center mb-4">
          <img
            src={icon}
            alt="status icon"
            className={`w-16 h-16 ${iconColor}`}
          />
        </div>

        <h2 className={`text-2xl font-bold ${iconColor} mb-2`}>{title}</h2>

        <p className="text-gray-600 mb-6">{message}</p>

        <button
          onClick={onClick}
          className={`w-full py-2 px-4 text-white rounded-lg font-semibold ${buttonColor} ${hoverColor} transition duration-300`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default StatusCard;
