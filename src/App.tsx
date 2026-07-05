import { useMemo, useState, type ReactNode } from "react";

import screenshotBrowser from "./assets/TeslaCamViewer-1440x900-2.webp";
import screenshotGrid from "./assets/TeslaCamViewer-1440x900-3.webp";
import screenshotTimeline from "./assets/TeslaCamViewer-1440x900-4.webp";
import screenshotMap from "./assets/TeslaCamViewer-1440x900-5.webp";
import screenshotPlayback from "./assets/TeslaCamViewer-1440x900.webp";
import demoVideo from "./assets/demo.mp4";

type Screenshot = {
    src: string;
    title: string;
    caption: string;
};

const screenshots: Screenshot[] = [
    {
        src: screenshotPlayback,
        title: "Playback",
        caption: "Scrub a drive, jump to key moments, and switch camera angles quickly.",
    },
    {
        src: screenshotBrowser,
        title: "Events",
        caption: "Browse SavedClips, SentryClips, and RecentClips in one macOS window.",
    },
    {
        src: screenshotGrid,
        title: "Grid View",
        caption: "Review front, rear, side, and pillar cameras together without losing context.",
    },
    {
        src: screenshotTimeline,
        title: "Timeline",
        caption: "Set in and out points for the segment you want to keep.",
    },
    {
        src: screenshotMap,
        title: "Map",
        caption: "Keep location context beside the footage when GPS data is available.",
    },
];

const features = [
    "Multi-camera TeslaCam playback",
    "Saved, Sentry, and Recent clip browsing",
    "Timeline selection for export workflows",
    "Map context for recorded drives",
];

const troubleshooting = [
    "Confirm your TeslaCam USB drive or copied folder still contains the TeslaCam directory structure.",
    "If clips do not appear, try opening the parent folder that contains SavedClips, SentryClips, or RecentClips.",
    "If playback is choppy, copy the footage to your Mac first and open the local folder.",
    "For missing location data, check whether the clip includes GPS metadata from the vehicle.",
];

const supportDetails = [
    "macOS version",
    "TeslaCamViewer app version",
    "A short description of what happened",
    "Whether the issue affects SavedClips, SentryClips, RecentClips, or all folders",
    "A screenshot or screen recording if it helps explain the issue",
];

const privacySections = [
    {
        title: "Data collection",
        body: "TeslaCamViewer does not collect, sell, or share personal data. The app does not include advertising SDKs, third-party analytics, or tracking technologies.",
    },
    {
        title: "TeslaCam files",
        body: "Video files, screenshots, GPS metadata, and other TeslaCam content are processed locally on your Mac. Your footage is not uploaded to TeslaCamViewer servers.",
    },
    {
        title: "Exports and sharing",
        body: "Any files you export, save, or share are controlled by you. TeslaCamViewer cannot control data after you choose to send it to another app, service, or person.",
    },
    {
        title: "Support requests",
        body: "If you contact support by email, the information you choose to include is used only to respond to your request. Avoid sending sensitive footage or personal information unless it is necessary for troubleshooting.",
    },
    {
        title: "Changes",
        body: "This policy may be updated when TeslaCamViewer changes. The latest version will be posted on this page.",
    },
];

const App = () => {
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

    if (currentPath === "/support") {
        return <SupportPage />;
    }

    if (currentPath === "/privacy") {
        return <PrivacyPage />;
    }

    return <MarketingPage />;
};

const MarketingPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeScreenshot = screenshots[activeIndex];

    const nextScreenshot = () => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % screenshots.length);
    };

    const previousScreenshot = () => {
        setActiveIndex((currentIndex) => (currentIndex - 1 + screenshots.length) % screenshots.length);
    };

    return (
        <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
            <SiteHeader />

            <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-12 pt-5 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold uppercase text-red-600">macOS TeslaCam review</p>
                    <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
                        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                            TeslaCamViewer
                        </h1>
                        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Review TeslaCam and Sentry footage on your Mac with synchronized camera views, event
                            browsing, timeline selection, and location context.
                        </p>
                    </div>
                </div>

                <section aria-label="TeslaCamViewer screenshots" className="relative">
                    <div className="overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
                        <div className="aspect-[16/10] w-full bg-slate-950">
                            <img
                                src={activeScreenshot.src}
                                alt={`TeslaCamViewer ${activeScreenshot.title} screenshot`}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        title="Previous screenshot"
                        aria-label="Previous screenshot"
                        onClick={previousScreenshot}
                        className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/90 text-3xl text-slate-900 shadow-lg ring-1 ring-slate-200 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 sm:-left-4"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        title="Next screenshot"
                        aria-label="Next screenshot"
                        onClick={nextScreenshot}
                        className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/90 text-3xl text-slate-900 shadow-lg ring-1 ring-slate-200 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 sm:-right-4"
                    >
                        ›
                    </button>

                    <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-950">{activeScreenshot.title}</h2>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{activeScreenshot.caption}</p>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {screenshots.map((screenshot, index) => (
                                <button
                                    type="button"
                                    key={screenshot.title}
                                    title={screenshot.title}
                                    aria-label={`Show ${screenshot.title} screenshot`}
                                    aria-pressed={activeIndex === index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-16 w-24 shrink-0 border bg-slate-950 p-1 transition focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                        activeIndex === index
                                            ? "border-red-500 shadow-md shadow-red-100"
                                            : "border-slate-200 hover:border-slate-400"
                                    }`}
                                >
                                    <img src={screenshot.src} alt="" className="h-full w-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </section>

            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
                    {features.map((feature) => (
                        <article key={feature} className="border border-slate-200 bg-[#fbfcfe] p-5">
                            <p className="text-sm font-semibold text-slate-950">{feature}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                id="demo"
                className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:items-center lg:px-8"
            >
                <div>
                    <p className="text-sm font-semibold uppercase text-emerald-700">Demo</p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                        Fast review for real driving footage.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                        TeslaCamViewer keeps the footage front and center, with controls for switching views, checking
                        events, selecting moments, and keeping map context nearby.
                    </p>
                </div>
                <div className="overflow-hidden border border-slate-200 bg-slate-950 shadow-xl shadow-slate-200">
                    <video src={demoVideo} className="h-auto w-full" controls playsInline preload="metadata" />
                </div>
            </section>

            <section className="bg-slate-950 text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
                    <div>
                        <h2 className="text-3xl font-semibold">Built for macOS drivers who keep the receipts.</h2>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                            Keep review sessions simple: open the folder, find the event, inspect every angle, and move
                            on with the clip that matters.
                        </p>
                    </div>
                    <a
                        href="/support"
                        className="inline-flex h-12 items-center justify-center border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        Support
                    </a>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
};

const SupportPage = () => {
    const supportEmail = "yuzhen23@icloud.com";
    const pageTitle = useMemo(() => "TeslaCamViewer Support", []);

    return (
        <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
            <SiteHeader />

            <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase text-red-600">Support</p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{pageTitle}</h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Find quick fixes for common TeslaCamViewer issues, then send the details below if you still need
                    help.
                </p>
            </section>

            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <InfoPanel title="Troubleshooting">
                        <ul className="space-y-3 text-sm leading-6 text-slate-600">
                            {troubleshooting.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </InfoPanel>
                    <InfoPanel title="Include in your message">
                        <ul className="space-y-3 text-sm leading-6 text-slate-600">
                            {supportDetails.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </InfoPanel>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
                    <p className="text-sm font-semibold text-slate-950">Contact</p>
                    <a
                        href={`mailto:${supportEmail}`}
                        className="mt-3 inline-block text-lg font-semibold text-red-600 underline decoration-red-200 underline-offset-4 hover:text-red-700"
                    >
                        {supportEmail}
                    </a>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                        TeslaCamViewer is an independent macOS app and is not affiliated with Tesla, Inc.
                    </p>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
};

const PrivacyPage = () => {
    const supportEmail = "yuzhen23@icloud.com";

    return (
        <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
            <SiteHeader />

            <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase text-red-600">Privacy Policy</p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">TeslaCamViewer Privacy Policy</h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Effective date: July 3, 2026. TeslaCamViewer is designed to review TeslaCam footage locally on your
                    Mac.
                </p>
            </section>

            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
                    {privacySections.map((section) => (
                        <InfoPanel key={section.title} title={section.title}>
                            <p className="text-sm leading-6 text-slate-600">{section.body}</p>
                        </InfoPanel>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
                    <p className="text-sm font-semibold text-slate-950">Contact</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        For privacy questions, contact{" "}
                        <a
                            href={`mailto:${supportEmail}`}
                            className="font-semibold text-red-600 underline decoration-red-200 underline-offset-4 hover:text-red-700"
                        >
                            {supportEmail}
                        </a>
                        .
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                        TeslaCamViewer is an independent macOS app and is not affiliated with Tesla, Inc.
                    </p>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
};

const InfoPanel = ({ title, children }: { title: string; children: ReactNode }) => (
    <article className="border border-slate-200 bg-[#fbfcfe] p-6">
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
        <div className="mt-5">{children}</div>
    </article>
);

const SiteHeader = () => (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="text-base font-semibold text-slate-950">
                TeslaCamViewer
            </a>
            <div className="flex items-center gap-5 text-sm font-medium text-slate-600">
                <a href="/#demo" className="transition hover:text-slate-950">
                    Demo
                </a>
                <a href="/support" className="transition hover:text-slate-950">
                    Support
                </a>
                <a href="/privacy" className="transition hover:text-slate-950">
                    Privacy
                </a>
            </div>
        </nav>
    </header>
);

const SiteFooter = () => (
    <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>© 2026 Eugene Wang</p>
            <div className="flex gap-5">
                <a href="/" className="hover:text-slate-950">
                    Marketing
                </a>
                <a href="/support" className="hover:text-slate-950">
                    Support
                </a>
                <a href="/privacy" className="hover:text-slate-950">
                    Privacy
                </a>
            </div>
        </div>
    </footer>
);

export default App;
