import { northDestinations } from './north';
import { southDestinations } from './south';
import { eastDestinations } from './east';
import { westDestinations } from './west';

export const destinations = [
  ...northDestinations,
  ...southDestinations,
  ...eastDestinations,
  ...westDestinations
];