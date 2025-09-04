import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useDashboardStore } from "@/store/dashboardStore";

const SENTIMENT_COLORS = {
  positive: 'hsl(var(--sentiment-positive))',
  neutral: 'hsl(var(--sentiment-neutral))',
  negative: 'hsl(var(--sentiment-negative))',
};

export function SentimentChart() {
  const { analytics, setFilters, filters } = useDashboardStore();

  const chartData = [
    {
      sentiment: 'Positive',
      value: analytics.sentimentCounts.positive || 0,
      fill: SENTIMENT_COLORS.positive,
      key: 'positive'
    },
    {
      sentiment: 'Neutral', 
      value: analytics.sentimentCounts.neutral || 0,
      fill: SENTIMENT_COLORS.neutral,
      key: 'neutral'
    },
    {
      sentiment: 'Negative',
      value: analytics.sentimentCounts.negative || 0,
      fill: SENTIMENT_COLORS.negative,
      key: 'negative'
    },
  ].filter(item => item.value > 0);

  const handleChartClick = (data: any) => {
    if (data && data.key) {
      const currentSentiment = filters.sentiment;
      const isAlreadySelected = currentSentiment.includes(data.key);
      
      if (isAlreadySelected) {
        // Remove filter
        setFilters({ 
          sentiment: currentSentiment.filter(s => s !== data.key) 
        });
      } else {
        // Add filter
        setFilters({ 
          sentiment: [...currentSentiment, data.key] 
        });
      }
    }
  };

  const chartConfig = {
    positive: {
      label: "Positive",
      color: SENTIMENT_COLORS.positive,
    },
    neutral: {
      label: "Neutral", 
      color: SENTIMENT_COLORS.neutral,
    },
    negative: {
      label: "Negative",
      color: SENTIMENT_COLORS.negative,
    },
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Sentiment Distribution
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click segments to filter comments
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                onClick={handleChartClick}
                className="cursor-pointer"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    stroke={filters.sentiment.includes(entry.key) ? "hsl(var(--ring))" : "transparent"}
                    strokeWidth={filters.sentiment.includes(entry.key) ? 3 : 0}
                    className="hover:opacity-80 transition-smooth"
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Legend */}
        <div className="flex justify-center mt-4 space-x-6">
          {chartData.map((item) => (
            <div 
              key={item.key}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-smooth"
              onClick={() => handleChartClick(item)}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-foreground">
                {item.sentiment} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}