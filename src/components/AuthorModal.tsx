import React from "react";

interface AuthorModalProps {
  authorName: string;
  authorPicture: string;
  handleClose: () => void;
}

const AuthorModal: React.FC<AuthorModalProps> = ({
  authorName,
  authorPicture,
  handleClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-75"
        onClick={handleClose}
      ></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <div className="flex items-center justify-between mb-4 gap-20">
          <h2 className="text-xl font-bold">{authorName}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
        <img
          src={authorPicture}
          alt={authorName}
          className="rounded-full w-32 h-32 mb-4"
        />
        {/* Additional content can be added here */}
      </div>
    </div>
  );
};

export default AuthorModal;
