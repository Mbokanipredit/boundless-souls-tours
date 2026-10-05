"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Mail,
  Compass,
  Layers,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Search,
  X,
  Phone,
  User,
  ShieldCheck,
  Lock,
  LogIn,
  LogOut,
  Send,
  MessageSquare,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Edit3,
  Eye,
  Inbox,
  FileText,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useData } from "@/context/data-context";
import { useAuth, UserAccount } from "@/context/auth-context";

export default function AdminPage() {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    registeredUsers,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
  } = useAuth();

  const {
    bookings,
    approveBooking,
    declineBooking,
    deleteBooking,
    contacts,
    replyToContact,
    deleteContact,
    experiences,
    addExperience,
    deleteExperience,
    services,
    addService,
    deleteService,
    sendAdminNotification,
    dispatchedEmails,
    sendDispatchedEmail,
    deleteDispatchedEmail,
  } = useData();

  // Admin Auth Form State
  const [adminEmail, setAdminEmail] = useState("admin@boundlesssouls.com");
  const [adminPassword, setAdminPassword] = useState("admin");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "bookings" | "users" | "emails" | "outbox" | "contacts" | "experiences" | "services"
  >("bookings");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [showAddExpModal, setShowAddExpModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);

  // Approve / Decline / Message Modal state
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"approve" | "decline" | "message" | null>(null);
  const [responseMsg, setResponseMsg] = useState("");

  // Reply to Contact state
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [contactReplyMsg, setContactReplyMsg] = useState("");

  // User Management State
  const [newUserForm, setNewUserForm] = useState({ name: "", email: "", phone: "" });
  const [editUserForm, setEditUserForm] = useState({ name: "", email: "", phone: "" });

  // Email Builder & Composer State
  const [composerEmail, setComposerEmail] = useState<{
    toEmail: string;
    toName: string;
    subject: string;
    body: string;
    templateType: "approval" | "decline" | "message" | "reply" | "custom";
  }>({
    toEmail: "traveler@example.com",
    toName: "Demo Traveler",
    subject: "[Boundless Souls] Official Approval: Your Rwanda Luxury Tour Itinerary",
    body: `Dear Demo Traveler,

We are thrilled to inform you that your custom Rwanda tour itinerary for Kinigi & Musanze (Gorillas) and Akagera Big 5 Safari has been APPROVED by our concierge team!

Itinerary Summary:
• Destinations: Kinigi & Musanze (Gorillas), Akagera Big 5 Safari
• Services Included: Private 4x4 Driver, Luxury Apartment Booking
• Dates: Nov 12 - Nov 20, 2026

Your gorilla trekking permits and safari Land Cruiser are secured. Please log in to your dashboard to review full details.

Warm regards,
Boundless Souls Concierge Team
info@boundlesssouls.com`,
    templateType: "approval",
  });

  const [outboxPreviewEmail, setOutboxPreviewEmail] = useState<any | null>(null);

  // Dynamic Collected Emails List across Users, Bookings & Contacts
  const collectedEmails = React.useMemo(() => {
    const map = new Map<string, { email: string; name: string; source: string; phone?: string; userId?: string }>();

    registeredUsers.forEach((u) => {
      map.set(u.email.toLowerCase(), {
        email: u.email,
        name: u.name,
        source: "User Account",
        phone: u.phone,
        userId: u.id,
      });
    });

    bookings.forEach((b) => {
      if (!map.has(b.email.toLowerCase())) {
        map.set(b.email.toLowerCase(), {
          email: b.email,
          name: b.clientName,
          source: "Booking Request",
          phone: b.phone,
          userId: b.userId,
        });
      }
    });

    contacts.forEach((c) => {
      if (!map.has(c.email.toLowerCase())) {
        map.set(c.email.toLowerCase(), {
          email: c.email,
          name: c.name,
          source: "Contact Form",
          phone: c.phone,
          userId: c.userId,
        });
      }
    });

    return Array.from(map.values());
  }, [registeredUsers, bookings, contacts]);

  // Handle Preset Template Switch
  const applyEmailTemplate = (type: "approval" | "decline" | "welcome" | "reply" | "custom") => {
    const recipient = composerEmail.toName || "Traveler";
    if (type === "approval") {
      setComposerEmail((prev) => ({
        ...prev,
        templateType: "approval",
        subject: `[Boundless Souls] Official Approval: Your Rwanda Luxury Tour Itinerary`,
        body: `Dear ${recipient},\n\nWe are thrilled to inform you that your custom Rwanda tour request has been APPROVED by our concierge team!\n\nYour permits and private 4x4 safari Land Cruiser are secured. Please log into your portal dashboard to review your itinerary updates.\n\nWarm regards,\nBoundless Souls Concierge Team\ninfo@boundlesssouls.com`,
      }));
    } else if (type === "decline") {
      setComposerEmail((prev) => ({
        ...prev,
        templateType: "decline",
        subject: `[Boundless Souls] Trip Request Update: Alternative Dates Notice`,
        body: `Dear ${recipient},\n\nThank you for choosing Boundless Souls Tours.\n\nRegarding your recent trip request, permits or lodging are currently unavailable for your selected dates. Please log into your dashboard or reply to this email to select alternative dates.\n\nSincerely,\nBoundless Souls Concierge Team`,
      }));
    } else if (type === "welcome") {
      setComposerEmail((prev) => ({
        ...prev,
        templateType: "custom",
        subject: `[Boundless Souls] Welcome to Boundless Souls Safaris & Stays`,
        body: `Dear ${recipient},\n\nWelcome to Boundless Souls Tours! We are delighted to assist you in planning your unforgettable Rwanda journey, from Gorilla Trekking in Volcanoes National Park to luxury stays in Kigali.\n\nExplore our experiences or submit a custom trip request anytime.\n\nBest regards,\nBoundless Souls Team`,
      }));
    } else if (type === "reply") {
      setComposerEmail((prev) => ({
        ...prev,
        templateType: "reply",
        subject: `[Boundless Souls] Response to Your Inquiry`,
        body: `Dear ${recipient},\n\nThank you for contacting Boundless Souls Tours. Here are the details regarding your inquiry...\n\nFeel free to reply if you need any further assistance!\n\nWarm regards,\nBoundless Souls Team`,
      }));
    } else {
      setComposerEmail((prev) => ({
        ...prev,
        templateType: "custom",
        subject: `[Boundless Souls] Important Notice from Boundless Souls`,
        body: `Dear ${recipient},\n\n[Type your custom email text here]\n\nBest regards,\nBoundless Souls Team`,
      }));
    }
  };

  // Dispatch Sample Email Action
  const handleDispatchSampleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerEmail.toEmail || !composerEmail.subject || !composerEmail.body) return;

    const matchedUser = registeredUsers.find((u) => u.email.toLowerCase() === composerEmail.toEmail.toLowerCase());

    sendDispatchedEmail({
      toEmail: composerEmail.toEmail,
      toName: composerEmail.toName || composerEmail.toEmail.split("@")[0],
      userId: matchedUser?.id,
      subject: composerEmail.subject,
      body: composerEmail.body,
      templateType: composerEmail.templateType,
    });

    sendAdminNotification(
      matchedUser?.id || composerEmail.toEmail,
      composerEmail.subject,
      composerEmail.body.slice(0, 140) + "...",
      "message",
      undefined,
      composerEmail.toEmail
    );

    alert(`Email successfully dispatched to ${composerEmail.toEmail}! The user will see this email in their dashboard inbox and notification panel.`);
  };

  // New Experience Form
  const [newExp, setNewExp] = useState({
    title: "",
    subtitle: "",
    tagline: "",
    description: "",
    image: "/images/pics/1.jpeg",
    badge: "Special Safari",
    highlights: "",
  });

  // New Service Form
  const [newService, setNewService] = useState({
    title: "",
    subtitle: "",
    tagline: "",
    description: "",
    bullets: "",
  });

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = loginAdmin(adminEmail, adminPassword);
    if (!success) {
      setLoginError("Invalid Admin credentials. Try admin@boundlesssouls.com / admin");
    }
  };

  const handleBookingActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingId || !actionType) return;

    if (actionType === "approve") {
      approveBooking(selectedBookingId, responseMsg || "Your trip plan has been APPROVED by the Boundless Souls admin team.");
    } else if (actionType === "decline") {
      declineBooking(selectedBookingId, responseMsg || "Unfortunately, we are unable to confirm this trip for your selected dates.");
    } else if (actionType === "message") {
      const bk = bookings.find((b) => b.id === selectedBookingId);
      if (bk) {
        sendAdminNotification(
          bk.userId || bk.email,
          "Update on your trip request",
          responseMsg || "Our team has updated your trip request details.",
          "message",
          bk.id,
          bk.email
        );
        sendDispatchedEmail({
          toEmail: bk.email,
          toName: bk.clientName,
          userId: bk.userId,
          subject: `[Boundless Souls] Message regarding your trip request (#${bk.id})`,
          body: `Dear ${bk.clientName},\n\n${responseMsg || "Our team has updated your trip request details."}\n\nWarm regards,\nBoundless Souls Concierge Team`,
          templateType: "message",
          bookingId: bk.id,
        });
      }
    }

    setSelectedBookingId(null);
    setActionType(null);
    setResponseMsg("");
  };

  const handleContactReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContactId || !contactReplyMsg) return;
    replyToContact(selectedContactId, contactReplyMsg);
    setSelectedContactId(null);
    setContactReplyMsg("");
  };

  const handleAddExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.title) return;
    addExperience({
      title: newExp.title,
      subtitle: newExp.subtitle || "Authentic Rwandan Experience",
      tagline: newExp.tagline || "Discover something unique.",
      description: newExp.description || "An unforgettable journey tailored by Boundless Souls Tours.",
      image: newExp.image || "/images/pics/1.jpeg",
      badge: newExp.badge || "Experience",
      highlights: newExp.highlights
        ? newExp.highlights.split(",").map((h) => h.trim())
        : ["Guided Tour", "Local Highlights", "Comfortable Transport"],
    });
    setShowAddExpModal(false);
    setNewExp({
      title: "",
      subtitle: "",
      tagline: "",
      description: "",
      image: "/images/pics/1.jpeg",
      badge: "Special Safari",
      highlights: "",
    });
  };

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;
    addService({
      title: newService.title,
      subtitle: newService.subtitle || "Premium Lifestyle Service",
      tagline: newService.tagline || "Your convenience is our priority.",
      description: newService.description || "Top tier service designed for your comfort in Rwanda.",
      bullets: newService.bullets
        ? newService.bullets.split(",").map((b) => b.trim())
        : ["24/7 Support", "Professional Staff", "Customized Service"],
    });
    setShowAddServiceModal(false);
    setNewService({
      title: "",
      subtitle: "",
      tagline: "",
      description: "",
      bullets: "",
    });
  };

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="animate-pulse text-slate-400 text-sm">Loading admin control center...</div>
      </main>
    );
  }

  // 🔒 ADMIN LOGIN GATE IF NOT LOGGED IN AS ADMIN
  if (!isAdminLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full space-y-6 shadow-2xl relative">
          <div className="text-center space-y-3">
            <div className="h-16 w-16 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/30">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-black">Boundless Souls Admin Portal</h1>
            <p className="text-xs text-slate-400">
              Please enter your administrator credentials to access trip bookings, approvals, and content management.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Admin Email / Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@boundlesssouls.com"
                  className="bg-slate-950 border-slate-800 text-white pl-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-950 border-slate-800 text-white pl-9"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-6 rounded-full text-xs shadow-lg shadow-emerald-600/30 gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span>Log In to Admin Portal</span>
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/">
              <span className="text-xs text-slate-400 hover:text-white transition-colors">
                ← Return to main website
              </span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const filteredBookings = bookings.filter(
    (b) =>
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destinations.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-20">
      {/* Top Admin Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3.5 px-4 sm:px-8">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              width={36}
              height={36}
              alt="Boundless Souls Logo"
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-sm font-black uppercase tracking-wider text-white">
                Boundless Souls
              </h1>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">
                ADMIN CONTROL CENTER
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button size="sm" className="bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 gap-1.5 rounded-full border border-slate-700">
                <span>Live Site</span>
                <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
              </Button>
            </Link>

            <Button
              size="sm"
              onClick={logoutAdmin}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold rounded-full border border-rose-500/40 gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout Admin</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-7xl space-y-8 pt-4">
        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Total Bookings</span>
              <Calendar className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{bookings.length}</div>
            <p className="text-[11px] text-emerald-400 font-medium">
              {bookings.filter((b) => b.status === "New").length} pending review
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Registered Users</span>
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">{registeredUsers.length}</div>
            <p className="text-[11px] text-blue-400 font-medium">
              {registeredUsers.filter((u) => u.status === "Active" || !u.status).length} active travelers
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Collected Emails</span>
              <Mail className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">{collectedEmails.length}</div>
            <p className="text-[11px] text-amber-400 font-medium">From accounts, forms & bookings</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Dispatched Emails</span>
              <Send className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white">{dispatchedEmails.length}</div>
            <p className="text-[11px] text-purple-400 font-medium">Sent & Delivered Outbox</p>
          </div>
        </div>

        {/* Tab Navigation & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <Button
              onClick={() => setActiveTab("bookings")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold gap-2 transition-all ${
                activeTab === "bookings"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Bookings ({bookings.length})</span>
            </Button>

            <Button
              onClick={() => setActiveTab("users")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold gap-2 transition-all ${
                activeTab === "users"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Users Control ({registeredUsers.length})</span>
            </Button>

            <Button
              onClick={() => setActiveTab("emails")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold gap-2 transition-all ${
                activeTab === "emails"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Email Builder & Collector ({collectedEmails.length})</span>
            </Button>

            <Button
              onClick={() => setActiveTab("outbox")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold gap-2 transition-all ${
                activeTab === "outbox"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Send className="h-4 w-4" />
              <span>Sent Outbox Log ({dispatchedEmails.length})</span>
            </Button>

            <Button
              onClick={() => setActiveTab("contacts")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold gap-2 transition-all ${
                activeTab === "contacts"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Inbox className="h-4 w-4" />
              <span>Inquiries ({contacts.length})</span>
            </Button>

            <Button
              onClick={() => setActiveTab("experiences")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold gap-2 transition-all ${
                activeTab === "experiences"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Experiences ({experiences.length})</span>
            </Button>

            <Button
              onClick={() => setActiveTab("services")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold gap-2 transition-all ${
                activeTab === "services"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Services ({services.length})</span>
            </Button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-slate-900 border-slate-800 pl-9 text-xs text-white placeholder:text-slate-500 rounded-full"
            />
          </div>
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">Trip Bookings & User Requests</h2>
              <span className="text-xs text-slate-400">
                Total: {filteredBookings.length} booking(s)
              </span>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                <Calendar className="h-12 w-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm font-medium">No bookings found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((bk) => (
                  <Card key={bk.id} className="bg-slate-900 border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-white">{bk.clientName}</h3>
                          <span
                            className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              bk.status === "Approved"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : bk.status === "Declined"
                                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                                : bk.status === "New"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {bk.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1 text-emerald-400 font-bold">
                            <Mail className="h-3.5 w-3.5 text-slate-500" />
                            {bk.email}
                          </span>
                          {bk.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5 text-slate-500" />
                              {bk.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="h-3.5 w-3.5" />
                            {new Date(bk.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons for Approving, Declining, Messaging */}
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedBookingId(bk.id);
                            setActionType("approve");
                            setResponseMsg("Your trip plan has been APPROVED by Boundless Souls Tours. Check your email for itinerary details.");
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg gap-1.5"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Approve Trip</span>
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedBookingId(bk.id);
                            setActionType("decline");
                            setResponseMsg("Unfortunately, we cannot confirm this trip for the requested dates due to high demand. Please contact us to adjust dates.");
                          }}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg gap-1.5"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          <span>Decline Trip</span>
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedBookingId(bk.id);
                            setActionType("message");
                            setResponseMsg("");
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg gap-1.5"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Send Message</span>
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteBooking(bk.id)}
                          className="text-xs font-bold rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {bk.adminNotes && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                        <span className="text-amber-400 font-bold block">Current Admin Note:</span>
                        <p className="text-slate-300 italic">{bk.adminNotes}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-slate-400 font-bold uppercase tracking-wider block">
                          Selected Destinations:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {bk.destinations.map((dest) => (
                            <span
                              key={dest}
                              className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-300 font-medium"
                            >
                              {dest}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-bold uppercase tracking-wider block">
                          Services Requested:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {bk.services.map((srv) => (
                            <span
                              key={srv}
                              className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-blue-300 font-medium"
                            >
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-bold uppercase tracking-wider block">
                          Travelers & Dates:
                        </span>
                        <p className="text-slate-200 font-medium">
                          {bk.travelers} Traveler(s) • {bk.dateRange}
                        </p>
                        {bk.notes && (
                          <p className="text-slate-400 italic text-[11px]">
                            &ldquo;{bk.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: USERS CONTROL */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Registered Users Control & Management</h2>
                <p className="text-xs text-slate-400">View, create, edit, block, or delete user accounts</p>
              </div>

              <Button
                onClick={() => {
                  setNewUserForm({ name: "", email: "", phone: "" });
                  setShowAddUserModal(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full gap-2 text-xs px-5 shadow-lg shadow-emerald-600/30"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add New User Account</span>
              </Button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Registered Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {registeredUsers
                      .filter(
                        (u) =>
                          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-slate-950/50 transition-colors">
                          <td className="p-4 font-bold text-white flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{u.name}</span>
                          </td>
                          <td className="p-4 text-emerald-400 font-mono">{u.email}</td>
                          <td className="p-4 text-slate-400">{u.phone || "N/A"}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                                u.status === "Blocked"
                                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              }`}
                            >
                              {u.status === "Blocked" ? "🔴 Blocked" : "🟢 Active"}
                            </span>
                          </td>
                          <td className="p-4 text-slate-400">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={() => {
                                  setComposerEmail((prev) => ({
                                    ...prev,
                                    toEmail: u.email,
                                    toName: u.name,
                                    subject: `[Boundless Souls] Message to ${u.name}`,
                                    body: `Dear ${u.name},\n\nWe are contacting you regarding your account on Boundless Souls Tours...\n\nBest regards,\nBoundless Souls Team`,
                                  }));
                                  setActiveTab("emails");
                                }}
                                className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[11px] font-bold rounded-lg px-2.5"
                              >
                                <Mail className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Send Email</span>
                              </Button>

                              <Button
                                size="sm"
                                onClick={() => toggleUserStatus(u.id)}
                                className={`text-[11px] font-bold rounded-lg px-2.5 ${
                                  u.status === "Blocked"
                                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                    : "bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40"
                                }`}
                              >
                                {u.status === "Blocked" ? <UserCheck className="h-3.5 w-3.5" /> : <UserX className="h-3.5 w-3.5" />}
                                <span className="hidden sm:inline">
                                  {u.status === "Blocked" ? "Unblock" : "Block"}
                                </span>
                              </Button>

                              <Button
                                size="sm"
                                onClick={() => {
                                  setEditingUser(u);
                                  setEditUserForm({ name: u.name, email: u.email, phone: u.phone });
                                }}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold rounded-lg px-2"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </Button>

                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete user ${u.name}?`)) {
                                    deleteUser(u.id);
                                  }
                                }}
                                className="text-[11px] font-bold rounded-lg px-2"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EMAIL BUILDER & COLLECTOR */}
        {activeTab === "emails" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form & Preset Controls */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="space-y-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                    Interactive Email Sample Generator
                  </span>
                  <h2 className="text-xl font-black text-white">Compose & Dispatch Email Sample</h2>
                  <p className="text-xs text-slate-400">
                    Select an email template or write custom content to send to a user.
                  </p>
                </div>

                {/* Template Preset Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Preset Email Templates:</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyEmailTemplate("approval")}
                      className="px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40"
                    >
                      🎉 Trip Approval Sample
                    </button>
                    <button
                      type="button"
                      onClick={() => applyEmailTemplate("decline")}
                      className="px-3 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/40"
                    >
                      ℹ️ Alternative Dates / Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => applyEmailTemplate("welcome")}
                      className="px-3 py-1.5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-bold border border-blue-500/40"
                    >
                      ✨ Welcome Traveler
                    </button>
                    <button
                      type="button"
                      onClick={() => applyEmailTemplate("reply")}
                      className="px-3 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-bold border border-purple-500/40"
                    >
                      💬 Inquiry Response
                    </button>
                  </div>
                </div>

                <form onSubmit={handleDispatchSampleEmail} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Recipient Email Address</label>
                      <Input
                        required
                        type="email"
                        value={composerEmail.toEmail}
                        onChange={(e) => setComposerEmail({ ...composerEmail, toEmail: e.target.value })}
                        placeholder="traveler@example.com"
                        className="bg-slate-950 border-slate-800 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Recipient Full Name</label>
                      <Input
                        required
                        value={composerEmail.toName}
                        onChange={(e) => setComposerEmail({ ...composerEmail, toName: e.target.value })}
                        placeholder="Demo Traveler"
                        className="bg-slate-950 border-slate-800 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Email Subject Line</label>
                    <Input
                      required
                      value={composerEmail.subject}
                      onChange={(e) => setComposerEmail({ ...composerEmail, subject: e.target.value })}
                      placeholder="Email subject..."
                      className="bg-slate-950 border-slate-800 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Email Body Message</label>
                    <textarea
                      required
                      rows={8}
                      value={composerEmail.body}
                      onChange={(e) => setComposerEmail({ ...composerEmail, body: e.target.value })}
                      placeholder="Write message content..."
                      className="w-full rounded-md border border-slate-800 bg-slate-950 p-3 text-xs text-white font-mono leading-relaxed"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-full text-xs shadow-lg shadow-emerald-600/30 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Dispatch Email & Notify Traveler</span>
                  </Button>
                </form>
              </div>

              {/* Live Styled Email Preview Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Live Email Sample Preview
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                      User View
                    </span>
                  </div>

                  {/* Rendered Email Sample Container */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 text-xs font-sans shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Image src="/images/logo.jpeg" width={28} height={28} alt="Logo" className="rounded-full" />
                        <div>
                          <span className="font-black text-white text-xs block">Boundless Souls Tours</span>
                          <span className="text-[10px] text-slate-400">info@boundlesssouls.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px]">
                      <div>
                        <span className="text-slate-500">To: </span>
                        <span className="text-emerald-400 font-bold">{composerEmail.toName || "Traveler"}</span> &lt;
                        {composerEmail.toEmail}&gt;
                      </div>
                      <div>
                        <span className="text-slate-500">Subject: </span>
                        <span className="text-white font-bold">{composerEmail.subject}</span>
                      </div>
                    </div>

                    <div className="whitespace-pre-wrap text-slate-200 leading-relaxed text-xs py-2 border-l-2 border-emerald-500 pl-3">
                      {composerEmail.body}
                    </div>

                    <div className="pt-3 border-t border-slate-800 text-center space-y-2">
                      <button className="bg-emerald-600 text-white font-bold text-[11px] px-5 py-2 rounded-full shadow">
                        View Trip Details on Portal
                      </button>
                      <p className="text-[10px] text-slate-500">
                        © Boundless Souls Tours & Travel Agency Ltd • Kigali, Rwanda
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collected Email Address Directory */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail className="h-5 w-5 text-amber-400" />
                    Collected Email Addresses Directory ({collectedEmails.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Emails collected automatically from registered traveler accounts, trip booking requests, and contact forms.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {collectedEmails.map((item) => (
                  <div
                    key={item.email}
                    className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-1 overflow-hidden">
                      <span className="font-bold text-white text-xs block truncate">{item.name}</span>
                      <span className="text-emerald-400 text-xs font-mono block truncate">{item.email}</span>
                      <span className="text-[10px] text-slate-500 block">Source: {item.source}</span>
                    </div>

                    <button
                      onClick={() => {
                        setComposerEmail((prev) => ({
                          ...prev,
                          toEmail: item.email,
                          toName: item.name,
                        }));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-[10px] font-bold px-3 py-2 rounded-lg border border-emerald-500/30 shrink-0"
                    >
                      Compose Email
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SENT OUTBOX LOG */}
        {activeTab === "outbox" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Dispatched Emails Outbox Log</h2>
                <p className="text-xs text-slate-400">History of all emails sent to users</p>
              </div>
              <span className="text-xs text-slate-400">Total: {dispatchedEmails.length} sent</span>
            </div>

            {dispatchedEmails.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                <Send className="h-12 w-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm font-medium">No dispatched emails in outbox log.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {dispatchedEmails.map((eml) => (
                  <div
                    key={eml.id}
                    className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                          {eml.status}
                        </span>
                        <h4 className="text-sm font-bold text-white">{eml.subject}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>
                          To: <strong className="text-slate-200">{eml.toName}</strong> ({eml.toEmail})
                        </span>
                        <span>• Sent: {new Date(eml.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setOutboxPreviewEmail(eml)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg gap-1.5"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Preview Draft</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteDispatchedEmail(eml.id)}
                        className="text-xs font-bold rounded-lg"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">Contact Us Messages</h2>
              <span className="text-xs text-slate-400">
                Total: {filteredContacts.length} message(s)
              </span>
            </div>

            {filteredContacts.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                <Mail className="h-12 w-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm font-medium">No contact messages found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredContacts.map((ct) => (
                  <Card key={ct.id} className="bg-slate-900 border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-white">{ct.name}</h3>
                          <span
                            className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              ct.status === "Unread"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            }`}
                          >
                            {ct.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                          <span className="text-emerald-400 font-bold">{ct.email}</span>
                          {ct.phone && <span>{ct.phone}</span>}
                          <span>• {new Date(ct.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedContactId(ct.id);
                            setContactReplyMsg(ct.adminReply || "");
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg gap-1.5"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Reply to User</span>
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteContact(ct.id)}
                          className="text-xs font-bold rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-200">Subject: {ct.subject}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        {ct.message}
                      </p>
                      {ct.adminReply && (
                        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs">
                          <span className="font-bold block">Your Reply:</span>
                          <p className="italic">{ct.adminReply}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EXPERIENCES */}
        {activeTab === "experiences" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Tour Experiences & Destinations</h2>
                <p className="text-xs text-slate-400">Manage live tour offerings displayed on site</p>
              </div>

              <Button
                onClick={() => setShowAddExpModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full gap-2 text-xs px-5 shadow-lg shadow-emerald-600/30"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Experience</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((exp) => (
                <Card key={exp.id} className="bg-slate-900 border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-emerald-400 text-[11px] font-bold border border-slate-700">
                        {exp.badge}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <span className="text-[11px] font-black uppercase text-emerald-400">
                        {exp.title}
                      </span>
                      <h3 className="text-base font-bold text-white">{exp.subtitle}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-2">
                        {exp.highlights.map((hl) => (
                          <span key={hl} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium">
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-800 flex justify-end">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteExperience(exp.id)}
                      className="text-xs font-bold rounded-lg gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Travel & Lifestyle Services</h2>
                <p className="text-xs text-slate-400">Manage apartments, private chefs, drivers, and transfers</p>
              </div>

              <Button
                onClick={() => setShowAddServiceModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full gap-2 text-xs px-5 shadow-lg shadow-emerald-600/30"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Service</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <Card key={srv.id} className="bg-slate-900 border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                      <span className="text-xs font-bold text-emerald-400">{srv.subtitle}</span>
                    </div>

                    <p className="text-xs text-slate-300 italic font-serif">&ldquo;{srv.tagline}&rdquo;</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Features:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-300">
                        {srv.bullets.map((b) => (
                          <div key={b} className="flex items-center gap-1.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteService(srv.id)}
                      className="text-xs font-bold rounded-lg gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete Service</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Approve / Decline / Message Booking */}
      {selectedBookingId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-white">
            <button
              onClick={() => {
                setSelectedBookingId(null);
                setActionType(null);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-black">
                {actionType === "approve"
                  ? "Approve Trip Request"
                  : actionType === "decline"
                  ? "Decline Trip Request"
                  : "Send Message to User"}
              </h3>
              <p className="text-xs text-slate-400">
                This will send an instant notification to the user&apos;s dashboard.
              </p>
            </div>

            <form onSubmit={handleBookingActionSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">
                  {actionType === "approve"
                    ? "Approval Message / Instructions"
                    : actionType === "decline"
                    ? "Reason for Declining"
                    : "Message to Traveler"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={responseMsg}
                  onChange={(e) => setResponseMsg(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full rounded-md border border-slate-800 bg-slate-950 p-3 text-xs text-white"
                />
              </div>

              <Button
                type="submit"
                className={`w-full font-bold py-5 rounded-full text-xs shadow-lg ${
                  actionType === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : actionType === "decline"
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {actionType === "approve"
                  ? "Confirm & Send Approval"
                  : actionType === "decline"
                  ? "Confirm & Send Decline"
                  : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Reply to Contact Message */}
      {selectedContactId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-white">
            <button
              onClick={() => setSelectedContactId(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-black">Reply to Contact Message</h3>
              <p className="text-xs text-slate-400">
                Send a response to the traveler&apos;s inbox & notification panel.
              </p>
            </div>

            <form onSubmit={handleContactReplySubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Reply Message</label>
                <textarea
                  required
                  rows={4}
                  value={contactReplyMsg}
                  onChange={(e) => setContactReplyMsg(e.target.value)}
                  placeholder="Type your response to the user..."
                  className="w-full rounded-md border border-slate-800 bg-slate-950 p-3 text-xs text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-full text-xs shadow-lg gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Reply</span>
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add New Experience */}
      {showAddExpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative text-white">
            <button
              onClick={() => setShowAddExpModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-black">Add New Tour Experience</h3>
              <p className="text-xs text-slate-400">Fill in details for a new Rwandan destination</p>
            </div>

            <form onSubmit={handleAddExperienceSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Experience Title (e.g. NYUNGWE CANOPY)</label>
                <Input
                  required
                  value={newExp.title}
                  onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                  placeholder="NYUNGWE CANOPY"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Subtitle</label>
                <Input
                  value={newExp.subtitle}
                  onChange={(e) => setNewExp({ ...newExp, subtitle: e.target.value })}
                  placeholder="Chimpanzee Trekking & Ancient Rainforest"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Badge Tag</label>
                  <Input
                    value={newExp.badge}
                    onChange={(e) => setNewExp({ ...newExp, badge: e.target.value })}
                    placeholder="Rainforest Safari"
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Image Path / Preset</label>
                  <select
                    value={newExp.image}
                    onChange={(e) => setNewExp({ ...newExp, image: e.target.value })}
                    className="w-full h-9 rounded-md border border-slate-800 bg-slate-950 px-3 text-xs text-white"
                  >
                    <option value="/images/pics/1.jpeg">Photo 1 (Gorilla / Volcanoes)</option>
                    <option value="/images/pics/2.jpeg">Photo 2 (Akagera Wildlife)</option>
                    <option value="/images/pics/3.jpeg">Photo 3 (Bigogwe Hills)</option>
                    <option value="/images/pics/4.jpeg">Photo 4 (Lake Kivu)</option>
                    <option value="/images/pics/5.jpeg">Photo 5 (Kigali City)</option>
                    <option value="/images/pics/6.jpeg">Photo 6</option>
                    <option value="/images/pics/7.jpeg">Photo 7</option>
                    <option value="/images/pics/8.jpeg">Photo 8</option>
                    <option value="/images/pics/9.jpeg">Photo 9</option>
                    <option value="/images/pics/10.jpeg">Photo 10</option>
                    <option value="/images/pics/11.jpeg">Photo 11</option>
                    <option value="/images/pics/12.jpeg">Photo 12</option>
                    <option value="/images/pics/13.jpeg">Photo 13</option>
                    <option value="/images/pics/14.jpeg">Photo 14</option>
                    <option value="/images/pics/15.jpeg">Photo 15</option>
                    <option value="/images/pics/16.jpeg">Photo 16</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Tagline Quote</label>
                <Input
                  value={newExp.tagline}
                  onChange={(e) => setNewExp({ ...newExp, tagline: e.target.value })}
                  placeholder="Walk above the rainforest canopy."
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  placeholder="Describe the adventure, nature highlights, and itinerary..."
                  className="w-full rounded-md border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Highlights (Comma separated)</label>
                <Input
                  value={newExp.highlights}
                  onChange={(e) => setNewExp({ ...newExp, highlights: e.target.value })}
                  placeholder="Canopy Walkway, Chimpanzee Tracking, Tea Estate Visit"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-full text-xs shadow-lg shadow-emerald-600/30"
              >
                Add Experience
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add New Service */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative text-white">
            <button
              onClick={() => setShowAddServiceModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-black">Add New Service</h3>
              <p className="text-xs text-slate-400">Fill in details for a new lifestyle or travel service</p>
            </div>

            <form onSubmit={handleAddServiceSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Service Title (e.g. Helicopter Charter)</label>
                <Input
                  required
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="Helicopter Charter"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Subtitle</label>
                <Input
                  value={newService.subtitle}
                  onChange={(e) => setNewService({ ...newService, subtitle: e.target.value })}
                  placeholder="Fast Luxury Transfers Across Rwanda"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Tagline</label>
                <Input
                  value={newService.tagline}
                  onChange={(e) => setNewService({ ...newService, tagline: e.target.value })}
                  placeholder="Fly over 1000 hills in total comfort."
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Service details and availability..."
                  className="w-full rounded-md border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Bullet Features (Comma separated)</label>
                <Input
                  value={newService.bullets}
                  onChange={(e) => setNewService({ ...newService, bullets: e.target.value })}
                  placeholder="Direct Airport to Lodge, VIP Lounge Access, Scenic Aerial Views"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-full text-xs shadow-lg shadow-emerald-600/30"
              >
                Add Service
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add New User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-white">
            <button
              onClick={() => setShowAddUserModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-black">Add New Traveler Account</h3>
              <p className="text-xs text-slate-400">Manually register a user account</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newUserForm.name || !newUserForm.email) return;
                addUser(newUserForm.name, newUserForm.email, newUserForm.phone);
                setShowAddUserModal(false);
                setNewUserForm({ name: "", email: "", phone: "" });
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Full Name</label>
                <Input
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Email Address</label>
                <Input
                  required
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Phone Number</label>
                <Input
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  placeholder="+250 788 000 111"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-full text-xs shadow-lg shadow-emerald-600/30"
              >
                Create User Account
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit User Details */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-white">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-black">Edit User Profile</h3>
              <p className="text-xs text-slate-400">Update details for {editingUser.name}</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editingUser) return;
                updateUser(editingUser.id, editUserForm);
                setEditingUser(null);
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Full Name</label>
                <Input
                  required
                  value={editUserForm.name}
                  onChange={(e) => setEditUserForm({ ...editUserForm, name: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Email Address</label>
                <Input
                  required
                  type="email"
                  value={editUserForm.email}
                  onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Phone Number</label>
                <Input
                  value={editUserForm.phone}
                  onChange={(e) => setEditUserForm({ ...editUserForm, phone: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-full text-xs shadow-lg shadow-emerald-600/30"
              >
                Save Profile Changes
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Preview Outbox Dispatched Email */}
      {outboxPreviewEmail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative text-white">
            <button
              onClick={() => setOutboxPreviewEmail(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                ✉️
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  Dispatched Email Outbox Record
                </span>
                <h3 className="text-base font-black">{outboxPreviewEmail.subject}</h3>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="border-b border-slate-800 pb-2 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">TO:</span>
                  <span className="text-emerald-400 font-bold">{outboxPreviewEmail.toName} &lt;{outboxPreviewEmail.toEmail}&gt;</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">STATUS:</span>
                  <span className="text-emerald-400 font-bold">🟢 {outboxPreviewEmail.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DISPATCHED:</span>
                  <span className="text-slate-400">{new Date(outboxPreviewEmail.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="whitespace-pre-wrap text-slate-200 leading-relaxed font-sans text-xs py-2">
                {outboxPreviewEmail.body}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setOutboxPreviewEmail(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs px-6 py-2"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

