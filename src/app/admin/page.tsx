"use client";

import { useState, useEffect } from "react";
import { Calendar, Film, MessageCircle, LogOut, Plus, Trash } from "lucide-react";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("calendar");
  const [loading, setLoading] = useState(false);

  // Data states
  const [events, setEvents] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Invalid credentials");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    fetch("/api/events").then((res) => res.json()).then((data) => setEvents(Array.isArray(data) ? data : []));
    fetch("/api/reels").then((res) => res.json()).then((data) => setReels(Array.isArray(data) ? data : []));
    fetch("/api/enquiries").then((res) => res.json()).then((data) => setEnquiries(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    // Initial fetch to see if we're already authenticated
    fetch("/api/enquiries").then((res) => {
      if (res.ok) {
        setIsAuthenticated(true);
        res.json().then((data) => setEnquiries(Array.isArray(data) ? data : []));
        fetch("/api/events").then((r) => r.json()).then((data) => setEvents(Array.isArray(data) ? data : []));
        fetch("/api/reels").then((r) => r.json()).then((data) => setReels(Array.isArray(data) ? data : []));
      }
    }).catch(console.error);
  }, []);

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const data = {
      title: target.title.value,
      date: target.date.value,
      details: target.details.value,
    };
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    target.reset();
    fetchData();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    fetchData();
  };

  const addReel = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const data = {
      title: target.title.value,
      category: target.category.value,
      videoUrl: target.videoUrl.value,
    };
    await fetch("/api/reels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    target.reset();
    fetchData();
  };

  const deleteReel = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/reels/${id}`, { method: "DELETE" });
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0b] p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-[#e8c547]/20 bg-[#141416] p-8 shadow-2xl">
          <h1 className="mb-6 text-center text-2xl font-bold text-[#e8c547]">Admin Login</h1>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-[#e8c547] focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-[#e8c547] focus:outline-none"
            />
            <button
              disabled={loading}
              type="submit"
              className="mt-2 rounded-lg bg-[#e8c547] px-4 py-3 font-bold text-black transition hover:bg-[#d6b53e]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f5f2eb]">
      <div className="border-b border-white/10 bg-[#141416] px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-xl font-bold text-[#e8c547]">RJ Editzzz Admin Portal</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-[#9a9590] hover:text-white">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-8 flex gap-4 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex items-center gap-2 px-4 py-2 font-medium ${activeTab === "calendar" ? "text-[#e8c547] border-b-2 border-[#e8c547]" : "text-[#9a9590]"}`}
          >
            <Calendar className="h-4 w-4" /> Calendar
          </button>
          <button
            onClick={() => setActiveTab("reels")}
            className={`flex items-center gap-2 px-4 py-2 font-medium ${activeTab === "reels" ? "text-[#e8c547] border-b-2 border-[#e8c547]" : "text-[#9a9590]"}`}
          >
            <Film className="h-4 w-4" /> Reels
          </button>
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`flex items-center gap-2 px-4 py-2 font-medium ${activeTab === "enquiries" ? "text-[#e8c547] border-b-2 border-[#e8c547]" : "text-[#9a9590]"}`}
          >
            <MessageCircle className="h-4 w-4" /> Enquiries
          </button>
        </div>

        <div className="bg-[#141416] rounded-2xl border border-white/10 p-6">
          {activeTab === "calendar" && (
            <div>
              <h2 className="mb-4 text-xl font-bold">Manage Calendar Events</h2>
              <form onSubmit={addEvent} className="mb-8 grid gap-4 md:grid-cols-4">
                <input required name="title" type="text" placeholder="Event Title" className="rounded-lg border border-white/10 bg-black/50 px-4 py-2" />
                <input required name="date" type="date" className="rounded-lg border border-white/10 bg-black/50 px-4 py-2" />
                <input required name="details" type="text" placeholder="Details/Location" className="rounded-lg border border-white/10 bg-black/50 px-4 py-2" />
                <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-[#e8c547] text-black font-semibold"><Plus className="h-4 w-4"/> Add Event</button>
              </form>
              <div className="grid gap-4">
                {events.map((ev) => (
                  <div key={ev._id} className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                    <div>
                      <p className="font-bold">{ev.title}</p>
                      <p className="text-sm text-[#9a9590]">{new Date(ev.date).toLocaleDateString()} - {ev.details}</p>
                    </div>
                    <button onClick={() => deleteEvent(ev._id)} className="text-red-400 hover:text-red-300"><Trash className="h-4 w-4"/></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reels" && (
            <div>
              <h2 className="mb-4 text-xl font-bold">Manage Reels</h2>
              <form onSubmit={addReel} className="mb-8 grid gap-4 md:grid-cols-4">
                <input required name="title" type="text" placeholder="Reel Title" className="rounded-lg border border-white/10 bg-black/50 px-4 py-2" />
                <input required name="category" type="text" placeholder="Category (e.g. Wedding)" className="rounded-lg border border-white/10 bg-black/50 px-4 py-2" />
                <input required name="videoUrl" type="url" placeholder="Video URL (.mp4)" className="rounded-lg border border-white/10 bg-black/50 px-4 py-2" />
                <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-[#e8c547] text-black font-semibold"><Plus className="h-4 w-4"/> Add Reel</button>
              </form>
              <div className="grid gap-4">
                {reels.map((reel) => (
                  <div key={reel._id} className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                    <div>
                      <p className="font-bold">{reel.title}</p>
                      <p className="text-sm text-[#9a9590]">{reel.category} | {reel.views} Views</p>
                    </div>
                    <button onClick={() => deleteReel(reel._id)} className="text-red-400 hover:text-red-300"><Trash className="h-4 w-4"/></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "enquiries" && (
            <div>
              <h2 className="mb-4 text-xl font-bold">WhatsApp Enquiries</h2>
              <div className="grid gap-4">
                {enquiries.map((enq) => (
                  <div key={enq._id} className="rounded-lg border border-white/10 p-4">
                    <p className="font-bold">{enq.name} <span className="font-normal text-[#9a9590]">({enq.phone})</span></p>
                    <p className="mt-1 text-sm text-[#e8c547]">Category: {enq.category}</p>
                    <p className="mt-2 text-sm">{enq.plan}</p>
                    <p className="mt-2 text-xs text-[#9a9590]">{new Date(enq.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
