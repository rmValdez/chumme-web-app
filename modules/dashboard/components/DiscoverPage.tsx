import { motion } from "framer-motion";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DiscoverPageProps {
  isDarkMode: boolean;
}

const discoverLinks = [
  {
    id: 1,
    platform: "YouTube",
    link: "youtube.com/watch?v=abc123",
    preview: "BLACKPINK concert clip",
    user: "rosie_bp",
    fandom: "BLACKPINK",
    status: "Approved",
    date: "2026-03-08",
  },
  {
    id: 2,
    platform: "TikTok",
    link: "tiktok.com/@user/video/xyz",
    preview: "BTS dance challenge",
    user: "army_forever",
    fandom: "BTS",
    status: "Approved",
    date: "2026-03-07",
  },
  {
    id: 3,
    platform: "Instagram",
    link: "instagram.com/p/def456",
    preview: "STRAY KIDS behind the scenes",
    user: "stay_official",
    fandom: "STRAY KIDS",
    status: "Pending",
    date: "2026-03-09",
  },
  {
    id: 4,
    platform: "Twitter",
    link: "twitter.com/user/status/789",
    preview: "SEVENTEEN comeback teaser",
    user: "carat_world",
    fandom: "SEVENTEEN",
    status: "Approved",
    date: "2026-03-06",
  },
];

const featuredContent = [
  {
    id: 1,
    post: "BLACKPINK Concert Clip",
    platform: "YouTube",
    fandom: "BLACKPINK",
    rank: 1,
    duration: "7 days",
    startDate: "2026-03-01",
    endDate: "2026-03-08",
  },
  {
    id: 2,
    post: "BTS World Tour Announcement",
    platform: "TikTok",
    fandom: "BTS",
    rank: 2,
    duration: "14 days",
    startDate: "2026-03-03",
    endDate: "2026-03-17",
  },
  {
    id: 3,
    post: "STRAY KIDS Comeback Teaser",
    platform: "YouTube",
    fandom: "STRAY KIDS",
    rank: 3,
    duration: "5 days",
    startDate: "2026-03-05",
    endDate: "2026-03-10",
  },
];

const reportedPosts = [
  {
    id: 1,
    post: "Inappropriate Concert Clip",
    user: "user123",
    reason: "Spam",
    reportsCount: 5,
    status: "Pending",
    platform: "YouTube",
  },
  {
    id: 2,
    post: "Misleading Fan Edit",
    user: "editor_pro",
    reason: "Misleading Content",
    reportsCount: 3,
    status: "Pending",
    platform: "TikTok",
  },
  {
    id: 3,
    post: "Copyright Violation",
    user: "content_maker",
    reason: "Copyright",
    reportsCount: 8,
    status: "Under Review",
    platform: "Instagram",
  },
];

const analyticsData = [
  { id: "platform-1", name: "YouTube", value: 42, color: "#A53860" },
  { id: "platform-2", name: "TikTok", value: 28, color: "#670D2F" },
  { id: "platform-3", name: "Instagram", value: 18, color: "#EF88AD" },
  { id: "platform-4", name: "Twitter", value: 12, color: "#3A0519" },
];

const fandomActivityData = [
  { id: "fandom-1", fandom: "BTS", posts: 1450 },
  { id: "fandom-2", fandom: "BLACKPINK", posts: 1230 },
  { id: "fandom-3", fandom: "STRAY KIDS", posts: 920 },
  { id: "fandom-4", fandom: "SEVENTEEN", posts: 780 },
  { id: "fandom-5", fandom: "TWICE", posts: 650 },
];

const tabs = [
  { id: "overview", name: "Overview" },
  { id: "links", name: "Discover Links" },
  { id: "featured", name: "Featured" },
  { id: "reports", name: "Reports" },
];

export function DiscoverPage({ isDarkMode }: DiscoverPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1
          className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}
        >
          Discover Manager
        </h1>
        <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
          Manage social media links appearing in Discover feed
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div
          className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#A53860] text-[#A53860]"
                    : isDarkMode
                      ? "border-transparent text-gray-400 hover:text-gray-300"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        key={activeTab}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === "overview" && <OverviewTab isDarkMode={isDarkMode} />}
        {activeTab === "links" && <LinksTab isDarkMode={isDarkMode} />}
        {activeTab === "featured" && <FeaturedTab isDarkMode={isDarkMode} />}
        {activeTab === "reports" && <ReportsTab isDarkMode={isDarkMode} />}
      </motion.div>
    </div>
  );
}

function OverviewTab({ isDarkMode }: { isDarkMode: boolean }) {
  const stats = [
    { label: "Total Fandom Filters", value: "6" },
    { label: "Total Discover Posts", value: "12,540" },
    { label: "Featured Posts", value: "3" },
    { label: "Pending Reports", value: "18" },
    { label: "Most Active Fandom", value: "BTS" },
    { label: "Daily Engagement", value: "45.2k" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`p-6 rounded-lg border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div>
              <p
                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-1`}
              >
                {stat.label}
              </p>
              <p
                className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-lg border ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}
          >
            Trending Topics Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData}
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
                {analyticsData.map((entry) => (
                  <Cell key={`cell-${entry.id}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`p-6 rounded-lg border ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}
          >
            Most Popular Topics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fandomActivityData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#E5E7EB"}
              />
              <XAxis dataKey="fandom" stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
              <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                  border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="posts" fill="#A53860" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function LinksTab({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Discover Links
        </h2>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white font-medium hover:opacity-90">
          Add Link
        </button>
      </div>

      <div
        className={`rounded-lg border overflow-hidden ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-900" : "bg-gray-50"}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Link Preview
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  User
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Fandom
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Platform
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Date
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-200"}`}
            >
              {discoverLinks.map((link) => (
                <tr
                  key={link.id}
                  className={isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                >
                  <td className={`px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {link.preview}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    @{link.user}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {link.fandom}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {link.platform}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        link.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {link.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {link.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className={`px-3 py-1 text-sm rounded ${
                          isDarkMode
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        className={`px-3 py-1 text-sm rounded ${
                          isDarkMode
                            ? "bg-red-900 text-red-200 hover:bg-red-800"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FeaturedTab({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Featured Discover Posts
        </h2>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white font-medium hover:opacity-90">
          Feature Post
        </button>
      </div>

      <div className="space-y-4">
        {featuredContent.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`p-6 rounded-lg border ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white font-bold text-sm">
                    #{post.rank}
                  </span>
                  <h3
                    className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {post.post}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Fandom
                    </p>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {post.fandom}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Duration
                    </p>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {post.duration}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Start Date
                    </p>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {post.startDate}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      End Date
                    </p>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {post.endDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  className={`px-3 py-1 text-sm rounded ${
                    isDarkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Edit
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded ${
                    isDarkMode
                      ? "bg-red-900 text-red-200 hover:bg-red-800"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ReportsTab({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Reported Posts
        </h2>
      </div>

      <div
        className={`rounded-lg border overflow-hidden ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-900" : "bg-gray-50"}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Post Preview
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  User
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Reason
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Reports Count
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-200"}`}
            >
              {reportedPosts.map((post) => (
                <tr
                  key={post.id}
                  className={isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                >
                  <td className={`px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {post.post}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    @{post.user}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {post.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      {post.reportsCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        post.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className={`px-3 py-1 text-sm rounded ${
                          isDarkMode
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        View
                      </button>
                      <button
                        className={`px-3 py-1 text-sm rounded ${
                          isDarkMode
                            ? "bg-red-900 text-red-200 hover:bg-red-800"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
