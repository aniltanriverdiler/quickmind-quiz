import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useSettingsStore } from "../store/settingsStore";
import { useAuthStore } from "../store/authStore";
import { useAchievements } from "../store/achievements";
import { useLeaderboardStore } from "../store/leader";
import bgVideo from "../assets/color-smoke-14.mp4";
import { toast } from "sonner";
import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Download,
  Upload,
  Trash2,
  User,
  Monitor,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Clock,
  Save,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
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
} from "../components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

function Settings() {
  const { currentUser } = useAuthStore();
  const {
    theme,
    colorPalette,
    quizSettings,
    notifications,
    userProfile,
    setTheme,
    setColorPalette,
    updateQuizSettings,
    updateNotifications,
    updateUserProfile,
    exportData,
    importData,
    resetAllData,
    resetQuizHistory,
    requestNotificationPermission,
  } = useSettingsStore();

  const { reset: resetAchievements } = useAchievements();
  const { clearLeaderboard } = useLeaderboardStore();

  const [importFile, setImportFile] = useState<File | null>(null);

  // Avatar options
  const avatarOptions = [
    "😀",
    "😎",
    "🤓",
    "🧠",
    "🎯",
    "🏆",
    "🚀",
    "⭐",
    "🔥",
    "💎",
    "👑",
    "🎮",
    "🎨",
    "🎭",
    "🎪",
    "🎸",
  ];

  // Handle Export
  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quickmind-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("✅ Data exported successfully!");
    } catch (error) {
      toast.error("❌ Export failed!");
      console.error(error);
    }
  };

  // Handle Import
  const handleImport = () => {
    if (!importFile) {
      toast.error("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const success = importData(data);
        if (success) {
          toast.success("✅ Data imported successfully! Reloading...");
          setTimeout(() => window.location.reload(), 1500);
        } else {
          toast.error("❌ Import failed! Invalid file format.");
        }
      } catch (error) {
        toast.error("❌ Import failed!");
        console.error(error);
      }
    };
    reader.readAsText(importFile);
  };

  // Handle Notification Permission
  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      toast.success("✅ Notifications enabled!");
      // Send test notification
      new Notification("QuickMind Quiz", {
        body: "You will now receive notifications!",
        icon: "/brain.png",
      });
    } else {
      toast.error("❌ Notification permission denied!");
    }
  };

  // Handle Reset All
  const handleResetAll = () => {
    resetAllData();
    resetAchievements();
    clearLeaderboard();
    toast.success("✅ All data has been reset!");
    setTimeout(() => window.location.reload(), 1500);
  };

  // Handle Reset Quiz History
  const handleResetQuizHistory = () => {
    resetQuizHistory();
    toast.success("✅ Quiz history has been reset!");
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src={bgVideo}
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/20 via-black/35 to-black/60" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto pt-8 sm:pt-10 pb-8 p-4 sm:p-6 space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="pb-2 text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            ⚙️ Settings
          </h1>
          <p className="text-xl text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            Customize your QuickMind experience
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Theme & Visual */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Palette className="w-5 h-5 text-purple-400" />
                Visual Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Theme Mode */}
              <div className="space-y-2">
                <Label className="text-white/90">Theme Mode</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    className={`${
                      theme === "light"
                        ? "bg-blue-500/25 text-blue-200 border-blue-400/60"
                        : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                    }`}
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    className={`${
                      theme === "dark"
                        ? "bg-blue-500/25 text-blue-200 border-blue-400/60"
                        : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                    }`}
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    onClick={() => setTheme("system")}
                    className={`${
                      theme === "system"
                        ? "bg-blue-500/25 text-blue-200 border-blue-400/60"
                        : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                    }`}
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    Auto
                  </Button>
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-2">
                <Label className="text-white/90">Color Palette</Label>
                <div className="grid grid-cols-4 gap-2">
                  {["default", "blue", "purple", "green"].map((palette) => (
                    <button
                      key={palette}
                      onClick={() => setColorPalette(palette)}
                      className={`h-10 rounded-lg border-2 transition-all ${
                        colorPalette === palette
                          ? "border-white/80 scale-105"
                          : "border-white/20 hover:border-white/40"
                      } ${
                        palette === "default"
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : palette === "blue"
                          ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                          : palette === "purple"
                          ? "bg-gradient-to-r from-purple-400 to-pink-400"
                          : "bg-gradient-to-r from-green-400 to-emerald-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Quiz Settings */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <SettingsIcon className="w-5 h-5 text-green-400" />
                Quiz Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Default Questions */}
              <div className="space-y-2">
                <Label className="text-white/90">Default Question Count</Label>
                <Select
                  value={quizSettings.defaultQuestions.toString()}
                  onValueChange={(value) =>
                    updateQuizSettings({ defaultQuestions: parseInt(value) })
                  }
                >
                  <SelectTrigger className="bg-white/15 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800/95 backdrop-blur-md border-white/20">
                    {[5, 10, 15, 20, 25].map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="text-white hover:bg-white/20 focus:bg-white/20 focus:text-white cursor-pointer"
                      >
                        {num} Questions
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Default Difficulty */}
              <div className="space-y-2">
                <Label className="text-white/90">Default Difficulty</Label>
                <Select
                  value={quizSettings.defaultDifficulty}
                  onValueChange={(value) =>
                    updateQuizSettings({
                      defaultDifficulty: value as "easy" | "medium" | "hard",
                    })
                  }
                >
                  <SelectTrigger className="bg-white/15 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800/95 backdrop-blur-md border-white/20">
                    <SelectItem
                      value="easy"
                      className="text-white hover:bg-white/20 focus:bg-white/20 focus:text-white cursor-pointer"
                    >
                      Easy
                    </SelectItem>
                    <SelectItem
                      value="medium"
                      className="text-white hover:bg-white/20 focus:bg-white/20 focus:text-white cursor-pointer"
                    >
                      Medium
                    </SelectItem>
                    <SelectItem
                      value="hard"
                      className="text-white hover:bg-white/20 focus:bg-white/20 focus:text-white cursor-pointer"
                    >
                      Hard
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Toggle Options */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/70" />
                    <span className="text-white/90">Show Timer</span>
                  </div>
                  <button
                    onClick={() =>
                      updateQuizSettings({ showTimer: !quizSettings.showTimer })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      quizSettings.showTimer ? "bg-green-500/50" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        quizSettings.showTimer
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4 text-white/70" />
                    <span className="text-white/90">Auto Save Results</span>
                  </div>
                  <button
                    onClick={() =>
                      updateQuizSettings({ autoSave: !quizSettings.autoSave })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      quizSettings.autoSave ? "bg-green-500/50" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        quizSettings.autoSave
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {quizSettings.soundEffects ? (
                      <Volume2 className="w-4 h-4 text-white/70" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-white/70" />
                    )}
                    <span className="text-white/90">Sound Effects</span>
                  </div>
                  <button
                    onClick={() =>
                      updateQuizSettings({
                        soundEffects: !quizSettings.soundEffects,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      quizSettings.soundEffects
                        ? "bg-green-500/50"
                        : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        quizSettings.soundEffects
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* 3. Notifications */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bell className="w-5 h-5 text-yellow-400" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enable Notifications */}
              <div className="space-y-2">
                <Button
                  onClick={handleEnableNotifications}
                  disabled={notifications.enabled}
                  className={`w-full ${
                    notifications.enabled
                      ? "bg-green-500/25 text-green-200 border-green-400/60"
                      : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  }`}
                >
                  {notifications.enabled ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Notifications Enabled
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4 mr-2" />
                      Enable Notifications
                    </>
                  )}
                </Button>
              </div>

              {/* Notification Preferences */}
              {notifications.enabled && (
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <label className="flex items-center justify-between">
                    <span className="text-white/90">Quiz Reminders</span>
                    <button
                      onClick={() =>
                        updateNotifications({
                          quizReminders: !notifications.quizReminders,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.quizReminders
                          ? "bg-green-500/50"
                          : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.quizReminders
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-white/90">Achievement Alerts</span>
                    <button
                      onClick={() =>
                        updateNotifications({
                          achievementAlerts: !notifications.achievementAlerts,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.achievementAlerts
                          ? "bg-green-500/50"
                          : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.achievementAlerts
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-white/90">Leaderboard Updates</span>
                    <button
                      onClick={() =>
                        updateNotifications({
                          leaderboardUpdates: !notifications.leaderboardUpdates,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.leaderboardUpdates
                          ? "bg-green-500/50"
                          : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.leaderboardUpdates
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-white/90">Daily Streak</span>
                    <button
                      onClick={() =>
                        updateNotifications({
                          dailyStreak: !notifications.dailyStreak,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.dailyStreak
                          ? "bg-green-500/50"
                          : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.dailyStreak
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 4. User Profile */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="w-5 h-5 text-cyan-400" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentUser ? (
                <>
                  {/* Display Name */}
                  <div className="space-y-2">
                    <Label className="text-white/90">Display Name</Label>
                    <Input
                      value={userProfile.displayName || currentUser.name}
                      onChange={(e) =>
                        updateUserProfile({ displayName: e.target.value })
                      }
                      placeholder="Enter display name"
                      className="bg-white/15 border-white/30 text-white placeholder:text-white/70"
                    />
                  </div>

                  {/* Avatar Selection */}
                  <div className="space-y-2">
                    <Label className="text-white/90">Avatar</Label>
                    <div className="grid grid-cols-8 gap-2">
                      {avatarOptions.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => updateUserProfile({ avatar: emoji })}
                          className={`text-2xl p-2 rounded-lg border-2 transition-all hover:scale-110 ${
                            userProfile.avatar === emoji
                              ? "border-white/80 bg-white/20"
                              : "border-white/20 bg-white/5"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visibility */}
                  <div className="space-y-2">
                    <Label className="text-white/90">Profile Visibility</Label>
                    <Select
                      value={userProfile.visibility}
                      onValueChange={(value) =>
                        updateUserProfile({
                          visibility: value as "public" | "private" | "friends",
                        })
                      }
                    >
                      <SelectTrigger className="bg-white/15 border-white/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800/95 backdrop-blur-md border-white/20">
                        <SelectItem
                          value="public"
                          className="text-white hover:bg-white/20 focus:bg-white/20 focus:text-white cursor-pointer"
                        >
                          Public
                        </SelectItem>
                        <SelectItem
                          value="friends"
                          className="text-white hover:bg-white/20 focus:bg-white/20 focus:text-white cursor-pointer"
                        >
                          Friends Only
                        </SelectItem>
                        <SelectItem
                          value="private"
                          className="text-white hover:bg-white/20 focus:bg-white/20 focus:text-white cursor-pointer"
                        >
                          Private
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-white/60">
                  Please login to customize your profile
                </div>
              )}
            </CardContent>
          </Card>

          {/* 5. Data Management */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Trash2 className="w-5 h-5 text-red-400" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Export/Import */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/90">Export All Data</Label>
                  <Button
                    onClick={handleExport}
                    className="w-full bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/90">Import Data</Label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept=".json"
                      onChange={(e) =>
                        setImportFile(e.target.files?.[0] || null)
                      }
                      className="bg-white/15 border-white/30 text-white file:text-white/80"
                    />
                    <Button
                      onClick={handleImport}
                      disabled={!importFile}
                      className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Reset Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-orange-500/20 text-orange-200 border-orange-400/30 hover:bg-orange-500/30"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Reset Quiz History
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-white">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        Reset Quiz History
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-white/80">
                        This will permanently delete all your quiz history. This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white/15 text-white/85 border-white/30">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleResetQuizHistory}
                        className="bg-orange-500/20 text-orange-200 border-orange-400/30 hover:bg-orange-500/30"
                      >
                        Reset History
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-red-500/20 text-red-200 border-red-400/30 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Reset All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-white">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        Reset All Data
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-white/80">
                        This will permanently delete ALL your data including:
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Quiz history</li>
                          <li>• Achievements</li>
                          <li>• Leaderboard scores</li>
                          <li>• Settings</li>
                        </ul>
                        <strong className="block mt-2 text-red-300">
                          This action cannot be undone!
                        </strong>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white/15 text-white/85 border-white/30">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleResetAll}
                        className="bg-red-500/20 text-red-200 border-red-400/30 hover:bg-red-500/30"
                      >
                        Reset Everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;
