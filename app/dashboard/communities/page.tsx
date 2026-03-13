"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Grid3x3, Activity, Plus, Edit, Trash2, X } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
const countries = [
{ id: "1", name: "Philippines", categories: 12, communities: 120, status: "Active" },
{ id: "2", name: "Korea",       categories: 18, communities: 200, status: "Active" },
{ id: "3", name: "Japan",       categories: 10, communities: 95,  status: "Active" },
{ id: "4", name: "USA",         categories: 15, communities: 180, status: "Active" },
{ id: "5", name: "Thailand",    categories: 8,  communities: 75,  status: "Active" },
];
const categories = [
{ id: "1", name: "Fan Polls", country: "Philippines", communities: 25, color: "#A53860" },
{ id: "2", name: "Fan Meets", country: "Korea",       communities: 40, color: "#EF88AD" },
{ id: "3", name: "Merch",     country: "Japan",       communities: 18, color: "#670D2F" },
{ id: "4", name: "Events",    country: "USA",         communities: 32, color: "#F4C2A0" },
{ id: "5", name: "News",      country: "Thailand",    communities: 15, color: "#8B3A52" },
];
const pieData = [
{ name: "Philippines", value: 35, color: "#A53860" },
{ name: "Korea",       value: 25, color: "#EF88AD" },
{ name: "Japan",       value: 20, color: "#670D2F" },
{ name: "USA",         value: 20, color: "#F4C2A0" },
];
const TABS = [
{ id: "countries",   label: "Countries",   icon: MapPin },
{ id: "categories",  label: "Categories",  icon: Grid3x3 },
{ id: "analytics",   label: "Analytics",   icon: Activity },
];
export default function CommunitiesPage() {
const [tab, setTab] = useState("countries");
const [showModal, setShowModal] = useState(false);
const [modalTitle, setModalTitle] = useState("");
function openModal(title: string) { setModalTitle(title); setShowModal(true); }
return (
<>
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Communities</h1>
<p className="text-gray-500 dark:text-gray-400">Manage countries, categories and communities</p>
</motion.div>
  {/* Stat strip */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {[["Total Countries","5","#A53860"],["Total Categories","63","#EF88AD"],["Total Communities","670","#670D2F"],["Active Members","48.2k","#A53860"]].map(([l, v, c]) => (
      <div key={l} className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-5">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{l}</p>
        <p className="text-2xl font-bold" style={{ color: c as string }}>{v}</p>
      </div>
    ))}
  </div>

  {/* Tabs */}
  <div className="flex gap-2 mb-6">
    {TABS.map((t) => (
      <button key={t.id} onClick={() => setTab(t.id)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          tab === t.id
            ? "bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white"
            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
        }`}
      >
        <t.icon className="w-4 h-4" />{t.label}
      </button>
    ))}
  </div>

  {/* Countries tab */}
  {tab === "countries" && (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">Countries</h3>
        <button onClick={() => openModal("Add Country")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Country
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="border-b border-gray-100 dark:border-gray-700">
          <tr className="text-left text-xs text-gray-400 uppercase tracking-wide">
            <th className="px-6 py-4">Country</th><th className="px-6 py-4">Categories</th><th className="px-6 py-4">Communities</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {countries.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{c.name}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.categories}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.communities}</td>
              <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{c.status}</span></td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4 text-gray-500" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Categories tab */}
  {tab === "categories" && (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">Categories</h3>
        <button onClick={() => openModal("Add Category")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="border-b border-gray-100 dark:border-gray-700">
          <tr className="text-left text-xs text-gray-400 uppercase tracking-wide">
            <th className="px-6 py-4">Name</th><th className="px-6 py-4">Country</th><th className="px-6 py-4">Communities</th><th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {categories.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="font-medium text-gray-900 dark:text-white">{c.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.country}</td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.communities}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4 text-gray-500" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Analytics tab */}
  {tab === "analytics" && (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-6">Communities by Country</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
              {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {pieData.map((p) => (
            <div key={p.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} /><span className="text-sm text-gray-700 dark:text-gray-300">{p.name}</span></div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{p.value}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
        <div className="space-y-4">
          {[["Most Active Country","Korea","200 communities"],["Top Category","Fan Meets","40 communities"],["Fastest Growing","Philippines","+12 this week"],["Total Members","48.2k","across all communities"]].map(([l, v, s]) => (
            <div key={l} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
              <div><p className="text-xs text-gray-400 mb-0.5">{l}</p><p className="font-semibold text-gray-900 dark:text-white">{v}</p></div>
              <span className="text-xs text-[#A53860] font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

  {/* Simple create modal */}
  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{modalTitle}</h3>
          <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <input type="text" placeholder="Name" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm mb-4 outline-none focus:border-[#A53860]" />
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
