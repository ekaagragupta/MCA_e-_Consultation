import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, MoreHorizontal } from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";
import { Comment } from "@/data/mockData";

const ITEMS_PER_PAGE = 8;

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return 'hsl(var(--sentiment-positive))';
    case 'negative': return 'hsl(var(--sentiment-negative))';
    default: return 'hsl(var(--sentiment-neutral))';
  }
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

export function CommentsTable() {
  const { filteredComments } = useDashboardStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const totalPages = Math.ceil(filteredComments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentComments = filteredComments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Card id="comments" className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Comments Explorer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Showing {filteredComments.length} comments with AI analysis
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[40%] text-foreground font-medium">Comment</TableHead>
                <TableHead className="w-[30%] text-foreground font-medium">AI Summary</TableHead>
                <TableHead className="text-foreground font-medium">Sentiment</TableHead>
                <TableHead className="text-foreground font-medium">Intent</TableHead>
                <TableHead className="text-foreground font-medium">Keywords</TableHead>
                <TableHead className="text-center text-foreground font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentComments.map((comment) => (
                <TableRow key={comment.id} className="hover:bg-muted/30 transition-smooth">
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-foreground leading-relaxed">
                        {truncateText(comment.comment, 120)}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {comment.stakeholderType} • {comment.date} • {comment.region}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {truncateText(comment.summary, 80)}
                    </p>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge 
                      variant="secondary"
                      className="capitalize text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getSentimentColor(comment.sentiment)}15`,
                        color: getSentimentColor(comment.sentiment),
                        borderColor: `${getSentimentColor(comment.sentiment)}30`
                      }}
                    >
                      {comment.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge 
                      variant="secondary"
                      className="capitalize text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getIntentColor(comment.intent)}15`,
                        color: getIntentColor(comment.intent),
                        borderColor: `${getIntentColor(comment.intent)}30`
                      }}
                    >
                      {comment.intent}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {comment.keywords.slice(0, 3).map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      {comment.keywords.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{comment.keywords.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedComment(comment)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredComments.length)} of {filteredComments.length} comments
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}