import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Download, RotateCcw, User, Languages } from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useTranslation } from 'react-i18next';
import Papa from 'papaparse';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];

export function DashboardNavbar() {
  const { filters, filteredComments, clearFilters, setFilters } = useDashboardStore();
  const { t, i18n } = useTranslation();
  
  const activeFiltersCount = 
    filters.sentiment.length + 
    filters.intent.length + 
    filters.stakeholderType.length + 
    (filters.searchQuery ? 1 : 0);

  const handleExportCSV = () => {
    const csvData = filteredComments.map(comment => ({
      ID: comment.id,
      Comment: comment.comment,
      Summary: comment.summary,
      Sentiment: comment.sentiment,
      Intent: comment.intent,
      Keywords: comment.keywords.join(', '),
      StakeholderType: comment.stakeholderType,
      Date: comment.date,
      Region: comment.region || 'N/A'
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `mca-consultation-comments-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  return (
    <div className="flex items-center gap-4">
      {/* Quick Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t('searchComments')}
          value={filters.searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          className="pl-10 w-64"
        />
      </div>

      {/* Active Filters Badge */}
      {activeFiltersCount > 0 && (
        <Badge variant="secondary" className="gap-2">
          {activeFiltersCount === 1 
            ? t('filtersActive', { count: activeFiltersCount })
            : t('filtersActiveMultiple', { count: activeFiltersCount })
          }
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-4 w-4 p-0 hover:bg-transparent"
            title={t('clearFilters')}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Languages className="h-4 w-4" />
            {getCurrentLanguage().nativeName}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`cursor-pointer ${
                i18n.language === language.code ? 'bg-accent' : ''
              }`}
            >
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-muted-foreground ml-2">({language.name})</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportCSV}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        {t('exportCSV')}
      </Button>

      {/* User Profile */}
      <Button variant="ghost" size="sm" className="gap-2">
        <User className="h-4 w-4" />
        {t('admin')}
      </Button>
    </div>
  );
}