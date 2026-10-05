import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";

function FooterCopyright() {
  return (
    <div className="border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-400">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <p>© {new Date().getFullYear()} Boundless Souls Tours. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="#" className="hover:text-white transition-colors">
              Site Map
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-900 p-2 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FaFacebookF className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-900 p-2 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FaTwitter className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-900 p-2 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FaInstagram className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-900 p-2 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FaLinkedinIn className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FooterCopyright;
