import React from "react";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-blue-dark via-custom-blue-medium to-custom-blue-light animate-gradient flex flex-col items-center justify-center p-8">
      <img
        src="../cardStart.png"
        alt="Tarot Game"
        className="h-64 object-contain rounded-lg shadow-lg mb-8"
      />
      <button
        onClick={onStart}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl rounded-lg shadow-lg transition-colors"
      >
        PLAY
      </button>
    </div>
  );
};

export default StartScreen;
