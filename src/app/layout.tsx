import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { K2D } from "next/font/google";

const k2d = K2D({
    subsets: ["latin"],
    variable: "--font-k2d",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pomodoro Timer | Boost Your Productivity",
    description:
        "The ultimate Pomodoro Timer to improve your productivity. Set work sessions, take breaks, and manage your time effectively.",
    keywords: ["Pomodoro Timer", "Time Management", "Productivity Tool", "Work Timer", "Break Timer"],
    authors: [{ name: "Paul Jeanroy", url: "https://paul-jeanroy.fr" }],
    openGraph: {
        title: "Pomodoro Timer | Boost Your Productivity",
        description:
            "The ultimate Pomodoro Timer to improve your productivity. Set work sessions, take breaks, and manage your time effectively.",
        url: "https://pomodoro.paul-jeanroy.fr",
        images: [
            {
                url: "/pomodoro.webp",
                width: 1200,
                height: 630,
                alt: "Pomodoro Timer Image",
            },
        ],
        siteName: "Pomodoro Timer",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pomodoro Timer | Boost Your Productivity",
        description:
            "The ultimate Pomodoro Timer to improve your productivity. Set work sessions, take breaks, and manage your time effectively.",
        images: ["/pomodoro.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://pomodoro.paul-jeanroy.fr",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} ${k2d.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
