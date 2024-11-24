import { motion } from 'framer-motion';
import { TarotCard as TarotCardType } from '../types/tarot';

interface Props {
  card: TarotCardType;
  isFlipped: boolean;
  onClick: () => void;
}

export const TarotCard: React.FC<Props> = ({ card, isFlipped, onClick }) => {
  return (
    <motion.div
      className="relative w-64 h-96 cursor-pointer shadow-xl"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute w-full h-full rounded-xl shadow-xl "
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full rounded-xl bg-indigo-700 backface-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Card Front */}
        <div
          className="absolute w-full h-full rounded-xl bg-white p-4 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold text-center mb-2">{card.name}</h3>
            <div className="flex-1 bg-cover bg-center rounded-lg mb-2 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${card.imageUrl})` }}
              />
              {card.suit && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white rounded text-sm">
                  {card.suit}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">Upright:</p>
              <p className="text-sm text-gray-600">{card.meaning_up}</p>
              <p className="text-sm font-medium text-gray-800">Reversed:</p>
              <p className="text-sm text-gray-600">{card.meaning_rev}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};