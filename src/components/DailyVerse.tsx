import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DailyVerseProps {
  verse: string;
  reference: string;
  theme: string;
}

export const DailyVerse: React.FC<DailyVerseProps> = ({ verse, reference, theme }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Daily Bible Verse",
        text: `${verse} - ${reference}`,
      });
    } catch (err) {
      toast({
        title: "Copied to clipboard",
        description: "The verse has been copied to your clipboard.",
      });
      await navigator.clipboard.writeText(`${verse} - ${reference}`);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-8 backdrop-blur-sm bg-card/80 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {theme}
          </p>
          <blockquote className="font-serif text-2xl sm:text-3xl text-foreground">
            "{verse}"
          </blockquote>
          <p className="text-right text-sm font-medium text-muted-foreground">
            - {reference}
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full sm:w-auto transition-all hover:scale-105"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Verse
        </Button>
      </div>
    </Card>
  );
};