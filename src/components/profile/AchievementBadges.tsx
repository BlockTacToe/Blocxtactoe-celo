"use client";

import { Address } from "viem";
import { Trophy, Award, Zap, Crown, Rocket, Flame, Target, Skull } from "lucide-react";

interface AchievementBadgesProps {
  playerAddress: Address;
}

export default function AchievementBadges({ playerAddress }: AchievementBadgesProps) {
  // Mock achievements data
  const achievements = [
    {
      id: 1,
      name: "First Blood",
      description: "Win your first game",
      icon: <Skull className="w-6 h-6" />,
      unlocked: true,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
    },
    {
      id: 2,
      name: "High Roller",
      description: "Win a game with > 100 CELO bet",
      icon: <Crown className="w-6 h-6" />,
      unlocked: true,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
    },
    {
      id: 3,
      name: "Speed Demon",
      description: "Win a game in under 1 minute",
      icon: <Zap className="w-6 h-6" />,
      unlocked: false,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      id: 4,
      name: "Marathon",
      description: "Play 100 total games",
      icon: <Rocket className="w-6 h-6" />,
      unlocked: false,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
    },
    {
      id: 5,
      name: "On Fire",
      description: "Win 5 games in a row",
      icon: <Flame className="w-6 h-6" />,
      unlocked: true,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
    },
    {
      id: 6,
      name: "Sharpshooter",
      description: "Win without a single draw in history",
      icon: <Target className="w-6 h-6" />,
      unlocked: false,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
    },
    {
      id: 7,
      name: "Champion",
      description: "Reach top 10 on leaderboard",
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
    },
    {
      id: 8,
      name: "Veteran",
      description: "Account active for > 1 year",
      icon: <Award className="w-6 h-6" />,
      unlocked: true,
      color: "text-gray-300",
      bg: "bg-gray-500/10",
      border: "border-gray-500/30",
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Award className="w-6 h-6 text-purple-400" />
            Achievements
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Unlocked: <span className="text-white font-bold">{unlockedCount}</span> / {achievements.length}
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-1/3 hidden sm:block">
          <div className="flex justify-end mb-1 text-xs text-purple-300">
            {Math.round((unlockedCount / achievements.length) * 100)}% Complete
          </div>
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`
              relative p-4 rounded-xl border transition-all duration-300 group
              ${achievement.unlocked 
                ? `${achievement.bg} ${achievement.border} hover:scale-[1.02] hover:shadow-lg` 
                : "bg-black/20 border-white/5 grayscale opacity-60 hover:opacity-80"}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${achievement.unlocked ? "bg-black/20" : "bg-black/40"}`}>
                <div className={achievement.unlocked ? achievement.color : "text-gray-500"}>
                  {achievement.icon}
                </div>
              </div>
              {achievement.unlocked && (
                <div className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20">
                  UNLOCKED
                </div>
              )}
            </div>
            
            <h3 className={`font-bold text-sm mb-1 ${achievement.unlocked ? "text-white" : "text-gray-400"}`}>
              {achievement.name}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
