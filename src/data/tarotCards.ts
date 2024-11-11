import { TarotCard } from '../types/tarot';
import { majorArcana } from './majorArcana';
import { minorArcana } from './minorArcana';

export const tarotCards: TarotCard[] = [...majorArcana, ...minorArcana];