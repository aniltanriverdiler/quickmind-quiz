import { Card, CardContent } from "../ui/card";

type Props = {
  title: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  progress?: number;
  unlockedAt?: string;
};

export function AchievementCard({
  title,
  description,
  rarity,
  unlocked,
  progress,
  unlockedAt,
}: Props) {
  return (
    <Card
      className={`rounded-xl ${
        unlocked
          ? "bg-emerald-500/10 border-emerald-400/30"
          : "bg-white/5 border-white/15"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white font-semibold">{title}</div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white/80 border border-white/25">
            {rarity}
          </span>
        </div>
        <div className="text-white/80 text-sm mb-3">{description}</div>
        {typeof progress === "number" && (
          <div className="w-full h-2 bg-white/10 rounded">
            <div
              className={`h-2 rounded ${
                unlocked ? "bg-emerald-400" : "bg-white/40"
              }`}
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        )}
        {unlocked && unlockedAt && (
          <div className="text-[11px] text-white/50 mt-2">
            Unlocked at: {new Date(unlockedAt).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
