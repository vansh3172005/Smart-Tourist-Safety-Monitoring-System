import { Shield, TrendingUp, MapPin, Clock } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface SafetyScoreCardProps {
  score: number;
}

export function SafetyScoreCard({ score }: SafetyScoreCardProps) {
  const { t } = useLanguage();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return t('Excellent Safety');
    if (score >= 60) return t('Good Safety');
    return t('Needs Attention');
  };

  const color = getScoreColor(score);
  const colorClasses = {
    green: 'text-green-600 bg-green-100 border-green-200',
    yellow: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    red: 'text-red-600 bg-red-100 border-red-200'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Shield className="h-5 w-5 text-blue-600 mr-2" />
          {t('Safety Score')}
        </h3>
        <div className={`px-3 py-1 rounded-full border ${colorClasses[color]}`}>
          <span className="text-sm font-medium">{getScoreText(score)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={color === 'green' ? '#10b981' : color === 'yellow' ? '#f59e0b' : '#ef4444'}
              strokeWidth="2"
              strokeDasharray={`${score}, 100`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{score}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-blue-50 rounded-lg">
          <MapPin className="h-5 w-5 text-blue-600 mx-auto mb-1" />
          <p className="text-sm font-medium text-blue-800">{t('Location')}</p>
          <p className="text-xs text-blue-600">{t('Safe Zone')}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-medium text-green-800">{t('Trend')}</p>
          <p className="text-xs text-green-600">+5 {t('points')}</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <Clock className="h-5 w-5 text-purple-600 mx-auto mb-1" />
          <p className="text-sm font-medium text-purple-800">{t('Active')}</p>
          <p className="text-xs text-purple-600">2h 15m</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">{t('Safety Factors')}</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('Location Safety')}</span>
            <span className="text-green-600">+30</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('Time of Day')}</span>
            <span className="text-green-600">+25</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('Weather Conditions')}</span>
            <span className="text-green-600">+20</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('Activity Type')}</span>
            <span className="text-yellow-600">+10</span>
          </div>
        </div>
      </div>
    </div>
  );
}