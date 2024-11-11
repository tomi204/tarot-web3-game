import { useState } from 'react';
import { motion } from 'framer-motion';
import { TarotCard } from './TarotCard';
import { tarotCards } from '../data/tarotCards';
import { Sparkles, BookOpen } from 'lucide-react';

export const TarotReading = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  const handleCardClick = (index: number) => {
    if (selectedCards.includes(index)) {
      return;
    }

    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, index]);
      setFlippedCards([...flippedCards, index]);
    }
  };

  const handleNewReading = () => {
    window.location.reload();
  };

  const getReadingInterpretation = () => {
    const selectedTarotCards = selectedCards.map(index => tarotCards[index]);
    const positions = [
      "Past - This position represents influences from your past:",
      "Present - This position shows your current situation:",
      "Future - This position indicates potential outcomes:"
    ];

    const combinedMeaning = `
      The combination of ${selectedTarotCards.map(card => card.name).join(', ')} suggests 
      ${selectedTarotCards[0].arcana === 'major' ? 'significant life changes' : 'day-to-day developments'} 
      in your journey. This spread indicates 
      ${selectedTarotCards.some(card => card.suit === 'cups') ? 'emotional matters' : ''}
      ${selectedTarotCards.some(card => card.suit === 'wands') ? 'creative or spiritual growth' : ''}
      ${selectedTarotCards.some(card => card.suit === 'swords') ? 'mental challenges' : ''}
      ${selectedTarotCards.some(card => card.suit === 'pentacles') ? 'material concerns' : ''}
      are particularly relevant to your question.
    `.replace(/\s+/g, ' ').trim();

    return { positions, combinedMeaning };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8" />
            Daily Tarot Reading
            <Sparkles className="w-8 h-8" />
          </h1>
          <p className="text-purple-200 mb-4">
            {selectedCards.length < 3 
              ? `Select ${3 - selectedCards.length} more card${selectedCards.length === 2 ? '' : 's'} to reveal your reading`
              : 'Your reading is ready to be revealed'}
          </p>
          <button
            onClick={handleNewReading}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            New Reading
          </button>
        </div>

        {selectedCards.length < 3 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {tarotCards.map((card, index) => (
              <motion.div
                key={card.name}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 }
                }}
                className={selectedCards.includes(index) ? 'opacity-50' : ''}
              >
                <TarotCard
                  card={card}
                  isFlipped={flippedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
                />
              </motion.div>
            ))}
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
                    staggerChildren: 0.3
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {selectedCards.map((cardIndex, index) => (
                <motion.div
                  key={tarotCards[cardIndex].name}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 }
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
                {showInfo ? 'Hide' : 'Reveal'} Complete Reading
              </button>
              
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-8 bg-white/10 backdrop-blur-sm rounded-xl text-white max-w-4xl mx-auto"
                >
                  <h2 className="text-3xl font-bold mb-8 text-purple-100">Your Complete Reading</h2>
                  
                  <div className="space-y-8">
                    {selectedCards.map((cardIndex, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="text-left bg-white/5 p-6 rounded-lg"
                      >
                        <h3 className="text-xl font-bold text-purple-200 mb-2">
                          {getReadingInterpretation().positions[index]}
                        </h3>
                        <div className="space-y-3">
                          <p className="text-lg font-semibold text-white">{tarotCards[cardIndex].name}</p>
                          <p className="text-purple-200">{tarotCards[cardIndex].desc}</p>
                          <div className="mt-4">
                            <p className="text-green-300">✨ Upright Meaning: {tarotCards[cardIndex].meaning_up}</p>
                            <p className="text-red-300 mt-2">🔄 Reversed Meaning: {tarotCards[cardIndex].meaning_rev}</p>
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
                      <h3 className="text-2xl font-bold mb-4 text-purple-100">Combined Interpretation</h3>
                      <p className="text-lg text-purple-200 leading-relaxed">
                        {getReadingInterpretation().combinedMeaning}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};