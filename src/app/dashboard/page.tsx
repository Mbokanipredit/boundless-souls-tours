"use client";

import React, { useState } from "react";
import Link from "next/link";
import HomeLayout from "../home/layout";
import {
  User,
  Calendar,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Compass,
  ArrowRight,
  LogOut,
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useData } from "@/context/data-context";
import AuthModal from "@/components/auth/auth-modal";

export default function UserDashboardPage() {
  const { user, logoutUser } = useAuth();
  const { bookings, notifications, markNotificationRead, dispatchedEmails } = useData();
  const [activeTab, setActiveTab] = useState<"trips" | "notifications" | "emails">("trips");
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [selectedEmailPreview, setSelectedEmailPreview] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <HomeLayout>
        <main className="bg-slate-950 text-white min-h-screen pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse text-slate-400 text-sm">Loading traveler dashboard...</div>
        </main>
      </HomeLayout>
    );
  }

  if (!user) {
    return (
      <HomeLayout>
        <main className="bg-slate-950 text-white min-h-screen pt-32 pb-20 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-md text-center space-y-6">
            <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <User className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black">Traveler Dashboard</h1>
              <p className="text-slate-400 text-sm">
                Please sign in or register to view your custom trip plans, approvals, and messages from the admin.
              </p>
            </div>
            <Button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-6 rounded-full text-base shadow-xl shadow-emerald-600/30"
            >
              Sign In / Register
            </Button>
          </div>
          <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </main>
      </HomeLayout>
    );
  }

  // Filter bookings for logged-in user by ID or Email
  const userBookings = bookings.filter(
    (b) => b.userId === user.id || b.email.toLowerCase() === user.email.toLowerCase()
  );

  // Filter notifications for logged-in user by ID or Email
  const userNotifications = notifications.filter(
    (n) => n.userId === user.id || (n.userEmail && n.userEmail.toLowerCase() === user.email.toLowerCase())
  );
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  // Filter dispatched emails for user's email
  const userEmails = dispatchedEmails.filter(
    (e) => e.toEmail.toLowerCase() === user.email.toLowerCase() || (e.userId && e.userId === user.id)
  );

  return (
    <HomeLayout>
      <main className="bg-slate-950 text-white min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          {/* User Profile Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-lg shadow-emerald-600/30">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-white">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-emerald-400" />
                    {user.email}
                  </span>
                  {user.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-emerald-400" />
                      {user.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/plan-trip">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs px-5 py-5 gap-2 shadow-lg shadow-emerald-600/20">
                  <Compass className="h-4 w-4" />
                  <span>Plan New Trip</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={logoutUser}
                className="bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 font-bold rounded-full text-xs px-4 py-5 gap-1.5"
              >
                <LogOut className="h-4 w-4 text-rose-400" />
                <span>Log Out</span>
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveTab("trips")}
              className={`flex items-center gap-2 text-sm font-bold pb-2 transition-all border-b-2 ${
                activeTab === "trips"
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>My Trip Plans ({userBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-2 text-sm font-bold pb-2 transition-all border-b-2 ${
                activeTab === "notifications"
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Bell className="h-4 w-4" />
              <span>Notifications & Messages</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("emails")}
              className={`flex items-center gap-2 text-sm font-bold pb-2 transition-all border-b-2 ${
                activeTab === "emails"
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Email Inbox ({userEmails.length})</span>
            </button>
          </div>

          {/* TAB 1: MY TRIPS & STATUS */}
          {activeTab === "trips" && (
            <div className="space-y-6">
              {userBookings.length === 0 ? (
                <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                  <Compass className="h-12 w-12 text-slate-600 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">No Trip Requests Yet</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Build your custom experience with gorilla trekking, Akagera safaris, or luxury stays to receive admin approval and itinerary details.
                    </p>
                  </div>
                  <Link href="/plan-trip">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-6 py-5 text-xs shadow-lg">
                      Start Planning
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {userBookings.map((bk) => (
                    <Card
                      key={bk.id}
                      className="bg-slate-900 border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-black text-white">
                              {bk.destinations.join(" • ")}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                                bk.status === "Approved"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                  : bk.status === "Declined"
                                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                                  : bk.status === "Confirmed"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                                  : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                              }`}
                            >
                              {bk.status === "Approved"
                                ? "🟢 Approved"
                                : bk.status === "Declined"
                                ? "🔴 Declined"
                                : bk.status === "New"
                                ? "🟡 Pending Admin Review"
                                : bk.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            Submitted on {new Date(bk.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-xs text-slate-300 font-bold bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 self-start sm:self-auto">
                          {bk.travelers} Traveler(s) • {bk.dateRange}
                        </div>
                      </div>

                      {/* Prominent Email Dispatch Notification Banner */}
                      {bk.status !== "New" && (
                        <div className="bg-slate-950/80 border border-emerald-500/30 p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 text-emerald-300">
                            <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>
                              <strong>Status Notification & Official Email Dispatched:</strong> Admin sent updates to <u>{user.email}</u>. Please check your inbox.
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              const relatedEmail = userEmails.find((e) => e.bookingId === bk.id);
                              if (relatedEmail) {
                                setSelectedEmailPreview(relatedEmail);
                              } else {
                                setActiveTab("emails");
                              }
                            }}
                            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30 font-bold transition-all text-[11px] shrink-0"
                          >
                            Read Dispatched Email →
                          </button>
                        </div>
                      )}

                      {/* Admin Message Box inside Trip Card */}
                      {bk.adminNotes && (
                        <div
                          className={`p-4 rounded-2xl border space-y-2 ${
                            bk.status === "Approved"
                              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                              : bk.status === "Declined"
                              ? "bg-rose-950/40 border-rose-500/40 text-rose-200"
                              : "bg-slate-800 border-slate-700 text-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck className="h-4 w-4 text-emerald-400" />
                              Admin Response Notes:
                            </span>
                            {bk.adminResponseDate && (
                              <span className="text-[10px] text-slate-400 font-normal">
                                {new Date(bk.adminResponseDate).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-serif italic">{bk.adminNotes}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-slate-400 font-bold uppercase tracking-wider block">
                            Requested Services:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {bk.services.map((srv) => (
                              <span
                                key={srv}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-300 font-medium"
                              >
                                ✓ {srv}
                              </span>
                            ))}
                          </div>
                        </div>

                        {bk.notes && (
                          <div className="space-y-1">
                            <span className="text-slate-400 font-bold uppercase tracking-wider block">
                              Your Travel Notes:
                            </span>
                            <p className="text-slate-300 italic">{bk.notes}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: NOTIFICATIONS & MESSAGES */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              {userNotifications.length === 0 ? (
                <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                  <Bell className="h-12 w-12 text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm font-medium">No messages or notifications yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {userNotifications.map((ntf) => (
                    <Card
                      key={ntf.id}
                      onClick={() => markNotificationRead(ntf.id)}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                        !ntf.read
                          ? "bg-slate-900 border-emerald-500/50 shadow-lg"
                          : "bg-slate-900/60 border-slate-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-white">{ntf.title}</h3>
                            {!ntf.read && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-serif">
                            {ntf.message}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {new Date(ntf.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DISPATCHED EMAIL INBOX */}
          {activeTab === "emails" && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Mail className="h-5 w-5 text-emerald-400" />
                      Official Email Inbox ({user.email})
                    </h2>
                    <p className="text-xs text-slate-400">
                      All official email notifications, approval vouchers, and administrative messages dispatched to your email address.
                    </p>
                  </div>
                </div>

                {userEmails.length === 0 ? (
                  <div className="text-center py-12 border border-slate-800 rounded-2xl space-y-2">
                    <Mail className="h-10 w-10 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">No emails dispatched to {user.email} yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {userEmails.map((eml) => (
                      <div
                        key={eml.id}
                        onClick={() => setSelectedEmailPreview(eml)}
                        className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-2xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                              {eml.templateType}
                            </span>
                            <h4 className="text-sm font-bold text-white">{eml.subject}</h4>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1 italic font-serif">
                            {eml.body}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 text-xs">
                          <span className="text-slate-500 text-[11px]">
                            {new Date(eml.createdAt).toLocaleDateString()}
                          </span>
                          <span className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold">
                            Preview Email
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* EMAIL PREVIEW MODAL */}
        {selectedEmailPreview && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    ✉️
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                      Dispatched Email Notice
                    </span>
                    <h3 className="text-base font-black text-white">{selectedEmailPreview.subject}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmailPreview(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs font-mono">
                <div className="border-b border-slate-800 pb-3 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">FROM:</span>
                    <span className="text-emerald-400 font-bold">Boundless Souls Tours &lt;info@boundlesssouls.com&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">TO:</span>
                    <span className="text-slate-200 font-bold">{selectedEmailPreview.toName} &lt;{selectedEmailPreview.toEmail}&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DATE:</span>
                    <span className="text-slate-400">{new Date(selectedEmailPreview.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="whitespace-pre-wrap font-sans text-sm text-slate-200 leading-relaxed py-2">
                  {selectedEmailPreview.body}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setSelectedEmailPreview(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs px-6 py-2"
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </HomeLayout>
  );
}

