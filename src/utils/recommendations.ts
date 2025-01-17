import { Circuit } from "@/data/types";
import { circuits } from "@/data/circuits";

interface Preferences {
  duration?: string | null;
  budget?: string | null;
  travelStyle?: string | null;
  interests?: string[] | null;
  activityLevel?: string | null;
  seasonPreference?: string | null;
  groupSize?: string | null;
}

export const recommendCircuits = (preferences: Preferences) => {
  const allCircuits = [...circuits];
  
  // Filter and score circuits based on preferences
  const scoredCircuits = allCircuits.map(circuit => {
    let score = 0;
    
    // Duration match
    if (preferences.duration && circuit.duration_days <= parseInt(preferences.duration)) {
      score += 2;
    }
    
    // Budget match (assuming price ranges)
    if (preferences.budget && circuit.price) {
      const budget = parseInt(preferences.budget);
      if (circuit.price <= budget) {
        score += 2;
      }
    }
    
    // Travel style match
    if (preferences.travelStyle && circuit.description?.toLowerCase().includes(preferences.travelStyle.toLowerCase())) {
      score += 1;
    }
    
    // Interests match
    if (preferences.interests) {
      preferences.interests.forEach(interest => {
        if (circuit.description?.toLowerCase().includes(interest.toLowerCase())) {
          score += 1;
        }
      });
    }
    
    return { circuit, score };
  });
  
  // Sort by score
  scoredCircuits.sort((a, b) => b.score - a.score);
  
  // Split into best matches and alternatives
  const bestMatches = scoredCircuits
    .filter(item => item.score > 2)
    .map(item => item.circuit)
    .slice(0, 3);
    
  const alternatives = scoredCircuits
    .filter(item => item.score <= 2)
    .map(item => item.circuit)
    .slice(0, 3);
  
  return {
    bestMatches,
    alternatives
  };
};