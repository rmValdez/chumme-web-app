"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Power, MessageSquare, Mic, Video } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const artists = [
{ id: "1", name: "Lisa",      initials: "L",  type: "Chat",       status: "Active"   },
{ id: "2", name: "Jennie",    initials: "J",  type: "Voice Chat", status: "Active"   },
{ id: "3", name: "Jungkook",  initials: "JK", type: "AI Avatar",  status: "Disabled" },
{ id: "4", name: "Taylor",    initials: "T",  type: "Chat",       status: "Active"   },
];
const analyticsData = [
{ name: "Mon", chats: 120, voice: 45,  avatar: 20 },
{ name: "Tue", chats: 180, voice: 60,  avatar: 35 },
{ name: "Wed", chats: 150, voice: 55,  avatar: 30 },
{ name: "Thu", chats: 220, voice: 80,  avatar: 50 },
{ name: "Fri", chats: 280, voice: 95,  avatar: 65 },
{ name: "Sat", chats: 310, voice: 110, avatar: 75 },
{ name: "Sun", chats: 290, voice: 100, avatar: 70 },
];
const typeIcon = (t: string) => {
if (t === "Voice Chat") return <Mic className="w-4 h-4" />;
if (t === "AI Avatar")  return <Video className="w-4 h-4" />;
return <MessageSquare className="w-4 h-4" />;
};
const TABS = ["Artists", "Analytics"];
export default function AIChatPage() {
const [tab, setTab] = useState("Artists");
const [showModal, setShowModal] = useState(false);
return (
<>
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Chumme AI Chat</h1>
<p className="text-gray-500 dark:text-gray-400">Manage AI artist personas and chat analytics</p>
</motion.div>
  <div className="flex gap-2 mb-6">
    {TABS.map((t) => (
      <button key={t} onClick={() => setTab(t)}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          tab === t
            ? "bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white"
            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
        }`}
      >{t}</button>
    ))}
  </div>

  {tab === "Artists" && (
    <>
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white text-sm font-semibold"><Plus className="w-4 h-4" /> Add AI Artist</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artists.map((a) => (
          <div key={a.id} className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EF88AD] to-[#A53860] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{a.initials}</div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 dark:text-white">{a.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">{typeIcon(a.type)}{a.type}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${a.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>{a.status}</span>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Power className="w-4 h-4 text-gray-500" /></button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4 text-gray-500" /></button>
              <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  )}

  {tab === "Analytics" && (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6">
      <h3 className="font-bold text-gray-900 dark:text-white mb-6">Weekly AI Interactions</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
          <Line type="monotone" dataKey="chats"  stroke="#A53860" strokeWidth={2.5} dot={false} name="Text Chats" />
          <Line type="monotone" dataKey="voice"  stroke="#EF88AD" strokeWidth={2.5} dot={false} name="Voice Chats" />
          <Line type="monotone" dataKey="avatar" stroke="#670D2F" strokeWidth={2.5} dot={false} name="AI Avatar" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )}

  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add AI Artist</h3>
          <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <input type="text" placeholder="Artist name" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white mb-3 outline-none focus:border-[#A53860]" />
        <select className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white mb-3 outline-none focus:border-[#A53860]">
          <option>Chat</option><option>Voice Chat</option><option>AI Avatar</option>
        </select>
        <textarea rows={3} placeholder="Personality prompt…" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white mb-4 outline-none focus:border-[#A53860] resize-none" />
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">Cancel</button>
          <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm text-white bg-gradient-to-r from-[#A53860] to-[#670D2F]">Create</button>
        </div>
      </motion.div>
    </div>
  )}
</>
);
}
