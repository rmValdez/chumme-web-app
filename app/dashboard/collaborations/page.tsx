"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Users, Mic, Plus, Edit, Trash2, X, Ban } from "lucide-react";
const rooms = [
{ id: "1", name: "BTS Fan Collab",          type: "Public",  host: "army_forever",  participants: 8,  song: "Dynamite",              status: "Active" },
{ id: "2", name: "BLACKPINK Cover Session",  type: "Private", host: "rosie_bp",      participants: 4,  song: "How You Like That",     status: "Active" },
{ id: "3", name: "K-Pop Karaoke Night",      type: "Public",  host: "kpop_lover",    participants: 12, song: "Permission to Dance",   status: "Active" },
{ id: "4", name: "Indie Collab Room",        type: "Private", host: "indie_vibes",   participants: 3,  song: "Custom Track",          status: "Ended"  },
];
const songs = [
{ id: "1", title: "Dynamite",               artist: "BTS",      usageCount: 245, status: "Active"   },
{ id: "2", title: "How You Like That",       artist: "BLACKPINK",usageCount: 198, status: "Active"   },
{ id: "3", title: "Permission to Dance",     artist: "BTS",      usageCount: 167, status: "Active"   },
{ id: "4", title: "Pink Venom",              artist: "BLACKPINK",usageCount: 134, status: "Disabled" },
{ id: "5", title: "Butter",                  artist: "BTS",      usageCount: 212, status: "Active"   },
];
const TABS = [
{ id: "rooms",   label: "Rooms",   icon: Users },
{ id: "music",   label: "Music",   icon: Music },
{ id: "karaoke", label: "Karaoke", icon: Mic   },
];
export default function CollaborationsPage() {
const [tab, setTab] = useState("rooms");
const [showModal, setShowModal] = useState(false);
return (
<>
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Collaborations</h1>
<p className="text-gray-500 dark:text-gray-400">Manage collab rooms, music library and karaoke sessions</p>
</motion.div>
  <div className="flex gap-2 mb-6">
    {TABS.map((t) => (
      <button key={t.id} onClick={() => setTab(t.id)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          tab === t.id
            ? "bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white"
            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
        }`}
      ><t.icon className="w-4 h-4" />{t.label}</button>
    ))}
  </div>

  {tab === "rooms" && (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">Active Collaboration Rooms</h3>
      </div>
      <table className="w-full text-sm">
        <thead className="border-b border-gray-100 dark:border-gray-700">
          <tr className="text-left text-xs text-gray-400 uppercase tracking-wide">
            <th className="px-6 py-4">Room</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Host</th><th className="px-6 py-4">Participants</th><th className="px-6 py-4">Song</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {rooms.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{r.name}</td>
              <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.type === "Public" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"}`}>{r.type}</span></td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.host}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.participants}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.song}</td>
              <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>{r.status}</span></td>
              <td className="px-6 py-4"><div className="flex gap-2"><button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" title="End Room"><Ban className="w-4 h-4 text-red-500" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {tab === "music" && (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">Music Library</h3>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white text-sm font-semibold"><Plus className="w-4 h-4" /> Add Song</button>
      </div>
      <table className="w-full text-sm">
        <thead className="border-b border-gray-100 dark:border-gray-700">
          <tr className="text-left text-xs text-gray-400 uppercase tracking-wide">
            <th className="px-6 py-4">Title</th><th className="px-6 py-4">Artist</th><th className="px-6 py-4">Usage Count</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {songs.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{s.title}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{s.artist}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{s.usageCount}</td>
              <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>{s.status}</span></td>
              <td className="px-6 py-4"><div className="flex gap-2"><button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4 text-gray-500" /></button><button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {tab === "karaoke" && (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[["Active Sessions","8","Right now"],["Songs Available","240","In karaoke library"],["Total Recordings","1.2k","This month"]].map(([l, v, s]) => (
        <div key={l} className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{l}</p>
          <p className="text-3xl font-bold text-[#A53860] mb-1">{v}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{s}</p>
        </div>
      ))}
    </div>
  )}

  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Song</h3>
          <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <input type="text" placeholder="Song title" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white mb-3 outline-none focus:border-[#A53860]" />
        <input type="text" placeholder="Artist" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white mb-4 outline-none focus:border-[#A53860]" />
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">Cancel</button>
          <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm text-white bg-gradient-to-r from-[#A53860] to-[#670D2F]">Add Song</button>
        </div>
      </motion.div>
    </div>
  )}
</>
);
}
