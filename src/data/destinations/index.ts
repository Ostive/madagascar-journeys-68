import { northDestinations } from './north';
import { southDestinations } from './south';
import { eastDestinations } from './east';
import { centralDestinations } from './central';

export const destinations = [
  ...northDestinations,
  ...southDestinations,
  ...eastDestinations,
  ...centralDestinations
];