export const calculateBurnoutScore = (entry) => {
  let score = 0;
  const sleepScore = Math.max(0, 30 - (entry.sleep / 9) * 30);
  score += sleepScore;
  const workScore = Math.min(25, (entry.workHours / 12) * 25);
  score += workScore;
  score += (entry.stress / 5) * 25;
  score += Math.min(10, entry.deadlines * 2);
  score -= entry.exercise ? 10 : 0;
  score += (5 - entry.mood) * 2;
  return Math.max(0, Math.min(100, score));
};

export const getRiskLevel = (score) => {
  if (score < 40) return { level: 'Low Risk', color: '#10b981' };
  else if (score < 70) return { level: 'Moderate Risk', color: '#f59e0b' };
  else return { level: 'High Risk', color: '#ef4444' };
};
