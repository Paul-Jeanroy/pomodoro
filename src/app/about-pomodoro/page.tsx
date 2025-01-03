import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
    title: "À propos du Pomodoro Timer | Boostez votre productivité",
    description:
        "Découvrez comment le Pomodoro Timer peut transformer votre gestion du temps et maximiser votre productivité. En savoir plus sur cette méthode de travail efficace.",
    keywords: ["Pomodoro Timer", "Productivité", "Gestion du temps", "Travail efficace", "Technique Pomodoro"],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://pomodoro.paul-jeanroy.fr/about-pomodoro",
    },
};

export default function AboutPomodoro() {
    return (
        <main className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-zinc-900 to-black text-white/90 p-6 sm:p-10 md:p-20 h-screen w-screen flex flex-col items-center">
            <header className="relative w-full max-w-4xl mx-auto">
                <Link href="/">
                    <div className="absolute top-0 left-0 p-4" aria-label="Retour à l'accueil">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </div>
                </Link>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center mt-8">
                    À propos du Pomodoro Timer
                </h1>
            </header>

            <article className="max-w-4xl mx-auto h-full flex flex-col justify-around mt-8">
                <section>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                        Pourquoi utiliser le Pomodoro Timer ?
                    </h2>
                    <p className="text-sm sm:text-md md:text-lg mb-4">
                        La méthode Pomodoro est une technique de gestion du temps qui divise votre journée en sessions
                        de travail de 25 minutes suivies de courtes pauses. Elle vous aide à :
                    </p>
                    <ul className="list-disc list-inside text-sm sm:text-md md:text-lg gap-1 flex flex-col">
                        <li>📈 Augmenter votre productivité</li>
                        <li>📉 Réduire la fatigue mentale</li>
                        <li>🧠 Concentrer vos efforts sur vos priorités</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                        Fonctionnalités clés de notre Timer
                    </h2>
                    <p className="text-sm sm:text-md md:text-lg mb-4">
                        Notre application Pomodoro Timer vous propose une expérience simplifiée avec des fonctionnalités
                        modernes :
                    </p>
                    <ul className="list-disc list-inside text-sm sm:text-md md:text-lg gap-1 flex flex-col">
                        <li>🔧 Modes personnalisables : travail, courtes pauses, longues pauses</li>
                        <li>🎨 Design intuitif et élégant</li>
                        <li>🔔 Alertes sonores pour signaler la fin des sessions</li>
                        <li>🕒 Possibilité de prolonger le temps de travail si nécessaire</li>
                    </ul>
                </section>
            </article>

            <footer className="w-full text-center mt-10">
                <p className="text-xs sm:text-sm text-white/70">
                    © {new Date().getFullYear()} Pomodoro Timer by{" "}
                    <Link
                        href="https://paul-jeanroy.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Paul Jeanroy
                    </Link>
                    . Tous droits réservés.
                </p>
            </footer>
        </main>
    );
}
