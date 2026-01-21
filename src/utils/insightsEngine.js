import { TrendingUp, TrendingDown, Brain, Moon, Briefcase } from 'lucide-react';

export const generateInsights = (entries) => {
  if (entries.length < 2) return [];
  const insights = [];
  const recent = entries.slice(-7);
  const current = entries[entries.length - 1];
  
  if (recent.length >= 3) {
    const scores = recent.map(e => e.score);
    const trend = scores[scores.length - 1] - scores[0];
    if (trend > 10) {
      insights.push({
        type: 'warning',
        text: `Burnout risk rising ${Math.round(trend)}% over last ${recent.length} days`,
        icon: TrendingUp
      });
    } else if (trend < -10) {
      insights.push({
        type: 'positive',
        text: `Recovery detected: ${Math.abs(Math.round(trend))}% improvement`,
        icon: TrendingDown
      });
    }
  }
  
  const drivers = [];
  if (current.sleep < 6.5) drivers.push('sleep debt');
  if (current.workHours > 9) drivers.push('work overload');
  if (current.stress >= 4) drivers.push('high stress');
  if (current.deadlines >= 3) drivers.push('deadline stacking');
  if (!current.exercise) drivers.push('no recovery activity');
  
  if (drivers.length > 0) {
    insights.push({
      type: 'analysis',
      text: `Primary drivers: ${drivers.join(', ')}`,
      icon: Brain
    });
  }
  
  if (current.sleep < 7) {
    const impact = ((7 - current.sleep) / 7 * 20).toFixed(0);
    insights.push({
      type: 'action',
      text: `Getting 7hrs sleep could reduce risk by ~${impact}%`,
      icon: Moon
    });
  }
  
  if (current.workHours > 9) {
    const impact = ((current.workHours - 8) / current.workHours * 15).toFixed(0);
    insights.push({
      type: 'action',
      text: `Reducing work by 1hr/day could lower risk by ~${impact}%`,
      icon: Briefcase
    });
  }
  
  return insights;
};
