import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface NotificationBarProps {
  verse: string;
  reference: string;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({
  verse,
  reference,
}) => {
  const { toast } = useToast();

  const requestNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast({
          title: "Notifications enabled",
          description: "You'll receive daily verse notifications",
        });
      }
    } catch (err) {
      console.error("Error requesting notification permission:", err);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b z-50 animate-fade-in">
      <div className="container flex items-center justify-between h-14">
        <p className="text-sm text-muted-foreground hidden sm:block">
          Today's Verse: {verse.substring(0, 50)}...
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={requestNotifications}
        >
          <Bell className="h-4 w-4 mr-2" />
          Enable Notifications
        </Button>
      </div>
    </div>
  );
};