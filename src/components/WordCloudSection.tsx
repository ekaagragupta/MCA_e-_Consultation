import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboardStore";

// Simple word cloud implementation since react-wordcloud might have issues
export function WordCloudSection() {
  const { analytics, filteredComments } = useDashboardStore();

  // Get top keywords with their frequencies
  const topKeywords = Object.entries(analytics.keywordFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20);

  // Get keyword intent distribution
  const getKeywordIntent = (keyword: string) => {
    const intentCounts = { approval: 0, suggestion: 0, complaint: 0, query: 0 };
    
    filteredComments.forEach(comment => {
      if (comment.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))) {
        intentCounts[comment.intent]++;
      }
    });

    // Return the most common intent for this keyword
    return Object.entries(intentCounts).reduce((a, b) => 
      intentCounts[a[0] as keyof typeof intentCounts] > intentCounts[b[0] as keyof typeof intentCounts] ? a : b
    )[0];
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'approval': return 'hsl(var(--intent-approval))';
      case 'suggestion': return 'hsl(var(--intent-suggestion))';
      case 'complaint': return 'hsl(var(--intent-complaint))';
      case 'query': return 'hsl(var(--intent-query))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getFontSize = (frequency: number, maxFreq: number) => {
    const minSize = 12;
    const maxSize = 36;
    const ratio = frequency / maxFreq;
    return minSize + (maxSize - minSize) * ratio;
  };

  const maxFrequency = Math.max(...topKeywords.map(([,freq]) => freq));

  return (
    <Card id="wordcloud" className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Keyword Cloud
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Most frequent keywords colored by dominant intent
        </p>
      </CardHeader>
      <CardContent>
        <div className="min-h-[300px] p-6 bg-muted/20 rounded-lg border border-border/50">
          {topKeywords.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center gap-3 leading-relaxed">
              {topKeywords.map(([keyword, frequency], index) => {
                const dominantIntent = getKeywordIntent(keyword);
                const fontSize = getFontSize(frequency, maxFrequency);
                
                return (
                  <span
                    key={keyword}
                    className="inline-block cursor-pointer hover:opacity-80 transition-smooth font-medium"
                    style={{
                      fontSize: `${fontSize}px`,
                      color: getIntentColor(dominantIntent),
                      fontWeight: frequency > maxFrequency * 0.7 ? 'bold' : 'medium',
                      textShadow: `0 1px 2px ${getIntentColor(dominantIntent)}20`,
                    }}
                    title={`${keyword}: ${frequency} mentions (${dominantIntent})`}
                  >
                    {keyword}
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              No keywords available for current filters
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex justify-center mt-6 space-x-6">
          <div className="flex items-center space-x-8 text-xs">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'hsl(var(--intent-approval))' }}
              />
              <span>Approval</span>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'hsl(var(--intent-suggestion))' }}
              />
              <span>Suggestion</span>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'hsl(var(--intent-complaint))' }}
              />
              <span>Complaint</span>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'hsl(var(--intent-query))' }}
              />
              <span>Query</span>
            </div>
          </div>
        </div>

        {/* Keyword Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{topKeywords.length}</div>
            <div className="text-xs text-muted-foreground">Unique Keywords</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{maxFrequency}</div>
            <div className="text-xs text-muted-foreground">Most Frequent</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {Object.values(analytics.keywordFrequency).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Mentions</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(Object.values(analytics.keywordFrequency).reduce((a, b) => a + b, 0) / analytics.total * 10) / 10}
            </div>
            <div className="text-xs text-muted-foreground">Avg per Comment</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}