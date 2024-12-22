import React, { useEffect, useState } from "react";
import { DailyVerse } from "@/components/DailyVerse";
import { SupportDialog } from "@/components/SupportDialog";
import { NotificationBar } from "@/components/NotificationBar";

const dailyVerses = [
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
  },
  {
    verse: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
  },
  // Add more verses as needed
];

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

const getDailyVerse = () => {
  // Use the date to create a consistent index for the day
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return dailyVerses[dayOfYear % dailyVerses.length];
};

const Index = () => {
  const [todaysVerse, setTodaysVerse] = useState(getDailyVerse());
  const theme = getMonthlyTheme();

  useEffect(() => {
    // Update verse when the date changes
    const checkDate = () => {
      const newVerse = getDailyVerse();
      if (newVerse.verse !== todaysVerse.verse) {
        setTodaysVerse(newVerse);
      }
    };

    // Check every minute for date changes
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, [todaysVerse]);

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