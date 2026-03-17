"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/jobs", label: "Find Jobs" },
    { href: "/companies", label: "Companies" },
    { href: "/categories", label: "Categories" },
  ];

  const mobileNavigation = (
    <div className="flex flex-col gap-2 py-4">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      <div className="border-t pt-4 mt-4">
        <Link href="/login" onClick={() => setIsOpen(false)}>
          <Button variant="ghost" className="w-full justify-start">
            Login
          </Button>
        </Link>
        <Link href="/register" onClick={() => setIsOpen(false)}>
          <Button className="w-full mt-2 bg-primary hover:bg-primary/90">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">iJ</span>
            </div>
            <span className="hidden sm:inline">iJob</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon */}
            <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:flex">
              <Search className="w-5 h-5 text-foreground" />
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:flex relative">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/login?role=seeker" className="cursor-pointer">
                      Login as Job Seeker
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/login?role=employer"
                      className="cursor-pointer"
                    >
                      Login as Employer
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="px-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                {mobileNavigation}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
