import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Header & Navigation
      title: "MCA e-Consultation AI Dashboard",
      dashboard: "Dashboard",
      comments: "Comments",
      analytics: "Analytics", 
      wordcloud: "Word Cloud",
      navigation: "Navigation",
      advancedFilters: "Advanced Filters",
      dateRange: "Date Range",
      
      // Dashboard Overview
      dashboardOverview: "Dashboard Overview",
      dashboardOverviewDesc: "Real-time insights from stakeholder feedback and consultation data",
      
      // Overview Cards
      totalComments: "Total Comments",
      totalCommentsDesc: "Stakeholder feedback received",
      positiveSentiment: "Positive Sentiment",
      negativeSentiment: "Negative Sentiment", 
      activeIssues: "Active Issues",
      activeIssuesDesc: "Complaints requiring attention",
      ofTotal: "of total",
      
      // Sentiment & Intent
      sentimentIntentAnalysis: "Sentiment & Intent Analysis",
      sentimentIntentDesc: "AI-powered analysis of comment sentiment and stakeholder intent",
      sentimentDistribution: "Sentiment Distribution",
      intentAnalysis: "Intent Analysis",
      clickSegmentsFilter: "Click segments to filter comments",
      clickBarsFilter: "Click bars to filter by intent type",
      
      // Sentiment Types
      positive: "Positive",
      neutral: "Neutral", 
      negative: "Negative",
      
      // Intent Types
      approval: "Approval",
      suggestion: "Suggestion",
      complaint: "Complaint",
      query: "Query",
      
      // Stakeholder Types
      citizens: "Citizens",
      organizations: "Organizations", 
      domainExperts: "Domain Experts",
      governmentBodies: "Government Bodies",
      citizen: "Citizen",
      organization: "Organization",
      expert: "Expert",
      government: "Government",
      
      // Comments Table
      commentsExplorer: "Comments Explorer", 
      showingComments: "Showing {{count}} comments with AI analysis",
      comment: "Comment",
      aiSummary: "AI Summary",
      sentiment: "Sentiment",
      intent: "Intent", 
      keywords: "Keywords",
      actions: "Actions",
      previous: "Previous",
      next: "Next",
      showingRange: "Showing {{start}}-{{end}} of {{total}} comments",
      
      // Word Cloud
      keywordCloud: "Keyword Cloud",
      keywordCloudDesc: "Most frequent keywords colored by dominant intent",
      uniqueKeywords: "Unique Keywords",
      mostFrequent: "Most Frequent", 
      totalMentions: "Total Mentions",
      avgPerComment: "Avg per Comment",
      noKeywords: "No keywords available for current filters",
      
      // Filters & Search
      searchComments: "Search comments...",
      filtersActive: "{{count}} filter active",
      filtersActiveMultiple: "{{count}} filters active",
      exportCSV: "Export CSV",
      clearFilters: "Clear filters",
      
      // Date & Time
      showingLast30Days: "Showing comments from the last 30 days",
      customDateRange: "Custom date range functionality coming soon",
      
      // User
      admin: "Admin",
      
      // Languages
      language: "Language",
      english: "English",
      hindi: "हिन्दी",
      gujarati: "ગુજરાતી",
      marathi: "मराठी",
      tamil: "தமிழ்",
      bengali: "বাংলা"
    }
  },
  hi: {
    translation: {
      // Header & Navigation  
      title: "एमसीए ई-परामर्श एआई डैशबोर्ड",
      dashboard: "डैशबोर्ड",
      comments: "टिप्पणियां", 
      analytics: "विश्लेषणएँ",
      wordcloud: "शब्द मेघ",
      navigation: "नेविगेशन",
      advancedFilters: "उन्नत फिल्टर",
      dateRange: "दिनांक सीमा",
      
      // Dashboard Overview
      dashboardOverview: "डैशबोर्ड अवलोकन",
      dashboardOverviewDesc: "हितधारक प्रतिक्रिया और परामर्श डेटा से वास्तविक समय की जानकारी",
      
      // Overview Cards
      totalComments: "कुल टिप्पणियां",
      totalCommentsDesc: "प्राप्त हितधारक प्रतिक्रिया",
      positiveSentiment: "सकारात्मक भावना",
      negativeSentiment: "नकारात्मक भावना",
      activeIssues: "सक्रिय मुद्दे", 
      activeIssuesDesc: "ध्यान देने योग्य शिकायतें",
      ofTotal: "कुल का",
      
      // Sentiment & Intent
      sentimentIntentAnalysis: "भावना और इरादा विश्लेषण",
      sentimentIntentDesc: "टिप्पणी भावना और हितधारक इरादे का एआई-संचालित विश्लेषण",
      sentimentDistribution: "भावना वितरण", 
      intentAnalysis: "इरादा विश्लेषण",
      clickSegmentsFilter: "टिप्पणियों को फिल्टर करने के लिए खंडों पर क्लिक करें",
      clickBarsFilter: "इरादा प्रकार के अनुसार फिल्टर करने के लिए बार पर क्लिक करें",
      
      // Sentiment Types
      positive: "सकारात्मक",
      neutral: "तटस्थ",
      negative: "नकारात्मक",
      
      // Intent Types  
      approval: "अनुमोदन",
      suggestion: "सुझाव",
      complaint: "शिकायत", 
      query: "प्रश्न",
      
      // Stakeholder Types
      citizens: "नागरिक",
      organizations: "संगठन",
      domainExperts: "डोमेन विशेषज्ञ",
      governmentBodies: "सरकारी निकाय", 
      citizen: "नागरिक",
      organization: "संगठन",
      expert: "विशेषज्ञ", 
      government: "सरकार",
      
      // Comments Table
      commentsExplorer: "टिप्पणी एक्सप्लोरर",
      showingComments: "एआई विश्लेषण के साथ {{count}} टिप्पणियां दिखाई जा रही हैं",
      comment: "टिप्पणी",
      aiSummary: "एआई सारांश", 
      sentiment: "भावना",
      intent: "इरादा",
      keywords: "मुख्य शब्द",
      actions: "क्रियाएं",
      previous: "पिछला", 
      next: "अगला",
      showingRange: "{{total}} में से {{start}}-{{end}} टिप्पणियां दिखाई जा रही हैं",
      
      // Word Cloud
      keywordCloud: "मुख्य शब्द मेघ",
      keywordCloudDesc: "प्रमुख इरादे द्वारा रंगीन सबसे लगातार मुख्य शब्द",
      uniqueKeywords: "अद्वितीय मुख्य शब्द",
      mostFrequent: "सबसे लगातार",
      totalMentions: "कुल उल्लेख", 
      avgPerComment: "प्रति टिप्पणी औसत",
      noKeywords: "वर्तमान फिल्टर के लिए कोई मुख्य शब्द उपलब्ध नहीं",
      
      // Filters & Search
      searchComments: "टिप्पणियां खोजें...",
      filtersActive: "{{count}} फिल्टर सक्रिय",
      filtersActiveMultiple: "{{count}} फिल्टर सक्रिय",
      exportCSV: "सीएसवी निर्यात करें",
      clearFilters: "फिल्टर साफ़ करें",
      
      // Date & Time  
      showingLast30Days: "पिछले 30 दिनों की टिप्पणियां दिखाई जा रही हैं",
      customDateRange: "कस्टम दिनांक सीमा कार्यक्षमता जल्द आ रही है",
      
      // User
      admin: "व्यवस्थापक",
      
      // Languages
      language: "भाषा",
      english: "English", 
      hindi: "हिन्दी",
      gujarati: "ગુજરાતી",
      marathi: "मराठी",
      tamil: "தமிழ்", 
      bengali: "বাংলা"
    }
  },
  gu: {
    translation: {
      title: "એમસીએ ઈ-કન્સલ્ટેશન એઆઈ ડેશબોર્ડ",
      dashboard: "ડેશબોર્ડ",
      comments: "ટિપ્પણીઓ",
      analytics: "વિશ્લેષણ", 
      wordcloud: "શબ્દ મેઘ",
      
      totalComments: "કુલ ટિપ્પણીઓ",
      positiveSentiment: "સકારાત્મક ભાવના", 
      negativeSentiment: "નકારાત્મક ભાવના",
      activeIssues: "સક્રિય મુદ્દાઓ",
      
      positive: "સકારાત્મક",
      neutral: "તટસ્થ",
      negative: "નકારાત્મક",
      
      approval: "મંજૂરી",
      suggestion: "સૂચન", 
      complaint: "ફરિયાદ",
      query: "પ્રશ્ન",
      
      searchComments: "ટિપ્પણીઓ શોધો...",
      exportCSV: "CSV નિકાસ કરો",
      language: "ભાષા",
      english: "English",
      hindi: "हिन्दी", 
      gujarati: "ગુજરાતી",
      marathi: "मराठी",
      tamil: "தமிழ்",
      bengali: "বাংলা"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;