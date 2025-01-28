import React from "react";

const NotificationMessage = ({ message }) => {
  return (
    <div className="w-full h-10 flex justify-center text-red-500 text-[20px]">
      {message && <p>{message}</p>}
    </div>
  );
};

export default NotificationMessage;
