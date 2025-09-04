import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useDashboardStore } from "@/store/dashboardStore";

const INTENT_COLORS = {
  approval: 'hsl(var(--intent-approval))',
  suggestion: 'hsl(var(--intent-suggestion))',
  complaint: 'hsl(var(--intent-complaint))',
  query: 'hsl(var(--intent-query))',
};

export function IntentChart() {
  const { analytics, setFilters, filters } = useDashboardStore();

  const chartData = [
    {
      intent: 'Approval',
      value: analytics.intentCounts.approval || 0,
      fill: INTENT_COLORS.approval,
      key: 'approval'
    },
    {
      intent: 'Suggestion',
      value: analytics.intentCounts.suggestion || 0,
      fill: INTENT_COLORS.suggestion,
      key: 'suggestion'
    },
    {
      intent: 'Complaint',
      value: analytics.intentCounts.complaint || 0,
      fill: INTENT_COLORS.complaint,
      key: 'complaint'
    },
    {
      intent: 'Query',
      value: analytics.intentCounts.query || 0,
      fill: INTENT_COLORS.query,
      key: 'query'
    },
  ];

  const handleBarClick = (data: any) => {
    if (data && data.key) {
      const currentIntent = filters.intent;
      const isAlreadySelected = currentIntent.includes(data.key);
      
      if (isAlreadySelected) {
        // Remove filter
        setFilters({ 
          intent: currentIntent.filter(i => i !== data.key) 
        });
      } else {
        // Add filter
        setFilters({ 
          intent: [...currentIntent, data.key] 
        });
      }
    }
  };

  const chartConfig = {
    approval: {
      label: "Approval",
      color: INTENT_COLORS.approval,
    },
    suggestion: {
      label: "Suggestion",
      color: INTENT_COLORS.suggestion,
    },
    complaint: {
      label: "Complaint",
      color: INTENT_COLORS.complaint,
    },
    query: {
      label: "Query",
      color: INTENT_COLORS.query,
    },
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Intent Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click bars to filter by intent type
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="intent" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                onClick={handleBarClick}
                className="cursor-pointer"
              >
                {chartData.map((entry, index) => (
                  <Bar
                    key={`bar-${index}`}
                    fill={entry.fill}
                    stroke={filters.intent.includes(entry.key) ? "hsl(var(--ring))" : "transparent"}
                    strokeWidth={filters.intent.includes(entry.key) ? 2 : 0}
                    className="hover:opacity-80 transition-smooth"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}