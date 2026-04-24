"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Search, 
  Video, 
  Music, 
  Heart, 
  Users 
} from "lucide-react";

interface OverviewTabProps {
  isDarkMode: boolean;
}

const ARTIST_OVERVIEW = [
  { name: "BTS", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop&crop=face", videos: 142, songs: 87, likes: 245800, followers: 128000 },
  { name: "BLACKPINK", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=face", videos: 98, songs: 63, likes: 198400, followers: 94500 },
  { name: "Stray Kids", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=80&h=80&fit=crop&crop=face", videos: 76, songs: 54, likes: 156200, followers: 72300 },
  { name: "SEVENTEEN", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=80&h=80&fit=crop&crop=face", videos: 65, songs: 48, likes: 134700, followers: 61800 },
  { name: "TWICE", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=80&h=80&fit=crop&crop=face", videos: 88, songs: 71, likes: 178300, followers: 83200 },
  { name: "aespa", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&h=80&fit=crop&crop=face", videos: 54, songs: 39, likes: 112500, followers: 52100 },
];

export const OverviewTab = ({ isDarkMode }: OverviewTabProps) => {
  const [search, setSearch] = useState("");
  const filtered = ARTIST_OVERVIEW.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Artists", value: ARTIST_OVERVIEW.length },
          { label: "Total Videos", value: ARTIST_OVERVIEW.reduce((a, c) => a + c.videos, 0).toLocaleString() },
          { label: "Total Songs", value: ARTIST_OVERVIEW.reduce((a, c) => a + c.songs, 0).toLocaleString() },
          { label: "Total Likes", value: (ARTIST_OVERVIEW.reduce((a, c) => a + c.likes, 0) / 1000).toFixed(1) + "K" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search artist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-[#A53860] outline-none transition-all text-sm"
        />
      </div>

      {/* Artist Table */}
      <div className="bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-5 px-6 py-3 border-b border-gray-200 dark:border-gray-700/50">
          {["Artist", "Videos", "Songs", "Likes", "Followers"].map((h) => (
            <p key={h} className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{h}</p>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((artist, index) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-5 px-6 py-4 border-b border-gray-100 dark:border-gray-700/30 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors items-center"
          >
            {/* Artist */}
            <div className="flex items-center gap-3">
              <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#A53860]/40" />
              <span className="font-semibold text-gray-900 dark:text-white">{artist.name}</span>
            </div>

            {/* Videos */}
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#A53860]" />
              <span className="font-medium text-gray-900 dark:text-white">{artist.videos}</span>
            </div>

            {/* Songs */}
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-gray-900 dark:text-white">{artist.songs}</span>
            </div>

            {/* Likes */}
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="font-medium text-gray-900 dark:text-white">{artist.likes.toLocaleString()}</span>
            </div>

            {/* Followers */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              <span className="font-medium text-gray-900 dark:text-white">{artist.followers.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No artists found</div>
        )}
      </div>
    </div>
  );
};

