import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Download, RotateCcw } from "lucide-react";

interface ExportControlsProps {
  onExportCSV: () => void;
  onExportJSON: () => void;
  onResetHistory: () => void;
}

export function ExportControls({
  onExportCSV,
  onExportJSON,
  onResetHistory,
}: ExportControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Button
          onClick={onExportCSV}
          variant="outline"
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
        <Button
          onClick={onExportJSON}
          variant="outline"
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
        >
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 hover:border-red-400/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset History
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Reset Quiz History
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/80">
              Are you sure you want to delete all your quiz history? This action
              cannot be undone and will permanently remove all your quiz
              results, scores, and progress data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onResetHistory}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 hover:border-red-400/50"
            >
              Yes, Reset History
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
