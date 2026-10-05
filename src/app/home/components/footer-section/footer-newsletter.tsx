"use client";

import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function FooterNewsLetter() {
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-800/60 p-8 rounded-3xl border border-slate-700/60 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
              <Image
                src="/icon/envelope-icon.svg"
                width={40}
                height={40}
                alt="envelope"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Your Travel Journey Starts Here
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Sign up and we&apos;ll send the best deals directly to your inbox
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full lg:w-auto items-center gap-3"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full lg:w-80 rounded-full border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus-visible:ring-blue-600"
            />
            <Button
              type="submit"
              variant="brand"
              className="h-12 rounded-full px-8 font-semibold shadow-lg shadow-blue-600/30 shrink-0"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FooterNewsLetter;
