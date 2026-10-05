"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Booking {
  id: string;
  userId?: string;
  clientName: string;
  email: string;
  phone: string;
  destinations: string[];
  services: string[];
  travelers: number;
  dateRange: string;
  notes?: string;
  createdAt: string;
  status: "New" | "Approved" | "Declined" | "Confirmed" | "Cancelled";
  adminNotes?: string;
  adminResponseDate?: string;
}

export interface ContactMessage {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "Unread" | "Read" | "Responded";
  adminReply?: string;
}

export interface UserNotification {
  id: string;
  userId: string;
  userEmail?: string;
  title: string;
  message: string;
  type: "approval" | "decline" | "message";
  createdAt: string;
  read: boolean;
  bookingId?: string;
}

export interface DispatchedEmail {
  id: string;
  toEmail: string;
  toName: string;
  userId?: string;
  subject: string;
  body: string;
  templateType: "approval" | "decline" | "message" | "reply" | "custom";
  createdAt: string;
  status: "Sent" | "Delivered";
  bookingId?: string;
}

export interface ExperienceItemData {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  highlights: string[];
}

export interface ServiceItemData {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  bullets: string[];
  iconType?: string;
}

interface DataContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => void;
  deleteBooking: (id: string) => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  approveBooking: (bookingId: string, adminMessage?: string) => void;
  declineBooking: (bookingId: string, reasonMessage?: string) => void;

  contacts: ContactMessage[];
  addContact: (contact: Omit<ContactMessage, "id" | "createdAt" | "status">) => void;
  deleteContact: (id: string) => void;
  updateContactStatus: (id: string, status: ContactMessage["status"]) => void;
  replyToContact: (contactId: string, replyMessage: string) => void;

  notifications: UserNotification[];
  sendAdminNotification: (
    userId: string,
    title: string,
    message: string,
    type: UserNotification["type"],
    bookingId?: string,
    userEmail?: string
  ) => void;
  markNotificationRead: (notificationId: string) => void;

  dispatchedEmails: DispatchedEmail[];
  sendDispatchedEmail: (emailData: Omit<DispatchedEmail, "id" | "createdAt" | "status">) => void;
  deleteDispatchedEmail: (id: string) => void;

  experiences: ExperienceItemData[];
  addExperience: (exp: Omit<ExperienceItemData, "id">) => void;
  deleteExperience: (id: string) => void;

  services: ServiceItemData[];
  addService: (service: Omit<ServiceItemData, "id">) => void;
  deleteService: (id: string) => void;
}

const initialExperiences: ExperienceItemData[] = [
  {
    id: "kinigi-musanze",
    title: "KINIGI & MUSANZE",
    subtitle: "Meet the Mountain Gorillas",
    tagline: "An experience you will never forget.",
    description:
      "Journey into Rwanda's breathtaking northern landscapes and experience one of the world's most extraordinary wildlife adventures. Discover the beauty of Musanze, the volcanic landscapes surrounding Kinigi, and gorilla trekking in Volcanoes National Park.",
    image: "/images/gorilla-trek.png",
    badge: "Gorilla Safari",
    highlights: [
      "Mountain Gorilla Trekking",
      "Volcanoes National Park",
      "Musanze Cave Exploration",
      "Cultural Village Tours",
    ],
  },
  {
    id: "akagera",
    title: "AKAGERA",
    subtitle: "Discover Rwanda's Wild Side",
    tagline: "Step into the wild.",
    description:
      "Experience the beauty and excitement of Rwanda's wilderness. From breathtaking savannah landscapes to incredible Big Five wildlife encounters, Akagera offers an unforgettable safari experience for travelers looking to experience nature.",
    image: "/images/akagera-safari.png",
    badge: "Wildlife Safari",
    highlights: [
      "Big 5 Game Drives",
      "Lake Ihema Boat Safaris",
      "Giraffe & Elephant Tracking",
      "Luxury Safari Lodges",
    ],
  },
  {
    id: "bigogwe",
    title: "BIGOGWE",
    subtitle: "Experience the Beauty of Rural Rwanda",
    tagline: "Beautiful views. Authentic experiences. Unforgettable memories.",
    description:
      "Escape into the breathtaking countryside of Bigogwe. Discover beautiful rolling green tea landscapes, experience Rwanda's unique long-horned Ankole cattle culture, and enjoy a peaceful and authentic side of the country.",
    image: "/images/bigogwe-hills.png",
    badge: "Cultural & Countryside",
    highlights: [
      "Ankole Cattle Culture",
      "Emerald Tea Plantation Walks",
      "Traditional Camping & Hiking",
      "Local Farm-to-Table Meals",
    ],
  },
  {
    id: "lakes-rivers",
    title: "LAKES & RIVERS",
    subtitle: "Discover Rwanda's Natural Beauty",
    tagline: "Slow down. Explore. Take it all in.",
    description:
      "Experience the peaceful and breathtaking beauty of Rwanda's lakes and rivers. From relaxing moments by the water of Lake Kivu to scenic boat journeys on Twin Lakes Burera & Ruhondo surrounded by volcanic peaks.",
    image: "/images/lake-kivu.png",
    badge: "Lakeside Relaxation",
    highlights: [
      "Lake Kivu Sunset Cruises",
      "Twin Lakes Kayaking",
      "Coffee Island Excursions",
      "Lakeside Resort Relaxation",
    ],
  },
  {
    id: "kigali",
    title: "KIGALI",
    subtitle: "Discover the Heart of Rwanda",
    tagline: "Explore Kigali differently.",
    description:
      "Experience the vibrant energy of Kigali through its rich culture, gastronomy, lifestyle, entertainment, beautiful views, and hidden gems. Let us help you discover a side of Africa's cleanest city that goes beyond tourist spots.",
    image: "/images/kigali-city.png",
    badge: "Urban & Lifestyle",
    highlights: [
      "Art Galleries & Craft Markets",
      "Kigali Genocide Memorial",
      "Rooftop Culinary Experience",
      "Nightlife & Cultural Gems",
    ],
  },
];

const initialServices: ServiceItemData[] = [
  {
    id: "apartment-booking",
    title: "Apartment Booking",
    subtitle: "Looking for a place to stay?",
    tagline: "Your ideal home away from home.",
    description:
      "We can assist you in finding and booking suitable apartments based on your preferences, location, budget, and length of stay. Whether you are visiting for a few days or planning an extended stay, we help make finding your space easier.",
    bullets: [
      "Vetted luxury & cozy apartments",
      "Prime locations in Kigali & Musanze",
      "Short-term & extended stay options",
      "24/7 guest assistance",
    ],
  },
  {
    id: "private-chef",
    title: "Private Chef",
    subtitle: "Personalized Gourmet Dining",
    tagline: "Great food. Personal service. Your space.",
    description:
      "Enjoy a personalized dining experience in the comfort of your accommodation. Whether you are hosting a special gathering, traveling with family or friends, or simply want to enjoy a private meal, we can help connect you with private chef services for a memorable dining experience.",
    bullets: [
      "Custom Rwandan & international menus",
      "Fresh local organic ingredients",
      "In-apartment fine dining service",
      "Special dietary accommodation",
    ],
  },
  {
    id: "private-driver",
    title: "Private Driver",
    subtitle: "Travel Comfortably & Safely",
    tagline: "Travel comfortably. Explore freely.",
    description:
      "Explore Rwanda at your own pace with the convenience of a private driver. Whether you need transportation for a day, a specific journey, business travel, or a personalized itinerary, we can help arrange a driver experience suited to your needs.",
    bullets: [
      "Professional English/French speaking drivers",
      "Clean 4x4 Safari Land Cruisers & SUVs",
      "Flexible daily & trip itineraries",
      "Business & leisure travel support",
    ],
  },
  {
    id: "pickup-dropoff",
    title: "Pick-Up & Drop-Off",
    subtitle: "Seamless Airport & Inter-City Transfers",
    tagline: "Start and end your journey with ease.",
    description:
      "We offer pick-up and drop-off arrangements to help make your arrival, departure, and movement between destinations smooth and convenient. Whether it is an airport transfer, hotel or apartment pick-up, or transportation to your next destination, we are here to help make your journey easier.",
    bullets: [
      "24/7 Kigali Airport (KGL) transfers",
      "Hotel & apartment door-to-door pickup",
      "Punctual & flight-monitored arrivals",
      "Inter-city transfers (Musanze, Rubavu, Akagera)",
    ],
  },
];

const initialBookings: Booking[] = [
  {
    id: "bk-101",
    userId: "usr-demo",
    clientName: "Demo Traveler",
    email: "traveler@example.com",
    phone: "+250 788 123 456",
    destinations: ["Kinigi & Musanze (Gorillas)", "Akagera Big 5 Safari"],
    services: ["Private 4x4 Driver", "Luxury Apartment Booking"],
    travelers: 2,
    dateRange: "Nov 12 - Nov 20, 2026",
    notes: "Requesting photography permits.",
    createdAt: "2026-10-02T10:30:00Z",
    status: "Approved",
    adminNotes: "Your gorilla trek permits and safari Land Cruiser have been approved! Check your email for full itinerary.",
    adminResponseDate: "2026-10-02T11:00:00Z",
  },
];

const initialContacts: ContactMessage[] = [
  {
    id: "ct-201",
    userId: "usr-demo",
    name: "Demo Traveler",
    email: "traveler@example.com",
    phone: "+250 788 123 456",
    subject: "Gorilla Trekking Permits Availability",
    message: "Hello team! What is the current availability for Volcanoes National Park gorilla permits?",
    createdAt: "2026-10-03T09:45:00Z",
    status: "Responded",
    adminReply: "Hello! Permits are currently available for your requested dates. We have locked in 2 permits for you.",
  },
];

const initialNotifications: UserNotification[] = [
  {
    id: "ntf-101",
    userId: "usr-demo",
    userEmail: "traveler@example.com",
    title: "Trip Plan Approved! 🎉",
    message: "Your trip plan for Kinigi & Musanze (Gorillas) has been APPROVED by the Boundless Souls admin team. Confirmation details sent to traveler@example.com.",
    type: "approval",
    createdAt: "2026-10-02T11:00:00Z",
    read: false,
    bookingId: "bk-101",
  },
];

const initialDispatchedEmails: DispatchedEmail[] = [
  {
    id: "eml-101",
    toEmail: "traveler@example.com",
    toName: "Demo Traveler",
    userId: "usr-demo",
    subject: "[Boundless Souls] Trip Plan APPROVED: Kinigi & Musanze Safaris 🎉",
    body: `Dear Demo Traveler,

We are thrilled to inform you that your custom Rwanda tour itinerary for Kinigi & Musanze (Gorillas) and Akagera Big 5 Safari has been APPROVED by our concierge team!

Itinerary Summary:
• Destinations: Kinigi & Musanze (Gorillas), Akagera Big 5 Safari
• Services Included: Private 4x4 Driver, Luxury Apartment Booking
• Dates: Nov 12 - Nov 20, 2026
• Travelers: 2 Person(s)

Your gorilla trekking permits and private 4x4 safari Land Cruiser have been secured. Please check your user dashboard on our portal for the detailed voucher.

Warm regards,
Boundless Souls Concierge Team
info@boundlesssouls.com`,
    templateType: "approval",
    createdAt: "2026-10-02T11:00:00Z",
    status: "Delivered",
    bookingId: "bk-101",
  },
  {
    id: "eml-102",
    toEmail: "alice.johnson@example.com",
    toName: "Alice Johnson",
    userId: "usr-102",
    subject: "[Boundless Souls] Welcome to Boundless Souls Rwanda Experience",
    body: `Dear Alice Johnson,

Welcome to Boundless Souls Tours! We are delighted to have you on board. Explore our customized luxury safaris, gorilla trekking packages, and apartment stays in Kigali.

If you have any questions or would like to plan a custom trip, feel free to submit a trip request anytime.

Best regards,
Boundless Souls Team`,
    templateType: "custom",
    createdAt: "2026-10-01T15:00:00Z",
    status: "Delivered",
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [contacts, setContacts] = useState<ContactMessage[]>(initialContacts);
  const [notifications, setNotifications] = useState<UserNotification[]>(initialNotifications);
  const [dispatchedEmails, setDispatchedEmails] = useState<DispatchedEmail[]>(initialDispatchedEmails);
  const [experiences, setExperiences] = useState<ExperienceItemData[]>(initialExperiences);
  const [services, setServices] = useState<ServiceItemData[]>(initialServices);
  const isInitialized = React.useRef(false);

  const loadDataFromStorage = () => {
    if (typeof window === "undefined") return;
    try {
      const savedBookings = localStorage.getItem("bst_bookings");
      if (savedBookings && savedBookings !== "undefined" && savedBookings !== "null") {
        const parsed = JSON.parse(savedBookings);
        if (Array.isArray(parsed)) setBookings(parsed);
      } else {
        localStorage.setItem("bst_bookings", JSON.stringify(initialBookings));
      }
    } catch (e) {
      console.error("DataContext bookings load error:", e);
    }

    try {
      const savedContacts = localStorage.getItem("bst_contacts");
      if (savedContacts && savedContacts !== "undefined" && savedContacts !== "null") {
        const parsed = JSON.parse(savedContacts);
        if (Array.isArray(parsed)) setContacts(parsed);
      } else {
        localStorage.setItem("bst_contacts", JSON.stringify(initialContacts));
      }
    } catch (e) {
      console.error("DataContext contacts load error:", e);
    }

    try {
      const savedNotifs = localStorage.getItem("bst_notifications");
      if (savedNotifs && savedNotifs !== "undefined" && savedNotifs !== "null") {
        const parsed = JSON.parse(savedNotifs);
        if (Array.isArray(parsed)) setNotifications(parsed);
      } else {
        localStorage.setItem("bst_notifications", JSON.stringify(initialNotifications));
      }
    } catch (e) {
      console.error("DataContext notifications load error:", e);
    }

    try {
      const savedEmails = localStorage.getItem("bst_dispatched_emails");
      if (savedEmails && savedEmails !== "undefined" && savedEmails !== "null") {
        const parsed = JSON.parse(savedEmails);
        if (Array.isArray(parsed)) setDispatchedEmails(parsed);
      } else {
        localStorage.setItem("bst_dispatched_emails", JSON.stringify(initialDispatchedEmails));
      }
    } catch (e) {
      console.error("DataContext emails load error:", e);
    }

    try {
      const savedExps = localStorage.getItem("bst_experiences");
      if (savedExps && savedExps !== "undefined" && savedExps !== "null") {
        const parsed = JSON.parse(savedExps);
        if (Array.isArray(parsed)) setExperiences(parsed);
      } else {
        localStorage.setItem("bst_experiences", JSON.stringify(initialExperiences));
      }
    } catch (e) {
      console.error("DataContext experiences load error:", e);
    }

    try {
      const savedServices = localStorage.getItem("bst_services");
      if (savedServices && savedServices !== "undefined" && savedServices !== "null") {
        const parsed = JSON.parse(savedServices);
        if (Array.isArray(parsed)) setServices(parsed);
      } else {
        localStorage.setItem("bst_services", JSON.stringify(initialServices));
      }
    } catch (e) {
      console.error("DataContext services load error:", e);
    }
  };

  // 1. Initial Load & Storage Listener for Cross-Tab Realtime Updates
  useEffect(() => {
    loadDataFromStorage();
    isInitialized.current = true;

    const handleStorageChange = () => {
      loadDataFromStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 2. Save only when initialized
  useEffect(() => {
    if (isInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("bst_bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    if (isInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("bst_contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    if (isInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("bst_notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    if (isInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("bst_dispatched_emails", JSON.stringify(dispatchedEmails));
    }
  }, [dispatchedEmails]);

  useEffect(() => {
    if (isInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("bst_experiences", JSON.stringify(experiences));
    }
  }, [experiences]);

  useEffect(() => {
    if (isInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("bst_services", JSON.stringify(services));
    }
  }, [services]);

  const addBooking = (bookingData: Omit<Booking, "id" | "createdAt" | "status">) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: "New",
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const sendAdminNotification = (
    userId: string,
    title: string,
    message: string,
    type: UserNotification["type"],
    bookingId?: string,
    userEmail?: string
  ) => {
    const newNotif: UserNotification = {
      id: `ntf-${Date.now().toString().slice(-4)}`,
      userId,
      userEmail,
      title,
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false,
      bookingId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const sendDispatchedEmail = (emailData: Omit<DispatchedEmail, "id" | "createdAt" | "status">) => {
    const newEmail: DispatchedEmail = {
      ...emailData,
      id: `eml-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: "Delivered",
    };
    setDispatchedEmails((prev) => [newEmail, ...prev]);
  };

  const deleteDispatchedEmail = (id: string) => {
    setDispatchedEmails((prev) => prev.filter((e) => e.id !== id));
  };

  const approveBooking = (bookingId: string, adminMessage?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const updated: Booking = {
            ...b,
            status: "Approved",
            adminNotes: adminMessage || "Your trip plan has been approved by the Boundless Souls team!",
            adminResponseDate: new Date().toISOString(),
          };
          const textMsg = adminMessage || `Your trip request for ${b.destinations.join(", ")} has been APPROVED. We have sent full confirmation details to your email (${b.email}).`;

          sendAdminNotification(
            b.userId || b.email,
            "Trip Plan Approved! 🎉",
            textMsg,
            "approval",
            b.id,
            b.email
          );

          sendDispatchedEmail({
            toEmail: b.email,
            toName: b.clientName,
            userId: b.userId,
            subject: `[Boundless Souls] Official Approval: ${b.destinations.join(", ")} Trip Request`,
            body: `Dear ${b.clientName},\n\nGreat news! Your trip plan request (#${b.id}) has been APPROVED by the Boundless Souls team.\n\nAdmin Message:\n"${adminMessage || "Your trip details and permits have been locked in."}"\n\nTrip Summary:\n• Destinations: ${b.destinations.join(", ")}\n• Dates: ${b.dateRange}\n• Travelers: ${b.travelers}\n• Selected Services: ${b.services.join(", ") || "Standard Concierge"}\n\nPlease check your traveler dashboard for your itinerary details.\n\nWarm regards,\nBoundless Souls Concierge Team\ninfo@boundlesssouls.com`,
            templateType: "approval",
            bookingId: b.id,
          });

          return updated;
        }
        return b;
      })
    );
  };

  const declineBooking = (bookingId: string, reasonMessage?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const updated: Booking = {
            ...b,
            status: "Declined",
            adminNotes: reasonMessage || "Unfortunately, we are unable to confirm this trip for the selected dates.",
            adminResponseDate: new Date().toISOString(),
          };
          const textMsg = reasonMessage || `Your trip request for ${b.destinations.join(", ")} could not be confirmed for the selected dates. Check your email (${b.email}) for details.`;

          sendAdminNotification(
            b.userId || b.email,
            "Trip Plan Update ℹ️",
            textMsg,
            "decline",
            b.id,
            b.email
          );

          sendDispatchedEmail({
            toEmail: b.email,
            toName: b.clientName,
            userId: b.userId,
            subject: `[Boundless Souls] Important Update: ${b.destinations.join(", ")} Trip Request`,
            body: `Dear ${b.clientName},\n\nThank you for choosing Boundless Souls Tours.\n\nRegarding your trip request (#${b.id}) for ${b.destinations.join(", ")}, we are currently unable to confirm booking for your selected dates (${b.dateRange}).\n\nReason / Admin Message:\n"${reasonMessage || "Permits or lodging unavailable for these dates. Please request alternative dates."}"\n\nPlease check your dashboard or reply to adjust dates.\n\nSincerely,\nBoundless Souls Concierge Team\ninfo@boundlesssouls.com`,
            templateType: "decline",
            bookingId: b.id,
          });

          return updated;
        }
        return b;
      })
    );
  };

  const addContact = (contactData: Omit<ContactMessage, "id" | "createdAt" | "status">) => {
    const newContact: ContactMessage = {
      ...contactData,
      id: `ct-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: "Unread",
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const updateContactStatus = (id: string, status: ContactMessage["status"]) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const replyToContact = (contactId: string, replyMessage: string) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === contactId) {
          sendAdminNotification(
            c.userId || c.email,
            `Reply regarding: ${c.subject}`,
            replyMessage,
            "message",
            undefined,
            c.email
          );

          sendDispatchedEmail({
            toEmail: c.email,
            toName: c.name,
            userId: c.userId,
            subject: `[Boundless Souls] Response: ${c.subject}`,
            body: `Dear ${c.name},\n\nThank you for reaching out to Boundless Souls Tours.\n\nIn response to your inquiry ("${c.message}"):\n\n"${replyMessage}"\n\nIf you have any further questions, feel free to reply directly to this email.\n\nWarm regards,\nBoundless Souls Team`,
            templateType: "reply",
          });

          return { ...c, status: "Responded", adminReply: replyMessage };
        }
        return c;
      })
    );
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const addExperience = (expData: Omit<ExperienceItemData, "id">) => {
    const newExp: ExperienceItemData = {
      ...expData,
      id: expData.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    };
    setExperiences((prev) => [newExp, ...prev]);
  };

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const addService = (serviceData: Omit<ServiceItemData, "id">) => {
    const newService: ServiceItemData = {
      ...serviceData,
      id: serviceData.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    };
    setServices((prev) => [newService, ...prev]);
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        bookings,
        addBooking,
        deleteBooking,
        updateBookingStatus,
        approveBooking,
        declineBooking,
        contacts,
        addContact,
        deleteContact,
        updateContactStatus,
        replyToContact,
        notifications,
        sendAdminNotification,
        markNotificationRead,
        dispatchedEmails,
        sendDispatchedEmail,
        deleteDispatchedEmail,
        experiences,
        addExperience,
        deleteExperience,
        services,
        addService,
        deleteService,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

