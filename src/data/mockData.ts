export interface Comment {
  id: string;
  comment: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  intent: 'complaint' | 'suggestion' | 'approval' | 'query';
  keywords: string[];
  stakeholderType: 'citizen' | 'organization' | 'expert' | 'government';
  date: string;
  region?: string;
}

export const mockComments: Comment[] = [
  {
    id: '1',
    comment: 'The new amendment will significantly help startups grow and attract foreign investment. This is a positive step towards economic development.',
    summary: 'Stakeholder supports amendment for startup growth and foreign investment',
    sentiment: 'positive',
    intent: 'approval',
    keywords: ['amendment', 'startups', 'investment', 'economic development'],
    stakeholderType: 'organization',
    date: '2024-03-15',
    region: 'Mumbai'
  },
  {
    id: '2',
    comment: 'This draft law is confusing and unclear. The language used is too complex for common citizens to understand.',
    summary: 'Stakeholder finds draft unclear and overly complex',
    sentiment: 'negative',
    intent: 'complaint',
    keywords: ['draft', 'law', 'unclear', 'complex language'],
    stakeholderType: 'citizen',
    date: '2024-03-14',
    region: 'Delhi'
  },
  {
    id: '3',
    comment: 'I suggest adding more specific guidelines for small businesses in the manufacturing sector to ensure compliance.',
    summary: 'Suggestion to add specific guidelines for small manufacturing businesses',
    sentiment: 'neutral',
    intent: 'suggestion',
    keywords: ['guidelines', 'small businesses', 'manufacturing', 'compliance'],
    stakeholderType: 'expert',
    date: '2024-03-13',
    region: 'Chennai'
  },
  {
    id: '4',
    comment: 'Could you please clarify the timeline for implementation? When will these changes take effect?',
    summary: 'Query about implementation timeline and effective dates',
    sentiment: 'neutral',
    intent: 'query',
    keywords: ['timeline', 'implementation', 'effective dates'],
    stakeholderType: 'citizen',
    date: '2024-03-12',
    region: 'Bangalore'
  },
  {
    id: '5',
    comment: 'Excellent initiative! This will streamline the regulatory process and reduce bureaucratic delays.',
    summary: 'Strong approval for regulatory streamlining initiative',
    sentiment: 'positive',
    intent: 'approval',
    keywords: ['excellent', 'streamline', 'regulatory', 'bureaucratic delays'],
    stakeholderType: 'organization',
    date: '2024-03-11',
    region: 'Hyderabad'
  },
  {
    id: '6',
    comment: 'The proposed changes lack environmental safeguards. We need stronger provisions for ecological protection.',
    summary: 'Complaint about insufficient environmental protections',
    sentiment: 'negative',
    intent: 'complaint',
    keywords: ['environmental', 'safeguards', 'ecological protection'],
    stakeholderType: 'organization',
    date: '2024-03-10',
    region: 'Pune'
  },
  {
    id: '7',
    comment: 'I recommend including provisions for digital documentation to modernize the process.',
    summary: 'Suggestion for digital documentation provisions',
    sentiment: 'positive',
    intent: 'suggestion',
    keywords: ['digital documentation', 'modernize', 'provisions'],
    stakeholderType: 'expert',
    date: '2024-03-09',
    region: 'Kolkata'
  },
  {
    id: '8',
    comment: 'What are the penalties for non-compliance? This information is missing from the draft.',
    summary: 'Query about penalties and compliance requirements',
    sentiment: 'neutral',
    intent: 'query',
    keywords: ['penalties', 'non-compliance', 'missing information'],
    stakeholderType: 'citizen',
    date: '2024-03-08',
    region: 'Ahmedabad'
  },
  {
    id: '9',
    comment: 'Fully support this initiative. It addresses long-standing issues in the sector.',
    summary: 'Full support for addressing sector issues',
    sentiment: 'positive',
    intent: 'approval',
    keywords: ['support', 'initiative', 'sector issues'],
    stakeholderType: 'expert',
    date: '2024-03-07',
    region: 'Jaipur'
  },
  {
    id: '10',
    comment: 'The consultation period is too short. We need more time to analyze the implications thoroughly.',
    summary: 'Complaint about insufficient consultation period',
    sentiment: 'negative',
    intent: 'complaint',
    keywords: ['consultation period', 'short', 'analyze implications'],
    stakeholderType: 'organization',
    date: '2024-03-06',
    region: 'Lucknow'
  },
  {
    id: '11',
    comment: 'Consider adding specific exemptions for micro-enterprises to reduce regulatory burden.',
    summary: 'Suggestion for micro-enterprise exemptions',
    sentiment: 'neutral',
    intent: 'suggestion',
    keywords: ['exemptions', 'micro-enterprises', 'regulatory burden'],
    stakeholderType: 'expert',
    date: '2024-03-05',
    region: 'Chandigarh'
  },
  {
    id: '12',
    comment: 'How will this affect existing contracts? Please provide clarity on transitional arrangements.',
    summary: 'Query about impact on existing contracts and transitions',
    sentiment: 'neutral',
    intent: 'query',
    keywords: ['existing contracts', 'transitional arrangements', 'clarity'],
    stakeholderType: 'organization',
    date: '2024-03-04',
    region: 'Bhopal'
  }
];

export const getCommentsByFilters = (
  comments: Comment[],
  filters: {
    sentiment?: string[];
    intent?: string[];
    stakeholderType?: string[];
    dateRange?: { start: string; end: string };
    searchQuery?: string;
  }
) => {
  return comments.filter(comment => {
    // Sentiment filter
    if (filters.sentiment && filters.sentiment.length > 0) {
      if (!filters.sentiment.includes(comment.sentiment)) return false;
    }

    // Intent filter
    if (filters.intent && filters.intent.length > 0) {
      if (!filters.intent.includes(comment.intent)) return false;
    }

    // Stakeholder type filter
    if (filters.stakeholderType && filters.stakeholderType.length > 0) {
      if (!filters.stakeholderType.includes(comment.stakeholderType)) return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (
        !comment.comment.toLowerCase().includes(query) &&
        !comment.summary.toLowerCase().includes(query) &&
        !comment.keywords.some(keyword => keyword.toLowerCase().includes(query))
      ) return false;
    }

    return true;
  });
};

export const getAnalytics = (comments: Comment[]) => {
  const total = comments.length;
  
  const sentimentCounts = comments.reduce((acc, comment) => {
    acc[comment.sentiment] = (acc[comment.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const intentCounts = comments.reduce((acc, comment) => {
    acc[comment.intent] = (acc[comment.intent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stakeholderCounts = comments.reduce((acc, comment) => {
    acc[comment.stakeholderType] = (acc[comment.stakeholderType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Hybrid sentiment-intent matrix
  const hybridMatrix = comments.reduce((acc, comment) => {
    const key = `${comment.sentiment}-${comment.intent}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Keywords frequency
  const keywordFrequency = comments.reduce((acc, comment) => {
    comment.keywords.forEach(keyword => {
      acc[keyword] = (acc[keyword] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    sentimentCounts,
    intentCounts,
    stakeholderCounts,
    hybridMatrix,
    keywordFrequency
  };
};