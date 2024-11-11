import { TarotCard } from '../types/tarot';

const createSuitCards = (suit: 'wands' | 'cups' | 'swords' | 'pentacles'): TarotCard[] => {
  const meanings = {
    wands: {
      ace: { up: "Creation, willpower, inspiration, desire", rev: "Lack of energy, lack of passion, boredom" },
      two: { up: "Planning, making decisions, leaving home", rev: "Fear of change, playing safe, bad planning" },
      three: { up: "Progress, adventure, looking ahead", rev: "Delays, frustration, lack of progress" },
      four: { up: "Celebration, harmony, marriage, home", rev: "Lack of support, transience, home conflicts" },
      five: { up: "Competition, conflict, rivalry", rev: "Avoiding conflict, respecting differences" },
      six: { up: "Victory, success, public reward", rev: "Excess pride, fall from grace, private achievement" },
      seven: { up: "Perseverance, defensive, maintaining control", rev: "Give up, destroyed confidence, overwhelmed" },
      eight: { up: "Action, movement, quick developments", rev: "Panic, waiting, slowdown" },
      nine: { up: "Resilience, grit, last stand", rev: "Exhaustion, fatigue, questioning motivations" },
      ten: { up: "Burden, extra responsibility, hard work", rev: "Inability to delegate, overstressed, burned out" },
      page: { up: "Exploration, excitement, free spirit", rev: "Lack of direction, procrastination, creating conflict" },
      knight: { up: "Energy, passion, lust, impulsiveness", rev: "Anger, impulsiveness, recklessness" },
      queen: { up: "Exuberance, warmth, vibrancy, determination", rev: "Shrinking violet, aggressive, demanding" },
      king: { up: "Big picture, leader, overcoming challenges", rev: "Impulsive, overbearing, unachievable expectations" }
    },
    cups: {
      ace: { up: "New feelings, spirituality, intuition", rev: "Emotional loss, blocked creativity, emptiness" },
      two: { up: "Unity, partnership, connection", rev: "Broken relationships, disharmony, distrust" },
      three: { up: "Celebration, friendship, community", rev: "Overindulgence, gossip, isolation" },
      four: { up: "Meditation, contemplation, apathy", rev: "Action, movement, new possibilities" },
      five: { up: "Loss, grief, self-pity", rev: "Acceptance, moving on, finding peace" },
      six: { up: "Nostalgia, memories, reunion", rev: "Living in the past, unrealistic memories" },
      seven: { up: "Choices, fantasy, illusion", rev: "Clarity, making choices, disillusion" },
      eight: { up: "Walking away, disillusionment, leaving behind", rev: "Avoidance, fear of change, fear of loss" },
      nine: { up: "Satisfaction, emotional stability, luxury", rev: "Inner happiness, materialism, dissatisfaction" },
      ten: { up: "Divine love, blissful relationships, harmony", rev: "Broken relationships, disharmony" },
      page: { up: "Creative opportunities, curiosity, possibility", rev: "New ideas, doubting intuition, creative blocks" },
      knight: { up: "Following the heart, idealist, romantic", rev: "Moodiness, disappointment" },
      queen: { up: "Compassion, calm, comfort", rev: "Martyrdom, insecurity, dependence" },
      king: { up: "Compassion, control, balance", rev: "Coldness, moodiness, bad advice" }
    },
    swords: {
      ace: { up: "Breakthrough, clarity, sharp mind", rev: "Confusion, brutality, chaos" },
      two: { up: "Difficult choices, stalemate, denial", rev: "Lesser of two evils, no right choice" },
      three: { up: "Heartbreak, suffering, grief", rev: "Recovery, forgiveness, moving on" },
      four: { up: "Rest, restoration, contemplation", rev: "Restlessness, burnout, stress" },
      five: { up: "Defeat, loss, crisis", rev: "Acceptance, moving on, finding peace" },
      six: { up: "Transition, leaving behind, moving forward", rev: "Unresolved guilt, regret, past issues" },
      seven: { up: "Deception, trickery, tactics and strategy", rev: "Coming clean, rethinking approach, tactics" },
      eight: { up: "Imprisonment, entrapment, self-victimization", rev: "New perspective, freedom, release" },
      nine: { up: "Anxiety, hopelessness, trauma", rev: "Hope, reaching out, despair" },
      ten: { up: "Painful endings, deep wounds, betrayal", rev: "Recovery, regeneration, resistance" },
      page: { up: "New ideas, curiosity, studious", rev: "Deception, manipulation, all talk" },
      knight: { up: "Action, impulsiveness, defending beliefs", rev: "No direction, disregard for consequences" },
      queen: { up: "Clear communication, independent, principled", rev: "Cold-hearted, cruel, bitterness" },
      king: { up: "Mental clarity, intellectual power, authority", rev: "Manipulative, cruel, blocking progress" }
    },
    pentacles: {
      ace: { up: "New resources, prosperity, abundance", rev: "Lost opportunity, scarcity, lack" },
      two: { up: "Balance, adaptability, time management", rev: "Imbalance, disorganization, overwhelm" },
      three: { up: "Teamwork, collaboration, building", rev: "Lack of teamwork, disorganized, delays" },
      four: { up: "Conservation, security, frugality", rev: "Greediness, materialism, stinginess" },
      five: { up: "Material hardship, spiritual growth", rev: "Recovery from financial loss, spiritual poverty" },
      six: { up: "Generosity, charity, sharing", rev: "Selfishness, debt, unpaid dues" },
      seven: { up: "Hard work, perseverance, diligence", rev: "Work without results, distractions, lack of rewards" },
      eight: { up: "Apprenticeship, mastering skills", rev: "Perfectionism, lack of progress, uninspired work" },
      nine: { up: "Luxury, material abundance, self-reliance", rev: "Material loss, greed, emotional satisfaction" },
      ten: { up: "Legacy, inheritance, culmination", rev: "Fleeting success, lack of stability, loss of legacy" },
      page: { up: "Manifestation, financial opportunity, new job", rev: "Lack of progress, procrastination, missed chance" },
      knight: { up: "Efficiency, routine, conservatism", rev: "Stagnation, boredom, laziness" },
      queen: { up: "Practicality, creature comforts, financial security", rev: "Self-centeredness, jealousy, smothering" },
      king: { up: "Abundance, prosperity, security", rev: "Materialism, inflexibility, stubbornness" }
    }
  };

  const cards: TarotCard[] = [];
  const numbers = Array.from({ length: 14 }, (_, i) => i + 1);

  numbers.forEach(num => {
    let name = num.toString();
    if (num === 1) name = "Ace";
    if (num === 11) name = "Page";
    if (num === 12) name = "Knight";
    if (num === 13) name = "Queen";
    if (num === 14) { name = "King"; num = 14; }

    const lowercaseName = name.toLowerCase();
    const meaning = meanings[suit][lowercaseName] || {
      up: `Default upright meaning for ${name} of ${suit}`,
      rev: `Default reversed meaning for ${name} of ${suit}`
    };

    cards.push({
      name: `${name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      number: num,
      arcana: "minor",
      suit,
      meaning_up: meaning.up,
      meaning_rev: meaning.rev,
      desc: `The ${name} of the ${suit} suit represents material aspects and earthly concerns.`,
      imageUrl: `https://images.unsplash.com/photo-1578301978018-7c91f926857b?auto=format&fit=crop&q=80&w=800`
    });
  });

  return cards;
};

export const minorArcana: TarotCard[] = [
  ...createSuitCards('wands'),
  ...createSuitCards('cups'),
  ...createSuitCards('swords'),
  ...createSuitCards('pentacles')
];