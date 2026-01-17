"use client"
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";
import { useWebsiteSettings } from "@/components/providers/website-settings-provider";

export function Footer() {
  const { settings } = useWebsiteSettings();
  const websiteName = settings?.websiteName || "MaoMao";

  return (
    <footer className=" bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={settings?.logoUrl || "/logo.svg"} alt={`${websiteName} Logo`} className="w-8 h-8" />
              </div>
              <span 
                className="font-display font-bold text-xl inline-block text-transparent bg-clip-text"
                style={{
                  backgroundImage: settings?.primaryColor ? `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor || settings.primaryColor})` : "linear-gradient(to right, #ea580c, #fdba74)"
                }}
              >
                {websiteName}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              {settings?.footerText || "Nonton drama pendek gratis."}
            </p>
          </div>

          {/* Navigation */}
          {/* <div>
            <h3 className="font-semibold text-foreground mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/terbaru" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terbaru
                </Link>
              </li>
              <li>
                <Link href="/terpopuler" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terpopuler
                </Link>
              </li>
              <li>
                <Link href="/sulih-suara" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sulih Suara
                </Link>
              </li>
            </ul>
          </div> */}

          <div>
            {/* <h3 className="font-semibold text-foreground mb-4">Lainnya</h3> */}
            <ul className="space-y-2 text-sm">
              {/* <li>
                <a 
                  href="https://lynk.id/sansekai/mxd6j2ezmxoe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Beli Source Code API
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li> */}
              {/* <li>
                <span className="text-muted-foreground">Kontak</span>
              </li>
              <li>
                <span className="text-muted-foreground">Kebijakan Privasi</span>
              </li>
              <li>
                <span className="text-muted-foreground">Syarat & Ketentuan</span>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border/50 mt-8 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
