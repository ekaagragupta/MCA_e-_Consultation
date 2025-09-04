import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useDashboardStore } from "@/store/dashboardStore";
import { useTranslation } from 'react-i18next';

const sentimentOptions = [
  { id: 'positive', label: 'positive', color: 'sentiment-positive' },
  { id: 'neutral', label: 'neutral', color: 'sentiment-neutral' },
  { id: 'negative', label: 'negative', color: 'sentiment-negative' },
];

const intentOptions = [
  { id: 'approval', label: 'approval', color: 'intent-approval' },
  { id: 'suggestion', label: 'suggestion', color: 'intent-suggestion' },
  { id: 'complaint', label: 'complaint', color: 'intent-complaint' },
  { id: 'query', label: 'query', color: 'intent-query' },
];

const stakeholderOptions = [
  { id: 'citizen', label: 'citizens' },
  { id: 'organization', label: 'organizations' },
  { id: 'expert', label: 'domainExperts' },
  { id: 'government', label: 'governmentBodies' },
];

export function FilterPanel() {
  const { filters, setFilters, analytics } = useDashboardStore();
  const { t } = useTranslation();

  const handleSentimentChange = (sentimentId: string, checked: boolean) => {
    const newSentiment = checked
      ? [...filters.sentiment, sentimentId]
      : filters.sentiment.filter(s => s !== sentimentId);
    
    setFilters({ sentiment: newSentiment });
  };

  const handleIntentChange = (intentId: string, checked: boolean) => {
    const newIntent = checked
      ? [...filters.intent, intentId]
      : filters.intent.filter(i => i !== intentId);
    
    setFilters({ intent: newIntent });
  };

  const handleStakeholderChange = (stakeholderId: string, checked: boolean) => {
    const newStakeholder = checked
      ? [...filters.stakeholderType, stakeholderId]
      : filters.stakeholderType.filter(s => s !== stakeholderId);
    
    setFilters({ stakeholderType: newStakeholder });
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Sentiment Filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">{t('sentiment')}</h4>
        <div className="space-y-2">
          {sentimentOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`sentiment-${option.id}`}
                  checked={filters.sentiment.includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleSentimentChange(option.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`sentiment-${option.id}`}
                  className="text-xs text-foreground cursor-pointer"
                >
                  {t(option.label)}
                </label>
              </div>
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ 
                  backgroundColor: `hsl(var(--${option.color}) / 0.1)`,
                  color: `hsl(var(--${option.color}))`
                }}
              >
                {analytics.sentimentCounts[option.id] || 0}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Intent Filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">{t('intent')}</h4>
        <div className="space-y-2">
          {intentOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`intent-${option.id}`}
                  checked={filters.intent.includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleIntentChange(option.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`intent-${option.id}`}
                  className="text-xs text-foreground cursor-pointer"
                >
                  {t(option.label)}
                </label>
              </div>
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ 
                  backgroundColor: `hsl(var(--${option.color}) / 0.1)`,
                  color: `hsl(var(--${option.color}))`
                }}
              >
                {analytics.intentCounts[option.id] || 0}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Type Filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Stakeholder Type</h4>
        <div className="space-y-2">
          {stakeholderOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`stakeholder-${option.id}`}
                  checked={filters.stakeholderType.includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleStakeholderChange(option.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`stakeholder-${option.id}`}
                  className="text-xs text-foreground cursor-pointer"
                >
                  {t(option.label)}
                </label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {analytics.stakeholderCounts[option.id] || 0}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}