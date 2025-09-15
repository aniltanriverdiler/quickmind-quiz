import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, Calendar, Target, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SortKey = "date_desc" | "date_asc" | "percent_desc" | "percent_asc";
type DateFilter = "all" | "week" | "month" | "year";
type ScoreFilter = "all" | "excellent" | "good" | "fair" | "poor";

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  dateFilter: DateFilter;
  setDateFilter: (value: DateFilter) => void;
  scoreFilter: ScoreFilter;
  setScoreFilter: (value: ScoreFilter) => void;
  sortKey: SortKey;
  setSortKey: (value: SortKey) => void;
}

export function FilterControls({
  searchTerm,
  setSearchTerm,
  dateFilter,
  setDateFilter,
  scoreFilter,
  setScoreFilter,
  sortKey,
  setSortKey,
}: FilterControlsProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
        <Input
          placeholder="Search history..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-40 bg-white/10 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
        />
      </div>

      {/* Date Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {dateFilter === "all"
              ? "All Time"
              : dateFilter === "week"
              ? "This Week"
              : dateFilter === "month"
              ? "This Month"
              : "This Year"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-md border border-white/20">
          <DropdownMenuLabel className="text-white">
            Filter by Date
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={dateFilter === "all"}
            onCheckedChange={() => setDateFilter("all")}
            className="text-white hover:bg-white/10"
          >
            All Time
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={dateFilter === "week"}
            onCheckedChange={() => setDateFilter("week")}
            className="text-white hover:bg-white/10"
          >
            This Week
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={dateFilter === "month"}
            onCheckedChange={() => setDateFilter("month")}
            className="text-white hover:bg-white/10"
          >
            This Month
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={dateFilter === "year"}
            onCheckedChange={() => setDateFilter("year")}
            className="text-white hover:bg-white/10"
          >
            This Year
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Score Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <Target className="h-4 w-4 mr-2" />
            {scoreFilter === "all"
              ? "All Scores"
              : scoreFilter === "excellent"
              ? "90%+"
              : scoreFilter === "good"
              ? "70-89%"
              : scoreFilter === "fair"
              ? "50-69%"
              : "&lt;50%"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-md border border-white/20">
          <DropdownMenuLabel className="text-white">
            Filter by Score
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={scoreFilter === "all"}
            onCheckedChange={() => setScoreFilter("all")}
            className="text-white hover:bg-white/10"
          >
            All Scores
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={scoreFilter === "excellent"}
            onCheckedChange={() => setScoreFilter("excellent")}
            className="text-white hover:bg-white/10"
          >
            Excellent (90%+)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={scoreFilter === "good"}
            onCheckedChange={() => setScoreFilter("good")}
            className="text-white hover:bg-white/10"
          >
            Good (70-89%)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={scoreFilter === "fair"}
            onCheckedChange={() => setScoreFilter("fair")}
            className="text-white hover:bg-white/10"
          >
            Fair (50-69%)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={scoreFilter === "poor"}
            onCheckedChange={() => setScoreFilter("poor")}
            className="text-white hover:bg-white/10"
          >
            Poor (&lt;50%)
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-md border border-white/20">
          <DropdownMenuLabel className="text-white">Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/20" />
          <DropdownMenuCheckboxItem
            checked={sortKey === "date_desc"}
            onCheckedChange={() => setSortKey("date_desc")}
            className="text-white hover:bg-white/10"
          >
            Date (newest)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortKey === "date_asc"}
            onCheckedChange={() => setSortKey("date_asc")}
            className="text-white hover:bg-white/10"
          >
            Date (oldest)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortKey === "percent_desc"}
            onCheckedChange={() => setSortKey("percent_desc")}
            className="text-white hover:bg-white/10"
          >
            Percentage (high to low)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortKey === "percent_asc"}
            onCheckedChange={() => setSortKey("percent_asc")}
            className="text-white hover:bg-white/10"
          >
            Percentage (low to high)
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Start New Quiz Button */}
      <Button
        onClick={() => navigate("/quiz")}
        className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20 hover:from-blue-500/30 hover:to-cyan-400/30 text-white border border-blue-400/30 hover:border-blue-400/50 backdrop-blur-sm shadow-sm hover:shadow-md"
      >
        <Gamepad2 className="w-7 h-7" />
        <span className="ml-1">Start New Quiz</span>
      </Button>
    </>
  );
}
