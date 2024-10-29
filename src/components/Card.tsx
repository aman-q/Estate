import React from "react";

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden text-black">
      <div className="px-6 py-6 flex items-center justify-center gap-4 ">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-green-700 text-3xl font-bold">{content}</p>
      </div>
    </div>
  );
};

export default Card;
