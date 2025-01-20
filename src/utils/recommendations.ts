import { Circuit } from '@/types';

export const recommendCircuits = (circuits: Circuit[], preferences: any): Circuit[] => {
  // Simple recommendation logic based on preferences
  return circuits.filter(circuit => {
    // Match difficulty if specified
    if (preferences.difficulty && circuit.difficulty !== preferences.difficulty) {
      return false;
    }
    
    // Match duration if specified
    if (preferences.duration) {
      const maxDuration = parseInt(preferences.duration);
      if (circuit.duration_days > maxDuration) {
        return false;
      }
    }
    
    // Match location if specified
    if (preferences.region && circuit.tour_location) {
      if (!circuit.tour_location.toLowerCase().includes(preferences.region.toLowerCase())) {
        return false;
      }
    }
    
    return true;
  });
};