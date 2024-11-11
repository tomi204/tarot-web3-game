export interface TarotCard {
  name: string;
  number: number;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  meaning_up: string;
  meaning_rev: string;
  desc: string;
  imageUrl: string;
}