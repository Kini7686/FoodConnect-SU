export const NUTRIENTS = {
  'Pizza': { calories: 266, carbs: 33, protein: 10 },
  'Rice': { calories: 130, carbs: 28, protein: 2 },
  'Sandwich': { calories: 250, carbs: 30, protein: 12 },
  'Pasta': { calories: 190, carbs: 31, protein: 7 },
  'Salad': { calories: 120, carbs: 10, protein: 4 },
  'Class 0': { calories: 250, carbs: 30, protein: 10 },
  'Class 1': { calories: 220, carbs: 25, protein: 9 },
}
export function nutrientFor(label){
  const key = Object.keys(NUTRIENTS).find(k => k.toLowerCase()===label.toLowerCase())
  return key ? NUTRIENTS[key] : { calories: 0, carbs: 0, protein: 0 }
}
