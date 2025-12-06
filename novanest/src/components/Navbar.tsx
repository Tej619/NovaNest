"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
const { data: authUser } = useGetAuthUserQuery();
const router = useRouter();
const pathname = usePathname();

const isDashboardPage =
  pathname.includes("/managers") || pathname.includes("/tenants");

const handleSignOut = async () => {
  await signOut();
  window.location.href = "/";
};

// working UI
const [chatOpen, setChatOpen] = useState(false);
const [chatInput, setChatInput] = useState("");
const [chatMessages, setChatMessages] = useState<string[]>([]);
const [loading, setLoading] = useState(false);

// const handleChatSubmit = async () => {
//   if (!chatInput.trim()) return;
//   setLoading(true);
//   setChatMessages((prev) => [...prev, `You: ${chatInput}`]);

//   try {
//     const res = await fetch(CHAT_API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: chatInput }),
//     });
//     const data = await res.json();
//     setChatMessages((prev) => [
//       ...prev,
//       `Bot: ${data.response || JSON.stringify(data)}`,
//     ]);
//   } catch (err) {
//     setChatMessages((prev) => [...prev, "Bot: Error connecting to API"]);
//     console.error(err);
//   } finally {
//     setLoading(false);
//     setChatInput("");
//   }
// };

const getRealEstateReply = (userInput: string): string => {
const msg = userInput.toLowerCase();

// Greetings
if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
  return "Welcome to Novanest! 👋 Looking for a home, rental, or something near a specific school?";
}

// School-based searches
if (msg.includes("school") || msg.includes("near school") || msg.includes("close to school")) {
  return (
    "Here are some rental options near local schools:\n\n" +
    "🏫 **Near Fordson High School (0.2–0.8 miles)**\n" +
    "• *Freda Street Apartments* — $850/mo, 1 Bed, 0.2 miles walk\n" +
    "• *Calhoun Duplex* — $1300/mo, 2 Bed, 0.4 miles, quiet block\n" +
    "• *Reuter Street Home* — $1050/mo, 3 Bed, 0.6 miles, family-friendly\n\n" +
    "🏫 **Near Lowrey School (0.3–1.0 miles)**\n" +
    "• *Holly Court Studios* — $750/mo, newly renovated\n" +
    "• *Greenfield Lofts* — $1200/mo, 2 Bed, close to bus lines\n\n" +
    "Want me to filter by price, bedrooms, or exact distance from a school?"
  );
}

// Dearborn-specific
if (msg.includes("dearborn")) {
  return (
    "Here are some top rentals in **Dearborn** right now:\n\n" +
    "🏠 **Huron River Rentals** — $795/mo, Studio/1 Bed, safe neighborhood\n" +
    "🏠 **Calhoun Street Duplex** — $1300/mo, 2 Bed Upper, near Fordson HS\n" +
    "🏠 **Reuter Street Home** — $1050/mo, 3 Bed House, quiet street\n\n" +
    "I can narrow these by school distance, price, or number of bedrooms!"
  );
}

// Apartments / renting
if (msg.includes("rent") || msg.includes("apartment") || msg.includes("house")) {
  return (
    "Sure! Here’s what I can find:\n\n" +
    "🏘️ *Budget Options (Under $900)*\n" +
    "• Huron River Rentals — $795/mo, Studio\n" +
    "• Holly Court — $750/mo, renovated units\n\n" +
    "🏡 *Family Homes*\n" +
    "• Reuter Street Home — $1050/mo, 3 Beds\n" +
    "• Monroe Park House — $1250/mo, 3 Beds + backyard\n\n" +
    "Tell me your **city, price range, or school**, and I’ll refine results!"
  );
}

// Price / budget
if (msg.includes("price") || msg.includes("budget") || msg.includes("$")) {
  return (
    "Got it! What is your budget?\n\n" +
    "Here are quick categories:\n" +
    "💲 **Under $900/mo** → Studios & 1 Beds (Huron River, Holly Court)\n" +
    "💲 **$900–$1200** → 1–2 Beds (Greenfield Lofts, Calhoun Duplex)\n" +
    "💲 **$1200+** → 2–3 Beds family homes (Monroe Park House, Reuter Street)\n\n" +
    "Tell me your exact range and preferred neighborhood!"
  );
}

// Help / general
if (msg.includes("help") || msg.includes("info")) {
  return (
    "I can help you find:\n" +
    "• Apartments near schools 🏫\n" +
    "• Rentals by price range 💲\n" +
    "• Homes by number of bedrooms 🛏️\n" +
    "• Safe family neighborhoods 🏡\n\n" +
    "Just tell me what you're looking for!"
  );
}

// Default fallback
return "I’m here to help with rentals and real estate. Tell me a city, school, or price range!";
};


const handleChatSubmit = async () => {
if (!chatInput.trim()) return;

setLoading(true);
setChatMessages((prev) => [...prev, `You: ${chatInput}`]);

const botReply = getRealEstateReply(chatInput);

setChatMessages((prev) => [...prev, `Bot: ${botReply}`]);

setChatInput("");
setLoading(false);
};



return (
  <div
    className="fixed top-0 left-0 w-full z-50 shadow-xl"
    style={{ height: `${NAVBAR_HEIGHT}px` }}
  >
    <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
      <div className="flex items-center gap-4 md:gap-6">
        {isDashboardPage && (
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
        )}
        <Link
          href="/"
          className="cursor-pointer hover:!text-primary-300"
          scroll={false}
        >
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold">
              NOVA
              <span className="text-secondary-500 font-light hover:!text-primary-300">
                NEST
              </span>
            </div>
          </div>
        </Link>
        {isDashboardPage && authUser && (
          <Button
            variant="secondary"
            className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50"
            onClick={() =>
              router.push(
                authUser.userRole?.toLowerCase() === "manager"
                  ? "/managers/newproperty"
                  : "/search"
              )
            }
          >
            {authUser.userRole?.toLowerCase() === "manager" ? (
              <>
                <Plus className="h-4 w-4" />
                <span className="hidden md:block ml-2">Add New Property</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span className="hidden md:block ml-2">
                  Search Properties
                </span>
              </>
            )}
          </Button>
        )}
      </div>
      {!isDashboardPage && (
        <p className="text-primary-200 hidden md:block">
          Smart Real Estate Platform
        </p>
      )}
      <div className="flex items-center gap-5">
        {authUser ? (
          <>
            {/* <div className="relative hidden md:block">
              <MessageCircle className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
            </div>
            <div className="relative hidden md:block">
              <Bell className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
            </div> */}

{/* working UI */}
<div className="relative hidden md:block">
            <MessageCircle
              className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400"
              onClick={() => setChatOpen((prev) => !prev)}
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>

            {chatOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg p-4 flex flex-col h-96 overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="mb-1">
                      {msg}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border rounded px-2 py-1 text-black"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleChatSubmit()
                    }
                    placeholder="Type a message..."
                  />
                  <Button
                    onClick={handleChatSubmit}
                    disabled={loading}
                    className="bg-primary-700 text-white"
                  >
                    {loading ? "..." : "Send"}
                  </Button>
                </div>
              </div>
            )}
          </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                <Avatar>
                  <AvatarImage src={authUser.userInfo?.image} />
                  <AvatarFallback className="bg-primary-600">
                    {authUser.userRole?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-primary-200 hidden md:block">
                  {authUser.userInfo?.name}
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-primary-700">
                <DropdownMenuItem
                  className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold"
                  onClick={() =>
                    router.push(
                      authUser.userRole?.toLowerCase() === "manager"
                        ? "/managers/properties"
                        : "/tenants/favorites",
                      { scroll: false }
                    )
                  }
                >
                  Go to Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-primary-200" />
                <DropdownMenuItem
                  className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100"
                  onClick={() =>
                    router.push(
                      `/${authUser.userRole?.toLowerCase()}s/settings`,
                      { scroll: false }
                    )
                  }
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100"
                  onClick={handleSignOut}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/signin">
              <Button
                variant="outline"
                className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="secondary"
                className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
);
};

export default Navbar;
