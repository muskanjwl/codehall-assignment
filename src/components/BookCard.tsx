import React from "react";

interface CardProps {
  image: string;
  heading: string;
  authorName: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, heading, authorName, onClick }) => {
  return (
    <div className="max-w-40 rounded overflow-hidden shadow-lg flex flex-col">
      <div className="flex-shrink-0">
        <img className="w-40 h-48 object-cover" src={image} alt={heading} />
      </div>
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2 h-12">{heading}</div>
        <p className="text-gray-700 text-base cursor-pointer" onClick={onClick}>
          {authorName}
        </p>
      </div>
    </div>
  );
};

export default Card;
