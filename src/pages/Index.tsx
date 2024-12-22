import React from "react";
import { DailyVerse } from "@/components/DailyVerse";
import { SupportDialog } from "@/components/SupportDialog";
import { NotificationBar } from "@/components/NotificationBar";

const getMonthlyTheme = () => {
  const themes = {
    0: "Faith & New Beginnings",
    1: "Love & Relationships",
    2: "Strength & Perseverance",
    3: "Hope & Renewal",
    4: "Trust & Guidance",
    5: "Peace & Patience",
    6: "Wisdom & Understanding",
    7: "Gratitude & Joy",
    8: "Purpose & Direction",
    9: "Courage & Protection",
    10: "Grace & Mercy",
    11: "Promise & Fulfillment",
  };

  const currentMonth = new Date().getMonth();
  return themes[currentMonth as keyof typeof themes];
};

const todaysVerse = {
  verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
  reference: "Proverbs 3:5-6",
};

const Index = () => {
  const theme = getMonthlyTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NotificationBar verse={todaysVerse.verse} reference={todaysVerse.reference} />
      
      <main className="container pt-24 pb-8">
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="space-y-2 text-center animate-fade-up">
            <h1 className="text-4xl font-serif font-bold tracking-tight">
              Daily Word of Wisdom
            </h1>
            <p className="text-muted-foreground">
              Find strength and guidance in daily scripture
            </p>
          </div>

          <div className="space-y-6">
            <DailyVerse
              verse={todaysVerse.verse}
              reference={todaysVerse.reference}
              theme={theme}
            />
            
            <div className="flex justify-center">
              <SupportDialog />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;