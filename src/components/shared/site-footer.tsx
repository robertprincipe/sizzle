import Logo from "@/assets/images/android-chrome-192x192.png";
import { InstagramIcon } from "lucide-react";
import { TwitterIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SiteFooter() {
  return (
    <footer className="py-6 border-t shadow border-t-border">
      <div className="flex flex-col-reverse items-stretch container gap-5 pb-6 md:flex-row md:justify-between">
        <div className="flex flex-col justify-between md:max-w-lg">
          <div className="flex items-center justify-between h-full mb-6 md:flex-col md:items-start md:mb-0">
            <div className="flex flex-col gap-4">
              <h2 className="flex items-center space-x-2 text-2xl font-bold md:text-3xl leading-[1]">
                <img src={Logo} className="w-8" />
                <span className="text-lg font-bold">Garden</span>
              </h2>
              <p className="text-muted-foreground">
                Your one-stop shop for the tech, business, and finance news you
                need to know each week.
              </p>
              <div className="flex items-center w-full gap-2">
                <Input placeholder="Enter email address..." />
                <Button>Enviar</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-xs text-muted-foreground">
              <p className="mb-2">
                © 2023 Attentive, a product of Attentive Mobile, Inc.
              </p>
              <p>
                221 River Street, Suite 9047, Hoboken, NJ, 07030
                <a href="mailto:info@attentive.com">info@attentive.com</a>
              </p>
            </div>
            <ul className="flex flex-wrap text-sm gap-x-4 gap-y-1">
              <li>Sitemap</li>
              <li>Security</li>
              <li>Privacy Policy</li>
              <li>Cookie Notice</li>
              <li>California Notice</li>
              <li>Terms of Use</li>
              <li>Content Policy</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:flex">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h3 className="font-medium">Products</h3>
              <ul className="text-sm gap-y-1.5 grid">
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Why Attentive
                </li>
              </ul>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-medium">Email</h3>
              <ul className="text-sm gap-y-1.5 grid">
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Email
                </li>
              </ul>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-medium">List Management</h3>
              <ul className="text-sm gap-y-1.5 grid">
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Growth
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Audience Manager
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Analytics
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Attentive AI™
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Marketplace
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Compliance
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Client Strategy
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="space-y-1.5">
              <h3 className="font-medium">Resources</h3>
              <ul className="text-sm gap-y-1.5 grid">
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Blog
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Texts We Love
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Guides
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Webinars
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Case Studies
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Help Center
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Revenue Calculator
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="space-y-1.5">
              <h3 className="font-medium">Partners</h3>
              <ul className="text-sm gap-y-1.5 grid">
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Partner With Attentive
                </li>
                <li className="transition-colors text-muted-foreground hover:text-foreground">
                  Browse Partners
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-border">
        <div className="flex items-center justify-between container py-6">
          <span className="text-sm text-muted-foreground">
            ©2023 Pipe Technologies Inc. All rights reserved.
          </span>
          <div className="flex items-center space-x-2">
            <TwitterIcon />
            <InstagramIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
