import { Card, CardContent } from "../ui/card";
import { Medal, CalendarClock, Trophy, UserCircle2 } from "lucide-react";

interface PlayerProfile {
  username: string;
  title: string;
  joined: string;
  level: string;
}

interface PlayerProfileCardProps {
  profile: PlayerProfile;
  children?: React.ReactNode;
}

export function PlayerProfileCard({
  profile,
  children,
}: PlayerProfileCardProps) {
  return (
    <Card className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar (fallback to brain icon) */}
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center ring-4 ring-white/20 overflow-hidden">
            <UserCircle2 className="h-14 w-14 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                {profile.username.toUpperCase()}
              </h2>
              <Medal className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-sm text-white/80">{profile.title}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-1">
                <CalendarClock className="h-4 w-4" /> Member since:{" "}
                {profile.joined}
              </span>
              <span className="inline-flex items-center gap-1">
                <Trophy className="h-4 w-4" /> Level: {profile.level}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      </CardContent>
    </Card>
  );
}
