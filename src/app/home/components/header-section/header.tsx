"use client";
import React from "react";
import Navigation from "./navigation/navigation";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <Navigation />
    </header>
  );
}

export default Header;

