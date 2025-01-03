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
    title: "Pomodoro Timer : Boostez Votre Productivité en Toute Simplicité",
    description:
        "Gérez votre temps efficacement avec notre application Pomodoro Timer. Technique de travail intelligente, sessions chronométrées et pauses optimales pour maximiser votre concentration.",
    keywords: ["Pomodoro Timer", "Time Management", "Productivity Tool", "Work Timer", "Break Timer"],
    authors: [{ name: "Paul Jeanroy", url: "https://paul-jeanroy.fr" }],
    openGraph: {
        title: "Pomodoro Timer : Boostez Votre Productivité en Toute Simplicité",
        description:
            "Gérez votre temps efficacement avec notre application Pomodoro Timer. Technique de travail intelligente, sessions chronométrées et pauses optimales pour maximiser votre concentration.",
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
        title: "Pomodoro Timer : Boostez Votre Productivité en Toute Simplicité",
        description:
            "Gérez votre temps efficacement avec notre application Pomodoro Timer. Technique de travail intelligente, sessions chronométrées et pauses optimales pour maximiser votre concentration.",
        images: ["/pomodoro.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://pomodoro.paul-jeanroy.fr",
    },
    icons: {
        icon: "/pomodoro.webp",
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
