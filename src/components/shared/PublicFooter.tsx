"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

export default function PublicFooter() {
  const [email, setEmail] = React.useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background mt-20">
      {/* Newsletter Section */}
      <div className="bg-primary/5">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Get Latest Job Updates
              </h3>
              <p className="text-muted-foreground">
                Receive new job postings directly in your inbox
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="w-full md:w-auto flex gap-2"
            >
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-w-64"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">iJ</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                iJob Bangladesh
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Bangladesh&#39;s leading online job portal. Connect with millions
              of job seekers and employers.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground hover:text-primary"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground hover:text-primary"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              For Job Seekers
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/seeker/profile"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/seeker/saved"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/seeker/applications"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  My Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/seeker/alerts"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Job Alerts
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              For Employers
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/employer/jobs/new"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/company"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Company Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/applications"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/employer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/settings"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="p-3 bg-primary/10 rounded-lg h-fit">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Phone</h5>
                <p className="text-sm text-muted-foreground">
                  +880 1700-000000
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-primary/10 rounded-lg h-fit">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Email</h5>
                <p className="text-sm text-muted-foreground">support@ijob.bd</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-primary/10 rounded-lg h-fit">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Location</h5>
                <p className="text-sm text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} iJob Bangladesh. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
