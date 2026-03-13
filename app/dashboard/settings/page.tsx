"use client";
import { useState, type ComponentType, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Users, Bell, Shield, Plus, Edit, Trash2, X } from "lucide-react";
const roles = [
{ id: "1", name: "Super Admin",       description: "Full system access",                  users: 2,  permissions: ["All Permissions"]                                               },
{ id: "2", name: "Admin",             description: "Manage users, content and settings",  users: 5,  permissions: ["Manage Users", "Manage Content", "View Reports"]                },
{ id: "3", name: "Moderator",         description: "Moderate content and manage reports", users: 12, permissions: ["Moderate Content", "View Reports", "Manage Comments"]           },
{ id: "4", name: "Content Manager",   description: "Create and manage platform content",  users: 8,  permissions: ["Create Content", "Edit Content", "Delete Content"]              },
{ id: "5", name: "Community Manager", description: "Manage communities and engagement",   users: 15, permissions: ["Manage Communities", "View Analytics", "Moderate Content"]     },
];
const ALL_PERMISSIONS = ["Manage Users","Manage Content","View Reports","Manage Communities","Moderate Content","Create Content","Edit Content","Delete Content","View Analytics","Manage Settings","Manage Roles","Ban Users"];
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
return (
<button
type="button"
onClick={() => onChange(!checked)}
className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-[#A53860]" : "bg-gray-200 dark:bg-gray-600"}`}
>
<span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
</button>
);
}
type SectionProps = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  delay: number;
};
function Section({ title, icon: Icon, children, delay }: SectionProps) {
return (
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay }} className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 mb-6">
<div className="flex items-center gap-2 mb-6">
<Icon className="w-5 h-5 text-[#A53860]" />
<h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
</div>
{children}
</motion.div>
);
}
function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
return (
<div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
<div>
<p className="font-semibold text-sm text-gray-900 dark:text-gray-200">{label}</p>
<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
</div>
<Toggle checked={checked} onChange={onChange} />
</div>
);
}
export default function SettingsPage() {
const [emailNotifs, setEmailNotifs]   = useState(true);
const [pushNotifs, setPushNotifs]     = useState(true);
const [momentUpdates, setMomentUpdates] = useState(true);
const [communityInvites, setCommunityInvites] = useState(true);
const [weeklyDigest, setWeeklyDigest] = useState(false);
const [publicProfile, setPublicProfile] = useState(true);
const [showActivity, setShowActivity] = useState(true);
const [allowTagging, setAllowTagging] = useState(true);
const [showAddRole, setShowAddRole]   = useState(false);
const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
const togglePerm = (p: string) =>
setSelectedPerms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
return (
<>
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Settings</h1>
<p className="text-gray-500 dark:text-gray-400">Manage roles, permissions and preferences</p>
</motion.div>
  {/* Roles */}
  <Section title="Roles & Permissions" icon={Users} delay={0.1}>
    <div className="flex justify-end mb-4">
      <button onClick={() => setShowAddRole(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white text-sm font-semibold"><Plus className="w-4 h-4" /> Add Role</button>
    </div>
    <div className="space-y-4">
      {roles.map((r) => (
        <div key={r.id} className="p-5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 dark:text-white">{r.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{r.users} users</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{r.description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"><Edit className="w-4 h-4 text-gray-500" /></button>
              <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {r.permissions.map((p) => (
              <span key={p} className="px-3 py-1 rounded-lg text-xs font-medium bg-[#A53860]/10 text-[#A53860] dark:bg-[#A53860]/20 dark:text-[#EF88AD]">{p}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>

  {/* Notifications */}
  <Section title="Notifications" icon={Bell} delay={0.2}>
    <ToggleRow label="Email Notifications"  description="Receive notifications via email"                    checked={emailNotifs}      onChange={setEmailNotifs} />
    <ToggleRow label="Push Notifications"   description="Receive push notifications on your device"         checked={pushNotifs}       onChange={setPushNotifs} />
    <ToggleRow label="Moment Updates"       description="Get notified when someone shares a new moment"     checked={momentUpdates}    onChange={setMomentUpdates} />
    <ToggleRow label="Community Invites"    description="Get notified when you're invited to a community"   checked={communityInvites} onChange={setCommunityInvites} />
    <ToggleRow label="Weekly Digest"        description="Receive a weekly summary of activity"              checked={weeklyDigest}     onChange={setWeeklyDigest} />
  </Section>

  {/* Privacy */}
  <Section title="Privacy & Security" icon={Shield} delay={0.3}>
    <ToggleRow label="Public Profile"       description="Make your profile visible to everyone"             checked={publicProfile}    onChange={setPublicProfile} />
    <ToggleRow label="Show Activity Status" description="Let others see when you're active"                 checked={showActivity}     onChange={setShowActivity} />
    <ToggleRow label="Allow Tagging"        description="Allow others to tag you in moments"                checked={allowTagging}     onChange={setAllowTagging} />
  </Section>

  {/* Danger Zone */}
  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-6">
    <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Danger Zone</h2>
    <p className="text-sm text-red-600 dark:text-red-300 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
    <button className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-red-300 dark:border-red-700 bg-white dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
      Delete Account
    </button>
  </motion.div>

  {/* Add Role Modal */}
  {showAddRole && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAddRole(false)}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Role</h3>
          <button onClick={() => setShowAddRole(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <input type="text" placeholder="Role name" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white mb-3 outline-none focus:border-[#A53860]" />
        <textarea rows={2} placeholder="Description" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white mb-4 outline-none focus:border-[#A53860] resize-none" />
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Permissions</p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {ALL_PERMISSIONS.map((p) => (
            <label key={p} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-sm transition-all ${selectedPerms.includes(p) ? "border-[#A53860] bg-[#A53860]/10 text-[#A53860] dark:bg-[#A53860]/20 dark:text-[#EF88AD]" : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"}`}>
              <input type="checkbox" checked={selectedPerms.includes(p)} onChange={() => togglePerm(p)} className="accent-[#A53860]" />
              {p}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowAddRole(false)} className="px-4 py-2 rounded-xl text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">Cancel</button>
          <button onClick={() => setShowAddRole(false)} className="px-4 py-2 rounded-xl text-sm text-white bg-gradient-to-r from-[#A53860] to-[#670D2F]">Add Role</button>
        </div>
      </motion.div>
    </div>
  )}
</>
);
}
