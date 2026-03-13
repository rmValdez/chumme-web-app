import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Users,
  Ban,
  MessageSquare,
  Flag,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  UserX,
  Crown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface CommunityControlCenterProps {
  isDarkMode: boolean;
}

const communityStats = [
  {
    title: "Active Communities",
    value: "156",
    change: "+8%",
    icon: Users,
    color: "from-[#A53860] to-[#670D2F]",
  },
  {
    title: "Pending Reports",
    value: "23",
    change: "-12%",
    icon: Flag,
    color: "from-[#EF88AD] to-[#A53860]",
  },
  {
    title: "Banned Users",
    value: "89",
    change: "+5%",
    icon: Ban,
    color: "from-[#670D2F] to-[#3A0519]",
  },
  {
    title: "Moderation Actions",
    value: "342",
    change: "+18%",
    icon: Shield,
    color: "from-[#A53860] to-[#EF88AD]",
  },
];

const moderationTrendData = [
  { id: "trend-1", name: "Mon", reports: 12, actions: 8 },
  { id: "trend-2", name: "Tue", reports: 19, actions: 15 },
  { id: "trend-3", name: "Wed", reports: 8, actions: 6 },
  { id: "trend-4", name: "Thu", reports: 25, actions: 20 },
  { id: "trend-5", name: "Fri", reports: 18, actions: 14 },
  { id: "trend-6", name: "Sat", reports: 22, actions: 18 },
  { id: "trend-7", name: "Sun", reports: 15, actions: 12 },
];

const reportTypeData = [
  { id: "type-1", name: "Spam", value: 35, color: "#A53860" },
  { id: "type-2", name: "Harassment", value: 25, color: "#670D2F" },
  { id: "type-3", name: "Inappropriate", value: 20, color: "#EF88AD" },
  { id: "type-4", name: "Copyright", value: 15, color: "#3A0519" },
  { id: "type-5", name: "Other", value: 5, color: "#6B7280" },
];

const communityReports = [
  {
    id: 1,
    type: "Spam",
    community: "K-Pop Fans United",
    reporter: "user123",
    reported: "spammer_account",
    description: "User posting repetitive promotional content",
    status: "Pending",
    priority: "High",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "Harassment",
    community: "BTS ARMY Central",
    reporter: "army_member",
    reported: "toxic_user",
    description: "User making offensive comments about other members",
    status: "Under Review",
    priority: "Medium",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "Inappropriate",
    community: "BLACKPINK Blinks",
    reporter: "blink_fan",
    reported: "inappropriate_poster",
    description: "Posted content not suitable for community guidelines",
    status: "Pending",
    priority: "High",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    type: "Copyright",
    community: "SEVENTEEN Carats",
    reporter: "content_creator",
    reported: "copyright_violation",
    description: "Uploaded copyrighted material without permission",
    status: "Resolved",
    priority: "Low",
    timestamp: "2 days ago",
  },
];

const activeCommunities = [
  {
    id: 1,
    name: "K-Pop Fans United",
    members: 15420,
    posts: 892,
    engagement: "High",
    moderators: 12,
    status: "Active",
    spamReports: 15,
    thumbnail: "🎵",
  },
  {
    id: 2,
    name: "BTS ARMY Central",
    members: 28950,
    posts: 1245,
    engagement: "Very High",
    moderators: 18,
    status: "Active",
    spamReports: 8,
    thumbnail: "💜",
  },
  {
    id: 3,
    name: "BLACKPINK Blinks",
    members: 22100,
    posts: 756,
    engagement: "High",
    moderators: 15,
    status: "Active",
    spamReports: 12,
    thumbnail: "🖤",
  },
  {
    id: 4,
    name: "STRAY KIDS Stays",
    members: 18750,
    posts: 634,
    engagement: "Medium",
    moderators: 10,
    status: "Active",
    spamReports: 5,
    thumbnail: "⚡",
  },
];

const tabs = [
  { id: "overview", name: "Overview", icon: TrendingUp },
  { id: "reports", name: "Reports", icon: Flag },
  { id: "communities", name: "Communities", icon: Users },
  { id: "actions", name: "Actions Log", icon: Shield },
];

const actionLog = [
  {
    id: 1,
    action: "User Banned",
    target: "spammer_account",
    moderator: "admin_jane",
    reason: "Repeated spam violations",
    timestamp: "1 hour ago",
    type: "ban",
  },
  {
    id: 2,
    action: "Post Removed",
    target: "inappropriate_post_123",
    moderator: "mod_mike",
    reason: "Inappropriate content",
    timestamp: "3 hours ago",
    type: "remove",
  },
  {
    id: 3,
    action: "Warning Issued",
    target: "toxic_user",
    moderator: "admin_sarah",
    reason: "Harassment behavior",
    timestamp: "6 hours ago",
    type: "warning",
  },
  {
    id: 4,
    action: "Community Moderated",
    target: "K-Pop Fans United",
    moderator: "admin_jane",
    reason: "Added new moderator",
    timestamp: "1 day ago",
    type: "moderate",
  },
];

export function CommunityControlCenter({ isDarkMode }: CommunityControlCenterProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedReport, setSelectedReport] = useState<
    (typeof communityReports)[0] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1
            className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}
          >
            Community Control Center
          </h1>
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Monitor and moderate community activity across the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white font-medium hover:opacity-90 transition-opacity">
            <Shield className="w-4 h-4" />
            Emergency Mode
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {communityStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`p-6 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-1`}
                  >
                    {stat.title}
                  </p>
                  <p
                    className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div
          className={`p-6 rounded-lg border ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white"
                        : isDarkMode
                          ? "text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {(activeTab === "reports" || activeTab === "communities") && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-[#A53860]/50`}
                  />
                </div>
              </div>
            )}
          </div>

          {activeTab === "overview" && <OverviewContent isDarkMode={isDarkMode} />}
          {activeTab === "reports" && (
            <ReportsContent
              isDarkMode={isDarkMode}
              searchTerm={searchTerm}
              selectedReport={selectedReport}
              setSelectedReport={setSelectedReport}
            />
          )}
          {activeTab === "communities" && (
            <CommunitiesContent isDarkMode={isDarkMode} searchTerm={searchTerm} />
          )}
          {activeTab === "actions" && <ActionsContent isDarkMode={isDarkMode} />}
        </div>
      </motion.div>
    </div>
  );
}

function OverviewContent({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-lg border ${
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}
          >
            Moderation Trends (7 days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moderationTrendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#E5E7EB"}
              />
              <XAxis dataKey="name" stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
              <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                  border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="reports"
                stroke="#A53860"
                strokeWidth={2}
                dot={{ fill: "#A53860", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="actions"
                stroke="#EF88AD"
                strokeWidth={2}
                dot={{ fill: "#EF88AD", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`p-6 rounded-lg border ${
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}
          >
            Report Types Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => {
                  const safePercent = typeof percent === "number" ? percent : 0;
                  return `${name} ${(safePercent * 100).toFixed(0)}%`;
                }}
                outerRadius={80}
                dataKey="value"
              >
                {reportTypeData.map((entry) => (
                  <Cell key={`cell-${entry.id}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className={`p-6 rounded-lg border ${
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Review Reports",
              description: "Handle pending community reports",
              icon: Flag,
              color: "bg-red-500",
            },
            {
              title: "User Management",
              description: "Manage user bans and warnings",
              icon: UserX,
              color: "bg-orange-500",
            },
            {
              title: "Moderator Tools",
              description: "Assign and manage moderators",
              icon: Crown,
              color: "bg-purple-500",
            },
            {
              title: "Community Settings",
              description: "Configure community policies",
              icon: Shield,
              color: "bg-blue-500",
            },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4
                  className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}
                >
                  {action.title}
                </h4>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {action.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReportsContent({
  isDarkMode,
  searchTerm,
  selectedReport,
  setSelectedReport,
}: {
  isDarkMode: boolean;
  searchTerm: string;
  selectedReport: (typeof communityReports)[0] | null;
  setSelectedReport: (report: (typeof communityReports)[0] | null) => void;
}) {
  const filteredReports = communityReports.filter(
    (report) =>
      report.community.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reported.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              onClick={() => setSelectedReport(report)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedReport?.id === report.id
                  ? "border-[#A53860] bg-[#A53860]/10"
                  : isDarkMode
                    ? "bg-gray-900 border-gray-700 hover:bg-gray-800"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      report.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : report.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {report.priority}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      report.status === "Pending"
                        ? "bg-orange-100 text-orange-800"
                        : report.status === "Under Review"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {report.timestamp}
                </span>
              </div>

              <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                {report.type} in {report.community}
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                Reported: @{report.reported} by @{report.reporter}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"} line-clamp-2`}>
                {report.description}
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedReport ? (
            <motion.div
              key={selectedReport.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-lg border ${
                isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3
                    className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}
                  >
                    Report Details
                  </h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Report ID: #{selectedReport.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Community
                  </p>
                  <p className={`text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {selectedReport.community}
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Report Type
                  </p>
                  <p className={`text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {selectedReport.type}
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Description
                  </p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {selectedReport.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Reporter
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      @{selectedReport.reporter}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Reported User
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      @{selectedReport.reported}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Actions
                </h4>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Mark as Resolved
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                    <Ban className="w-4 h-4" />
                    Ban User
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                    Issue Warning
                  </button>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}>
                    <Eye className="w-4 h-4" />
                    View Evidence
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-6 rounded-lg border flex items-center justify-center ${
                isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="text-center">
                <MessageSquare className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                <p className={`text-lg font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Select a report to view details
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CommunitiesContent({
  isDarkMode,
  searchTerm,
}: {
  isDarkMode: boolean;
  searchTerm: string;
}) {
  const filteredCommunities = activeCommunities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {filteredCommunities.map((community, index) => (
        <motion.div
          key={community.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05 * index }}
          className={`p-6 rounded-lg border ${
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white text-xl">
                {community.thumbnail}
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                  {community.name}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Users className="w-3 h-3" />
                    {community.members.toLocaleString()} members
                  </span>
                  <span className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <MessageSquare className="w-3 h-3" />
                    {community.posts} posts
                  </span>
                  <span className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Crown className="w-3 h-3" />
                    {community.moderators} mods
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  community.engagement === "Very High"
                    ? "bg-purple-100 text-purple-800"
                    : community.engagement === "High"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {community.engagement}
              </span>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Members", value: community.members.toLocaleString() },
              { label: "Posts", value: community.posts.toString() },
              { label: "Spam Reports", value: community.spamReports.toString() },
              {
                label: "Engagement",
                value: `${community.id === 1 ? 78 : community.id === 2 ? 92 : community.id === 3 ? 85 : 71}%`,
              },
            ].map((metric) => (
              <div key={metric.label}>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {metric.label}
                </p>
                <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ActionsContent({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="space-y-4">
      {actionLog.map((log, index) => (
        <motion.div
          key={log.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05 * index }}
          className={`p-4 rounded-lg border ${
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  log.type === "ban"
                    ? "bg-red-500"
                    : log.type === "remove"
                      ? "bg-orange-500"
                      : log.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                }`}
              >
                {log.type === "ban" ? (
                  <Ban className="w-5 h-5 text-white" />
                ) : log.type === "remove" ? (
                  <XCircle className="w-5 h-5 text-white" />
                ) : log.type === "warning" ? (
                  <AlertTriangle className="w-5 h-5 text-white" />
                ) : (
                  <Shield className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                  {log.action}
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>
                  Target: {log.target}
                </p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Reason: {log.reason}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {log.timestamp}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                by {log.moderator}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
