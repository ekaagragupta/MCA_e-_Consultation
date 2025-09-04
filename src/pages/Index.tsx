import { DashboardLayout } from "@/components/DashboardLayout";
import { OverviewCards } from "@/components/OverviewCards";
import { SentimentChart } from "@/components/SentimentChart";
import { IntentChart } from "@/components/IntentChart";
import { CommentsTable } from "@/components/CommentsTable";
import { WordCloudSection } from "@/components/WordCloudSection";
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <DashboardLayout>
      {/* Overview Section */}
      <section id="overview" className="scroll-mt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t('dashboardOverview')}
          </h2>
          <p className="text-muted-foreground">
            {t('dashboardOverviewDesc')}
          </p>
        </div>
        <OverviewCards />
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="scroll-mt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t('sentimentIntentAnalysis')}
          </h2>
          <p className="text-muted-foreground">
            {t('sentimentIntentDesc')}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SentimentChart />
          <IntentChart />
        </div>
      </section>

      {/* Word Cloud Section */}
      <WordCloudSection />

      {/* Comments Explorer */}
      <CommentsTable />
    </DashboardLayout>
  );
};

export default Index;
