import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useTranslation } from 'react-i18next';

export function OverviewCards() {
  const { analytics } = useDashboardStore();
  const { t } = useTranslation();

  const cards = [
    {
      title: t('totalComments'),
      value: analytics.total.toLocaleString(),
      icon: MessageSquare,
      description: t('totalCommentsDesc'),
      color: "primary",
    },
    {
      title: t('positiveSentiment'),
      value: analytics.sentimentCounts.positive || 0,
      icon: TrendingUp,
      description: `${Math.round(((analytics.sentimentCounts.positive || 0) / analytics.total) * 100)}% ${t('ofTotal')}`,
      color: "sentiment-positive",
    },
    {
      title: t('negativeSentiment'), 
      value: analytics.sentimentCounts.negative || 0,
      icon: TrendingDown,
      description: `${Math.round(((analytics.sentimentCounts.negative || 0) / analytics.total) * 100)}% ${t('ofTotal')}`,
      color: "sentiment-negative",
    },
    {
      title: t('activeIssues'),
      value: analytics.intentCounts.complaint || 0,
      icon: AlertCircle,
      description: t('activeIssuesDesc'),
      color: "intent-complaint",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-gradient-card shadow-card border-border hover:shadow-chart transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon 
              className="h-4 w-4"
              style={{ color: `hsl(var(--${card.color}))` }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}