import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Eye,
  Music,
  Users,
  Video,
  Play,
  Download,
  AlertTriangle,
  Ban,
  Volume2,
  VolumeX,
  Star,
} from "lucide-react";

type TabId = "rooms" | "public" | "private" | "songs" | "recordings" | "reports";

interface CollabRoom {
  id: string;
  name: string;
  type: "Public" | "Private";
  host: string;
  participants: number;
  song: string;
  status: "Active" | "Ended";
}

interface PublicCollab {
  id: string;
  title: string;
  creator: string;
  category: string;
  participants: number;
  startDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface Song {
  id: string;
  title: string;
  artist: string;
  usageCount: number;
  status: "Active" | "Disabled";
}

interface Recording {
  id: string;
  title: string;
  room: string;
  creator: string;
  duration: string;
  uploadDate: string;
  featured: boolean;
}

const mockRooms: CollabRoom[] = [
  {
    id: "1",
    name: "Kpop Night Room",
    type: "Public",
    host: "user_123",
    participants: 8,
    song: "Dynamite",
    status: "Active",
  },
  {
    id: "2",
    name: "Fan Singing PH",
    type: "Private",
    host: "maria23",
    participants: 5,
    song: "How You Like That",
    status: "Active",
  },
  {
    id: "3",
    name: "BTS Sing Along",
    type: "Public",
    host: "armyfan",
    participants: 12,
    song: "Butter",
    status: "Active",
  },
  {
    id: "4",
    name: "Private Jam Session",
    type: "Private",
    host: "john_doe",
    participants: 3,
    song: "Kill This Love",
    status: "Ended",
  },
];

const mockPublicCollabs: PublicCollab[] = [
  {
    id: "1",
    title: "Global K-Pop Collab",
    creator: "sarah_kim",
    category: "K-Pop",
    participants: 45,
    startDate: "Mar 8, 2024",
    status: "Approved",
  },
  {
    id: "2",
    title: "Taylor Swift Night",
    creator: "swiftie_fan",
    category: "Pop",
    participants: 32,
    startDate: "Mar 9, 2024",
    status: "Pending",
  },
  {
    id: "3",
    title: "Anime OST Covers",
    creator: "anime_lover",
    category: "Anime",
    participants: 28,
    startDate: "Mar 7, 2024",
    status: "Approved",
  },
];

const mockSongs: Song[] = [
  { id: "1", title: "Dynamite", artist: "BTS", usageCount: 230, status: "Active" },
  {
    id: "2",
    title: "How You Like That",
    artist: "BLACKPINK",
    usageCount: 180,
    status: "Active",
  },
  { id: "3", title: "Butter", artist: "BTS", usageCount: 195, status: "Active" },
  {
    id: "4",
    title: "Kill This Love",
    artist: "BLACKPINK",
    usageCount: 165,
    status: "Active",
  },
];

const mockRecordings: Recording[] = [
  {
    id: "1",
    title: "Amazing K-Pop Cover",
    room: "Kpop Night Room",
    creator: "user_123",
    duration: "3:45",
    uploadDate: "Mar 8, 2024",
    featured: true,
  },
  {
    id: "2",
    title: "BTS Medley",
    room: "BTS Sing Along",
    creator: "armyfan",
    duration: "5:20",
    uploadDate: "Mar 7, 2024",
    featured: false,
  },
  {
    id: "3",
    title: "Girls Group Mashup",
    room: "Fan Singing PH",
    creator: "maria23",
    duration: "4:10",
    uploadDate: "Mar 9, 2024",
    featured: false,
  },
];

export function CollaborationManager({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeTab, setActiveTab] = useState<TabId>("rooms");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");

  const handleCreate = () => {
    console.log("Creating song:", { songTitle, songArtist });
    setShowCreateModal(false);
    setSongTitle("");
    setSongArtist("");
  };

  return (
    <div className="h-full">
      <div className="mb-8">
        <h2
          className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Collaboration Manager
        </h2>
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Manage collaboration rooms, songs, recordings, and moderation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div
          className={`rounded-xl p-6 border ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Total Collaborations
          </p>
          <p
            className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            420
          </p>
        </div>

        <div
          className={`rounded-xl p-6 border ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Active Rooms
          </p>
          <p
            className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            68
          </p>
        </div>

        <div
          className={`rounded-xl p-6 border ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Public Rooms
          </p>
          <p
            className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            210
          </p>
        </div>

        <div
          className={`rounded-xl p-6 border ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Private Rooms
          </p>
          <p
            className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            210
          </p>
        </div>

        <div
          className={`rounded-xl p-6 border ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Total Recordings
          </p>
          <p
            className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            1,250
          </p>
        </div>
      </div>

      <div
        className={`rounded-xl p-6 mb-8 border ${
          isDarkMode
            ? "bg-gray-800/50 border-gray-700/50"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <h3
            className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Live Collaboration Monitor
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockRooms
            .filter((r) => r.status === "Active")
            .slice(0, 3)
            .map((room) => (
              <div
                key={room.id}
                className={`p-5 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {room.name}
                  </span>
                  <span className="px-2.5 py-1 bg-red-500 text-white text-xs rounded-md font-medium">
                    LIVE
                  </span>
                </div>
                <div
                  className={`space-y-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  <div className="flex justify-between">
                    <span>Participants</span>
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                      {room.participants}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Song</span>
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                      {room.song}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 h-10 bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Enter Room
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(
          [
            { id: "rooms", label: "All Rooms", icon: Users },
            { id: "public", label: "Public Collabs", icon: Users },
            { id: "private", label: "Private Rooms", icon: Users },
            { id: "songs", label: "Song Library", icon: Music },
            { id: "recordings", label: "Recordings", icon: Video },
            { id: "reports", label: "Reports", icon: AlertTriangle },
          ] as const satisfies ReadonlyArray<{
            id: TabId;
            label: string;
            icon: ComponentType<{ className?: string }>;
          }>
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white shadow-lg"
                : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "rooms" && (
          <motion.div
            key="rooms"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/80 border-gray-200/50"
              } backdrop-blur-xl overflow-hidden`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Room Name
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Type
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Host
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Participants
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Song
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Status
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRooms.map((room) => (
                      <tr
                        key={room.id}
                        className={`border-t ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}
                      >
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"} font-medium`}
                        >
                          {room.name}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              room.type === "Public"
                                ? "bg-blue-500/20 text-blue-600"
                                : "bg-purple-500/20 text-purple-600"
                            }`}
                          >
                            {room.type}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {room.host}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {room.participants}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {room.song}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              room.status === "Active"
                                ? "bg-green-500/20 text-green-600"
                                : "bg-gray-500/20 text-gray-600"
                            }`}
                          >
                            {room.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                              title="View Room"
                            >
                              <Eye
                                className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                              />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode
                                  ? "hover:bg-yellow-500/20"
                                  : "hover:bg-yellow-50"
                              }`}
                              title="Remove User"
                            >
                              <Ban className="w-4 h-4 text-yellow-600" />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode ? "hover:bg-red-500/20" : "hover:bg-red-50"
                              }`}
                              title="End Room"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "public" && (
          <motion.div
            key="public"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/80 border-gray-200/50"
              } backdrop-blur-xl overflow-hidden`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Collab Title
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Creator
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Category
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Participants
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Start Date
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Status
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPublicCollabs.map((collab) => (
                      <tr
                        key={collab.id}
                        className={`border-t ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}
                      >
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"} font-medium`}
                        >
                          {collab.title}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {collab.creator}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {collab.category}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {collab.participants}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {collab.startDate}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              collab.status === "Approved"
                                ? "bg-green-500/20 text-green-600"
                                : collab.status === "Pending"
                                  ? "bg-yellow-500/20 text-yellow-600"
                                  : "bg-red-500/20 text-red-600"
                            }`}
                          >
                            {collab.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {collab.status === "Pending" && (
                              <>
                                <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                                  Approve
                                </button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors">
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode
                                  ? "hover:bg-yellow-500/20"
                                  : "hover:bg-yellow-50"
                              }`}
                              title="Feature"
                            >
                              <Star className="w-4 h-4 text-yellow-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "private" && (
          <motion.div
            key="private"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/80 border-gray-200/50"
              } backdrop-blur-xl overflow-hidden`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Room ID
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Host
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Members
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Song
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Reports
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Status
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRooms
                      .filter((r) => r.type === "Private")
                      .map((room) => (
                        <tr
                          key={room.id}
                          className={`border-t ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}
                        >
                          <td
                            className={`px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"} font-medium`}
                          >
                            {room.id}
                          </td>
                          <td
                            className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            {room.host}
                          </td>
                          <td
                            className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            {room.participants}
                          </td>
                          <td
                            className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            {room.song}
                          </td>
                          <td
                            className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            0
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                room.status === "Active"
                                  ? "bg-green-500/20 text-green-600"
                                  : "bg-gray-500/20 text-gray-600"
                              }`}
                            >
                              {room.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                className={`p-2 rounded-lg transition-colors ${
                                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                }`}
                                title="View Activity"
                              >
                                <Eye
                                  className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                                />
                              </button>
                              <button
                                className={`p-2 rounded-lg transition-colors ${
                                  isDarkMode
                                    ? "hover:bg-yellow-500/20"
                                    : "hover:bg-yellow-50"
                                }`}
                                title="Suspend Room"
                              >
                                <Ban className="w-4 h-4 text-yellow-600" />
                              </button>
                              <button
                                className={`p-2 rounded-lg transition-colors ${
                                  isDarkMode ? "hover:bg-red-500/20" : "hover:bg-red-50"
                                }`}
                                title="Close Room"
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "songs" && (
          <motion.div
            key="songs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <button
                onClick={() => {
                  setShowCreateModal(true);
                }}
                className="w-full h-12 bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                <Plus className="w-5 h-5" />
                Add Song
              </button>
            </div>

            <div
              className={`rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/80 border-gray-200/50"
              } backdrop-blur-xl overflow-hidden`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Song Title
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Artist
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Usage Count
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Status
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSongs.map((song) => (
                      <tr
                        key={song.id}
                        className={`border-t ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}
                      >
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"} font-medium`}
                        >
                          {song.title}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {song.artist}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {song.usageCount} uses
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              song.status === "Active"
                                ? "bg-green-500/20 text-green-600"
                                : "bg-gray-500/20 text-gray-600"
                            }`}
                          >
                            {song.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              <Edit
                                className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                              />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode
                                  ? "hover:bg-yellow-500/20"
                                  : "hover:bg-yellow-50"
                              }`}
                              title="Disable"
                            >
                              {song.status === "Active" ? (
                                <VolumeX className="w-4 h-4 text-yellow-600" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-green-600" />
                              )}
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode ? "hover:bg-red-500/20" : "hover:bg-red-50"
                              }`}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "recordings" && (
          <motion.div
            key="recordings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/80 border-gray-200/50"
              } backdrop-blur-xl overflow-hidden`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Recording Title
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Room
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Creator
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Duration
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Upload Date
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRecordings.map((recording) => (
                      <tr
                        key={recording.id}
                        className={`border-t ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}
                      >
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"} font-medium`}
                        >
                          <div className="flex items-center gap-2">
                            {recording.title}
                            {recording.featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {recording.room}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {recording.creator}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {recording.duration}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {recording.uploadDate}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                              title="Play"
                            >
                              <Play
                                className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                              />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode
                                  ? "hover:bg-yellow-500/20"
                                  : "hover:bg-yellow-50"
                              }`}
                              title="Feature"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  recording.featured
                                    ? "text-yellow-500 fill-current"
                                    : "text-yellow-600"
                                }`}
                              />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode ? "hover:bg-blue-500/20" : "hover:bg-blue-50"
                              }`}
                              title="Download"
                            >
                              <Download className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                isDarkMode ? "hover:bg-red-500/20" : "hover:bg-red-50"
                              }`}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "reports" && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`rounded-2xl p-6 border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/80 border-gray-200/50"
              } backdrop-blur-xl`}
            >
              <h3
                className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Reports & Moderation
              </h3>
              <div className="space-y-4">
                {[
                  {
                    type: "Inappropriate chat",
                    room: "Kpop Night Room",
                    user: "user_456",
                    date: "1 hour ago",
                  },
                  {
                    type: "Abusive user",
                    room: "BTS Sing Along",
                    user: "baduser123",
                    date: "3 hours ago",
                  },
                  {
                    type: "Spam collaboration",
                    room: "Fan Singing PH",
                    user: "spammer99",
                    date: "5 hours ago",
                  },
                ].map((report, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4
                          className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {report.type}
                        </h4>
                        <p
                          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Room: {report.room}
                        </p>
                        <p
                          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Reported User: {report.user}
                        </p>
                      </div>
                      <span
                        className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {report.date}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-4 py-2 bg-[#A53860] text-white rounded-lg text-sm font-medium hover:bg-[#670D2F] transition-colors">
                        Review
                      </button>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
                        Suspend User
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                        Close Room
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg rounded-2xl p-6 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Add Song
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <X className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Song Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dynamite"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    className={`w-full h-12 px-4 rounded-xl text-sm transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                    } border focus:border-[#A53860] focus:ring-2 focus:ring-[#A53860]/10`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Artist
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., BTS"
                    value={songArtist}
                    onChange={(e) => setSongArtist(e.target.value)}
                    className={`w-full h-12 px-4 rounded-xl text-sm transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                    } border focus:border-[#A53860] focus:ring-2 focus:ring-[#A53860]/10`}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`flex-1 h-12 rounded-xl font-semibold transition-colors ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 h-12 bg-gradient-to-r from-[#A53860] to-[#670D2F] text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
                >
                  Add Song
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
