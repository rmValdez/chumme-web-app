"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Square, Users, Eye, Activity, Wifi, Clock,
  Zap, X, Maximize2, Pause
} from "lucide-react";
import { useSnackbar } from "@/modules/shared/hooks/useSnackbar";
import { Snackbar } from "@/modules/shared/components/Snackbar";

interface Stream {
  id: string;
  title: string;
  streamId: string;
  thumbnail: string;
  status: "live" | "paused" | "offline";
  viewers: number;
  bitrate: number;
  latency: number;
  uptime: number;
  health: "healthy" | "warning" | "critical";
}

const MOCK_STREAMS: Stream[] = [
  { id: "1", title: "K-Pop Dance Cover Session", streamId: "stream_7f8a9b2c3d4e", thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=450&fit=crop", status: "live", viewers: 2847, bitrate: 4.2, latency: 1.8, uptime: 3847, health: "healthy" },
  { id: "2", title: "BTS Album Listening Party", streamId: "stream_9a3c5e7f2b1d", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop", status: "live", viewers: 1523, bitrate: 3.8, latency: 2.1, uptime: 1245, health: "healthy" },
  { id: "3", title: "Fan Art Drawing Stream", streamId: "stream_4d8b6a9c1e5f", thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=450&fit=crop", status: "live", viewers: 892, bitrate: 3.5, latency: 3.4, uptime: 2156, health: "warning" },
  { id: "4", title: "Guitar Cover Tutorial", streamId: "stream_2f7e4a8c9b3d", thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop", status: "live", viewers: 654, bitrate: 4.0, latency: 1.5, uptime: 892, health: "healthy" },
  { id: "5", title: "Marvel Phase 5 Discussion", streamId: "stream_8c2e9a4f7b1d", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop", status: "paused", viewers: 423, bitrate: 3.2, latency: 2.5, uptime: 1567, health: "healthy" },
  { id: "6", title: "Anime Season Finale Watch", streamId: "stream_1a5c9e3b7f4d", thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=450&fit=crop", status: "live", viewers: 1234, bitrate: 4.5, latency: 1.2, uptime: 3245, health: "healthy" },
];

const formatUptime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

const formatUptimeShort = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}:${m.toString().padStart(2, "0")}`;
};

const getHealthColor = (health: string) => {
  if (health === "healthy") return "text-green-500";
  if (health === "warning") return "text-yellow-500";
  return "text-red-500";
};

const getHealthBg = (health: string) => {
  if (health === "healthy") return "bg-green-500";
  if (health === "warning") return "bg-yellow-500";
  return "bg-red-500";
};

const LiveVideoAPIPage = () => {
  const [streams, setStreams] = useState<Stream[]>(MOCK_STREAMS);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const { messages, dismiss, showSuccess, showError } = useSnackbar();

  const activeStreams = streams.filter((s) => s.status === "live").length;
  const totalViewers = streams.reduce((acc, s) => acc + s.viewers, 0);
  const avgBitrate = streams.reduce((acc, s) => acc + s.bitrate, 0) / streams.length;
  const avgLatency = streams.reduce((acc, s) => acc + s.latency, 0) / streams.length;

  const handleStreamAction = (streamId: string, action: "start" | "stop") => {
    setStreams((prev) => prev.map((s) => {
      if (s.id !== streamId) return s;
      if (action === "start") { showSuccess("Stream started"); return { ...s, status: "live" as const }; }
      showError("Stream stopped");
      return { ...s, status: "offline" as const, uptime: 0 };
    }));
    setSelectedStream((prev) => {
      if (!prev || prev.id !== streamId) return prev;
      if (action === "start") return { ...prev, status: "live" as const };
      return { ...prev, status: "offline" as const, uptime: 0 };
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Live Video API Dashboard</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Monitor and manage all active streams in real-time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Streams", value: activeStreams, icon: Activity, iconClass: "text-green-500", bgClass: "bg-green-500/10" },
          { label: "Total Viewers", value: totalViewers.toLocaleString(), icon: Users, iconClass: "text-[#A53860]", bgClass: "bg-[#A53860]/10" },
          { label: "Avg. Bitrate", value: `${avgBitrate.toFixed(1)} Mbps`, icon: Zap, iconClass: "text-blue-500", bgClass: "bg-blue-500/10" },
          { label: "Avg. Latency", value: `${avgLatency.toFixed(1)}s`, icon: Wifi, iconClass: "text-purple-500", bgClass: "bg-purple-500/10" },
        ].map(({ label, value, icon: Icon, iconClass, bgClass }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</p>
              </div>
              <div className={`p-3 rounded-lg ${bgClass}`}>
                <Icon className={`w-6 h-6 ${iconClass}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedStream(stream)}
            className="bg-white border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-black">
              <img src={stream.thumbnail} alt={stream.title} className={`w-full h-full object-cover ${stream.status !== "live" ? "opacity-50" : ""}`} />
              <div className="absolute top-3 left-3">
                {stream.status === "live" ? (
                  <motion.div animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }} className="px-3 py-1.5 rounded-lg bg-red-500 flex items-center gap-1.5">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-white font-bold text-xs">LIVE</span>
                  </motion.div>
                ) : stream.status === "paused" ? (
                  <div className="px-3 py-1.5 rounded-lg bg-yellow-500 flex items-center gap-1.5">
                    <Pause className="w-3 h-3 text-white" />
                    <span className="text-white font-bold text-xs">PAUSED</span>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-lg bg-gray-500 flex items-center gap-1.5">
                    <Square className="w-3 h-3 text-white" />
                    <span className="text-white font-bold text-xs">OFFLINE</span>
                  </div>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <div className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm flex items-center gap-1.5">
                  <Eye className="w-3 h-3 text-white" />
                  <span className="text-white font-semibold text-xs">{stream.viewers.toLocaleString()}</span>
                </div>
              </div>
              <div className="absolute bottom-3 right-3">
                <div className={`w-2 h-2 rounded-full ${getHealthBg(stream.health)}`} />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="p-4 bg-white dark:bg-transparent">
              <h3 className="font-bold mb-3 line-clamp-1 text-gray-900 dark:text-white">{stream.title}</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Zap, label: "Bitrate", value: `${stream.bitrate} Mbps` },
                  { icon: Wifi, label: "Latency", value: `${stream.latency}s` },
                  { icon: Clock, label: "Uptime", value: formatUptimeShort(stream.uptime) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <div className="flex items-center gap-1 mb-1">
                      <Icon className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-500">{label}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs font-mono text-gray-400 dark:text-gray-500">{stream.streamId}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stream Details Modal */}
      <AnimatePresence>
        {selectedStream && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStream(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Stream Management</h2>
                  <button onClick={() => setSelectedStream(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"><X className="w-6 h-6" /></button>
                </div>

                <div className="p-6">
                  {/* Video Preview */}
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 mb-6">
                    <div className="relative aspect-video bg-black">
                      <img src={selectedStream.thumbnail} alt={selectedStream.title} className={`w-full h-full object-cover ${selectedStream.status !== "live" ? "opacity-50" : ""}`} />
                      {selectedStream.status === "live" && (
                        <div className="absolute top-4 left-4">
                          <motion.div animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }} className="px-4 py-2 rounded-lg bg-red-500 flex items-center gap-2">
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2.5 h-2.5 bg-white rounded-full" />
                            <span className="text-white font-bold">LIVE</span>
                          </motion.div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <div className="px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm flex items-center gap-2">
                          <Eye className="w-4 h-4 text-white" />
                          <span className="text-white font-semibold">{selectedStream.viewers.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex gap-4">
                      <button
                        onClick={() => handleStreamAction(selectedStream.id, "start")}
                        disabled={selectedStream.status === "live"}
                        className={`flex-1 py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${selectedStream.status === "live" ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90 text-white"}`}
                      >
                        <Play className="w-5 h-5" fill={selectedStream.status === "live" ? "none" : "currentColor"} />
                        Start Stream
                      </button>
                      <button
                        onClick={() => handleStreamAction(selectedStream.id, "stop")}
                        disabled={selectedStream.status === "offline"}
                        className={`flex-1 py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${selectedStream.status === "offline" ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 text-white"}`}
                      >
                        <Square className="w-5 h-5" />
                        Stop Stream
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Stream Information</h3>
                      <div className="space-y-4">
                        {[
                          { label: "Title", value: selectedStream.title },
                          { label: "Stream ID", value: selectedStream.streamId, mono: true },
                          { label: "Uptime", value: formatUptime(selectedStream.uptime) },
                          { label: "Current Viewers", value: selectedStream.viewers.toLocaleString() },
                        ].map(({ label, value, mono }) => (
                          <div key={label}>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                            <p className={`font-semibold mt-1 text-gray-900 dark:text-white ${mono ? "font-mono text-sm mt-1 text-gray-900 dark:text-white" : ""}`}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Health Metrics</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Overall Health</span>
                            <span className={`text-sm font-semibold ${getHealthColor(selectedStream.health)}`}>{selectedStream.health.charAt(0).toUpperCase() + selectedStream.health.slice(1)}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className={`${getHealthBg(selectedStream.health)} h-2 rounded-full`} style={{ width: selectedStream.health === "healthy" ? "95%" : selectedStream.health === "warning" ? "65%" : "30%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Bitrate</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedStream.bitrate} Mbps</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(selectedStream.bitrate / 5) * 100}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Latency</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedStream.latency}s</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className={`h-2 rounded-full ${selectedStream.latency < 2 ? "bg-green-500" : selectedStream.latency < 3 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${100 - (selectedStream.latency / 5) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Snackbar messages={messages} onDismiss={dismiss} />
    </div>
  );
};

export default LiveVideoAPIPage;
