import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Eye, EyeOff, Copy, Share2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface StatsToggleProps {
  showStats: boolean;
  setShowStats: (value: boolean) => void;
  filteredCount: number;
  totalCount: number;
  onCopyStats: () => void;
  onShareStats: () => void;
}

export function StatsToggle({
  showStats,
  setShowStats,
  filteredCount,
  totalCount,
  onCopyStats,
  onShareStats,
}: StatsToggleProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCopyStats = () => {
    onCopyStats();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setShowStats(!showStats)}
          variant="outline"
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm"
        >
          {showStats ? (
            <EyeOff className="h-4 w-4 mr-2" />
          ) : (
            <Eye className="h-4 w-4 mr-2" />
          )}
          {showStats ? "Hide Stats" : "Show Stats"}
        </Button>
        <span className="text-white/60 text-sm">
          Showing {filteredCount} of {totalCount} results
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={handleCopyStats}
          variant="outline"
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Stats
        </Button>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Statistics Copied!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/80">
                Your quiz statistics have been successfully copied to clipboard!
                You can now paste them anywhere you want to share your progress.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={handleCloseDialog}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-200 border border-green-400/30 hover:border-green-400/50"
              >
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          onClick={onShareStats}
          variant="outline"
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Stats
        </Button>
      </div>
    </div>
  );
}
