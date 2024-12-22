import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const supportQuestions = [
  {
    id: "feeling",
    question: "How are you feeling today?",
    options: ["Overwhelmed", "Anxious", "Sad", "Lost", "Hopeful"],
  },
  {
    id: "situation",
    question: "What best describes your situation?",
    options: [
      "Seeking guidance",
      "Need encouragement",
      "Looking for peace",
      "Wanting direction",
      "Seeking comfort",
    ],
  },
];

const supportVerses = {
  Overwhelmed: {
    verse: "Cast your burden on the Lord, and he will sustain you; he will never permit the righteous to be moved.",
    reference: "Psalm 55:22",
  },
  Anxious: {
    verse: "When anxiety was great within me, your consolation brought me joy.",
    reference: "Psalm 94:19",
  },
  Sad: {
    verse: "The Lord is near to the brokenhearted and saves the crushed in spirit.",
    reference: "Psalm 34:18",
  },
  Lost: {
    verse: "I will instruct you and teach you in the way you should go; I will counsel you with my eye upon you.",
    reference: "Psalm 32:8",
  },
  Hopeful: {
    verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31",
  },
};

export const SupportDialog = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [supportVerse, setSupportVerse] = useState<{
    verse: string;
    reference: string;
  } | null>(null);

  const handleSelection = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    if (questionId === "feeling") {
      setSupportVerse(supportVerses[answer as keyof typeof supportVerses]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto transition-all hover:scale-105"
        >
          Need Support?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Find Comfort in Scripture</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] px-1">
          <div className="space-y-6 py-4">
            {supportQuestions.map((q) => (
              <div key={q.id} className="space-y-4">
                <h4 className="font-medium text-sm">{q.question}</h4>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((option) => (
                    <Button
                      key={option}
                      variant={answers[q.id] === option ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSelection(q.id, option)}
                      className="transition-all hover:scale-105"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            {supportVerse && (
              <Card className="p-4 mt-4 animate-fade-in">
                <blockquote className="font-serif text-lg">
                  "{supportVerse.verse}"
                </blockquote>
                <p className="text-right text-sm text-muted-foreground mt-2">
                  - {supportVerse.reference}
                </p>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};