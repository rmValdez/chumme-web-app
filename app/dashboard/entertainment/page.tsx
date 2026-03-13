"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X } from "lucide-react";
const entertainmentCategories = [
{ id: 1, name: "Music",    description: "All music related content",    subcategories: 12, status: "Active" },
{ id: 2, name: "Sports",   description: "Sports teams and events",      subcategories: 8,  status: "Active" },
{ id: 3, name: "Movies",   description: "Films and cinema",             subcategories: 6,  status: "Active" },
{ id: 4, name: "TV Shows", description: "Television series",            subcategories: 10, status: "Active" },
{ id: 5, name: "Gaming",   description: "Video games and esports",      subcategories: 9,  status: "Active" },
];
const subcategories = [
{ id: 1, name: "K-Pop",      category: "Music",  topics: 45, status: "Active" },
{ id: 2, name: "Hip-Hop",    category: "Music",  topics: 32, status: "Active" },
{ id: 3, name: "Basketball", category: "Sports", topics: 28, status: "Active" },
{ id: 4, name: "Football",   category: "Sports", topics: 34, status: "Active" },
{ id: 5, name: "Marvel",     category: "Movies", topics: 18, status: "Active" },
];
const topics = [
{ id: 1, name: "BTS",       category: "Music",  subcategory: "K-Pop",      type: "Group", followers: "2.3M" },
{ id: 2, name: "BLACKPINK", category: "Music",  subcategory: "K-Pop",      type: "Group", followers: "1.9M" },
{ id: 3, name: "EXO",       category: "Music",  subcategory: "K-Pop",      type: "Group", followers: "1.2M" },
{ id: 4, name: "Lakers",    category: "Sports", subcategory: "Basketball", type: "Team",  followers: "890K" },
{ id: 5, name: "Barcelona", category: "Sports", subcategory: "Football",   type: "Team",  followers: "1.5M" },
];
const TABS = ["Overview", "Categories", "Subcategories", "Topics"];
export default function EntertainmentPage() {
const [tab, setTab] = useState("Overview");
const [showModal, setShowModal] = useState(false);
return (
<>
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Entertainment</h1>
<p className="text-gray-500 dark:text-gray-400">Manage categories, subcategories and topics</p>
</motion.div>
  <div className="flex gap-2 mb-6 flex-wrap">
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

  {tab === "Overview" && (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[["Categories", "5", "Active categories on the platform"],["Subcategories", "45", "Across all categories"],["Topics", "240+", "Followed by fans worldwide"]].map(([l, v, d]) => (
        <div key={l} className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{l}</p>
          <p className="text-3xl font-bold text-[#A53860] mb-2">{v}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{d}</p>
        </div>
      ))}
    </div>
  )}

  {(tab === "Categories" || tab === "Subcategories" || tab === "Topics") && (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">{tab}</h3>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add {tab.slice(0, -1)}
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="border-b border-gray-100 dark:border-gray-700">
          <tr className="text-left text-xs text-gray-400 uppercase tracking-wide">
            {tab === "Categories" && <><th className="px-6 py-4">Name</th><th className="px-6 py-4">Description</th><th className="px-6 py-4">Subcategories</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th></>}
            {tab === "Subcategories" && <><th className="px-6 py-4">Name</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Topics</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th></>}
            {tab === "Topics" && <><th className="px-6 py-4">Name</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Subcategory</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Followers</th><th className="px-6 py-4">Actions</th></>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {tab === "Categories" && entertainmentCategories.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{r.name}</td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate">{r.description}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.subcategories}</td>
              <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{r.status}</span></td>
              <td className="px-6 py-4"><div className="flex gap-2"><button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4 text-gray-500" /></button><button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button></div></td>
            </tr>
          ))}
          {tab === "Subcategories" && subcategories.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{r.name}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.category}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.topics}</td>
              <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{r.status}</span></td>
              <td className="px-6 py-4"><div className="flex gap-2"><button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4 text-gray-500" /></button><button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button></div></td>
            </tr>
          ))}
          {tab === "Topics" && topics.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{r.name}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.category}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.subcategory}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.type}</td>
              <td className="px-6 py-4 font-semibold text-[#A53860]">{r.followers}</td>
              <td className="px-6 py-4"><div className="flex gap-2"><button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4 text-gray-500" /></button><button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add {tab.slice(0, -1)}</h3>
          <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <input type="text" placeholder="Name" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm mb-4 outline-none focus:border-[#A53860]" />
        <textarea placeholder="Description" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm mb-4 outline-none focus:border-[#A53860] resize-none" />
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">Cancel</button>
          <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm text-white bg-gradient-to-r from-[#A53860] to-[#670D2F]">Create</button>
        </div>
      </motion.div>
    </div>
  )}
</>
);
}
