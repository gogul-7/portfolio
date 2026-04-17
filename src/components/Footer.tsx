"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            GK<span className="text-primary">.</span>
          </Link>
          
          <div className="text-sm text-secondary/60">
            © {currentYear} Gogul Krishna. All rights reserved. Built with Next.js & Framer Motion.
          </div>

          <div className="flex items-center gap-8">
             <Link href="#" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
