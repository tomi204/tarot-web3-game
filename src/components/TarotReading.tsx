import { useState } from "react";
import { motion } from "framer-motion";
import { TarotCard } from "./TarotCard";
import { tarotCards } from "../data/tarotCards";
import { Sparkles, BookOpen } from "lucide-react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Provider } from "@reown/appkit-adapter-ethers";
import MintButton from "./MintButton";
import {
  THE_MAGICIAN_URI,
  THE_DEATH_URI,
  THE_FOOL_URI,
  CARRIAGE_URI,
} from "../constants/URI";
export const TarotReading = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");

  const handleCardClick = (index: number) => {
    if (selectedCards.includes(index)) {
      return;
    }

    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, index]);
      setFlippedCards([...flippedCards, index]);
    }
  };

  const getRandomRotation = () => {
    return `rotate(${Math.random() * 20 - 10}deg)`; // Rotación aleatoria entre -10° y 10°
  };

  const handleNewReading = () => {
    window.location.reload();
  };

  const getReadingInterpretation = () => {
    const selectedTarotCards = selectedCards.map((index) => tarotCards[index]);
    const positions = [
      "Past - This position represents influences from your past:",
      "Present - This position shows your current situation:",
      "Future - This position indicates potential outcomes:",
    ];

    const combinedMeaning = `
      The combination of ${selectedTarotCards
        .map((card) => card.name)
        .join(", ")} suggests 
      ${
        selectedTarotCards[0].arcana === "major"
          ? "significant life changes"
          : "day-to-day developments"
      } 
      in your journey. This spread indicates 
      ${
        selectedTarotCards.some((card) => card.suit === "cups")
          ? "emotional matters"
          : ""
      }
      ${
        selectedTarotCards.some((card) => card.suit === "wands")
          ? "creative or spiritual growth"
          : ""
      }
      ${
        selectedTarotCards.some((card) => card.suit === "swords")
          ? "mental challenges"
          : ""
      }
      ${
        selectedTarotCards.some((card) => card.suit === "pentacles")
          ? "material concerns"
          : ""
      }
      are particularly relevant to your question.
    `
      .replace(/\s+/g, " ")
      .trim();

    return { positions, combinedMeaning };
  };

  const actualCards = selectedCards.map((index) => tarotCards[index]);
  const actualBaseUri = () => {
    if (actualCards.includes(tarotCards[0])) {
      return THE_MAGICIAN_URI;
    }
    if (actualCards.includes(tarotCards[1])) {
      return THE_DEATH_URI;
    }
    if (actualCards.includes(tarotCards[2])) {
      return THE_FOOL_URI;
    }
    return CARRIAGE_URI;
  };
  return (
    <div className="min-h-screen  p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12 mt-32" >
          <h1 className="text-4xl font-bold text-white mb-4 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8" />
              What do you want to know?
              <Sparkles className="w-8 h-8" />
            </div>
            <p>
            Write or think your specific question and choose the category...
            </p>
          </h1>
          <p className="text-purple-200 mb-4">
            {selectedCards.length < 3
              ? `Select ${3 - selectedCards.length} more card${
                  selectedCards.length === 2 ? "" : "s"
                } to reveal your reading`
              : "Your reading is ready to be revealed"}
          </p>
          <button
            onClick={handleNewReading}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            New Reading
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-10 mb-12">
          <div className="flex flex-col items-center bg-white border border-black p-6 rounded-lg shadow-md w-[400px]">
            <h2 className="font-bold text-lg mb-4">Spread Type:</h2>
            <p className="text-sm text-gray-800">
              Past, Present & Future
            </p>
          </div>

          <div className="flex flex-col items-center bg-white border border-black p-6 rounded-lg shadow-md w-[400px]">
            <h2 className="font-bold text-lg mb-4">Category:</h2>
            <p className="text-sm text-gray-800">
              Love, Health or Work
            </p>
          </div>

          <div className="flex flex-col items-center bg-white border border-black p-6 rounded-lg shadow-md w-[400px]">
            <h2 className="font-bold text-lg mb-4">Your Name:</h2>
            <p className="text-sm text-gray-800">
              Posibles resultados
            </p>
          </div>
        </div>


        {selectedCards.length < 3 ? (
          <motion.div
          className="relative"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <div className="grid grid-cols-11 gap-4 ">
            {tarotCards.slice(0, 11).map((card, index) => (
              <motion.div
                key={card.name}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 },
                }}
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                }}
                className={`relative ${
                  selectedCards.includes(index) ? "opacity-50" : ""
                }`}
              >
                <TarotCard
                  card={card}
                  isFlipped={flippedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
                />
              </motion.div>
            ))}
          </div>
      
          <div className="grid grid-cols-11 gap-4 absolute top-36 ">
            {tarotCards.slice(11, 22).map((card, index) => (
              <motion.div
                key={card.name}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 },
                }}
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                }}
                className={`relative ${
                  selectedCards.includes(index + 11) ? "opacity-50" : ""
                }`}
              >
                <TarotCard
                  card={card}
                  isFlipped={flippedCards.includes(index + 11)}
                  onClick={() => handleCardClick(index + 11)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        ) : (
          <>
            <motion.div
              className="flex flex-wrap justify-center gap-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {selectedCards.map((cardIndex, index) => (
                <motion.div
                  key={tarotCards[cardIndex].name}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <TarotCard
                    card={tarotCards[cardIndex]}
                    isFlipped={true}
                    onClick={() => {}}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <BookOpen className="w-5 h-5" />
                {showInfo ? "Hide" : "Reveal"} Complete Reading
              </button>

              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-8 bg-white/10 backdrop-blur-sm rounded-xl text-white max-w-4xl mx-auto"
                >
                  <h2 className="text-3xl font-bold mb-8 text-purple-100">
                    Your Complete Reading
                  </h2>

                  <div className="space-y-8">
                    {selectedCards.map((cardIndex, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        style={{
                          transform: getRandomRotation(),
                        }}
                        className="text-left bg-white/5 p-6 rounded-lg"
                      >
                        <h3 className="text-xl font-bold text-purple-200 mb-2">
                          {getReadingInterpretation().positions[index]}
                        </h3>
                        <div className="space-y-3">
                          <p className="text-lg font-semibold text-white">
                            {tarotCards[cardIndex].name}
                          </p>
                          <p className="text-purple-200">
                            {tarotCards[cardIndex].desc}
                          </p>
                          <div className="mt-4">
                            <p className="text-green-300">
                              ✨ Upright Meaning:{" "}
                              {tarotCards[cardIndex].meaning_up}
                            </p>
                            <p className="text-red-300 mt-2">
                              🔄 Reversed Meaning:{" "}
                              {tarotCards[cardIndex].meaning_rev}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-8 p-6 bg-purple-900/50 rounded-lg"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-purple-100">
                        Combined Interpretation
                      </h3>
                      <p className="text-lg text-purple-200 leading-relaxed">
                        {getReadingInterpretation().combinedMeaning}
                      </p>
                    </motion.div>
                  </div>
                  <MintButton
                    provider={walletProvider}
                    onMint={() => {}}
                    baseURI={actualBaseUri()}
                    name={actualCards.map((card) => card.name).join(", ")}
                    symbol={actualCards.map((card) => card.name).join(", ")}
                    price={0.01}
                  />
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};
