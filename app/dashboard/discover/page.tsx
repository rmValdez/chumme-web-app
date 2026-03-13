"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
const discoverLinks = [
{ id: 1, platform: "YouTube",   link: "youtube.com/watch?v=abc123",    preview: "BLACKPINK concert clip",        user: "rosie_bp",      fandom: "BLACKPINK",  status: "Approved", date: "2026-03-08" },
{ id: 2, platform: "TikTok",    link: "tiktok.com/@user/video/xyz",    preview: "BTS dance challenge",           user: "army_forever",  fandom: "BTS",        status: "Approved", date: "2026-03-07" },
{ id: 3, platform: "Instagram", link: "instagram.com/p/def456",        preview: "STRAY KIDS behind the scenes", user: "stay_official", fandom: "STRAY KIDS", status: "Pending",  date: "2026-03-09" },
{ id: 4, platform: "Twitter",   link: "twitter.com/user/status/789",   preview: "SEVENTEEN comeback teaser",     user: "carat_world",   fandom: "SEVENTEEN",  status: "Approved", date: "2026-03-06" },
];
const featured = [
{ id: 1, post: "BLACKPINK Concert Clip",         platform: "YouTube", fandom: "BLACKPINK",  rank: 1, duration: "7 days"  },
{ id: 2, post: "BTS World Tour Announcement",    platform: "TikTok",  fandom: "BTS",        rank: 2, duration: "14 days" },
{ id: 3, post: "STRAY KIDS Comeback Teaser",     platform: "YouTube", fandom: "STRAY KIDS", rank: 3, duration: "5 days"  },
];
const statusBadge = (s: string) => {
if (s === "Approved") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
if (s === "Pending")  return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
};
const TABS = ["Links", "Featured"];
export default function DiscoverPage() {
const [tab, setTab] = useState("Links");
return (
<>
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Discover</h1>
<p className="text-gray-500 dark:text-gray-400">Manage submitted links and featured content</p>
</motion.div>
  {/* Tabs */}
  <div className="flex gap-2 mb-6">
    {TABS.map((t) => (
      <button key={t} onClick={() => setTab(t)}
        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
          tab === t
            ? "bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white"
            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#A53860]"
        }`}
      >{t}</button>
    ))}
  </div>

  {tab === "Links" && (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-100 dark:border-gray-700">
          <tr className="text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            <th className="px-6 py-4">Platform</th>
            <th className="px-6 py-4">Preview</th>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Fandom</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {discoverLinks.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.platform}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate">{row.preview}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{row.user}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{row.fandom}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge(row.status)}`}>{row.status}</span>
              </td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{row.date}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500" title="Reject"><XCircle className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {tab === "Featured" && (
    <div className="space-y-4">
      {featured.map((item) => (
        <div key={item.id} className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-5 flex items-center gap-5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A53860] to-[#670D2F] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {item.rank}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-white">{item.post}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.platform} · {item.fandom} · {item.duration}</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
    </div>
  )}
</>
);
}
