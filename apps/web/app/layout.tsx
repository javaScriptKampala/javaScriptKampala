import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/Layout";
import type { NavItem, FooterData } from "@/components/Layout";
import { Providers } from "@/components/Providers";
import { getNavigation, getFooter } from "@/lib/cms";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "JavaScript Kampala",
  description: "The premier engineering collective in Uganda.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

async function getCmsLayoutData(): Promise<{
  navItems?: NavItem[];
  footerData?: FooterData;
}> {
  try {
    const [nav, footer] = await Promise.all([getNavigation(), getFooter()]);

    const navItems: NavItem[] | undefined = nav?.items?.map(
      (item: { label: string; url: string; isCta?: boolean }) => ({
        name: item.label,
        path: item.url,
        isCta: item.isCta ?? false,
      })
    );

    const socialObj: FooterData['socialLinks'] = {};
    if (footer?.socialLinks) {
      for (const link of footer.socialLinks) {
        if (link.platform === 'twitter') socialObj.twitter = link.url;
        if (link.platform === 'github') socialObj.github = link.url;
        if (link.platform === 'linkedin') socialObj.linkedin = link.url;
      }
    }

    const footerData: FooterData | undefined = footer
      ? {
          socialLinks: socialObj,
          nextEventDate: footer.nextEventCallout?.enabled
            ? footer.nextEventCallout.heading ?? undefined
            : undefined,
          copyright: footer.copyright ?? undefined,
        }
      : undefined;

    return { navItems, footerData };
  } catch {
    return {};
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navItems, footerData } = await getCmsLayoutData();

  return (
    <html lang="en" className={`${figtree.variable} dark`} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-js-black`}
      >
        <Providers>
          <Layout navItems={navItems} footerData={footerData}>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
