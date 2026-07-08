import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import i18n, {
    defaultLocale,
    isSupportedLocale,
    localeNames,
    supportedLocales,
    type Locale,
    type PageId,
} from "./i18n";

type Screenshot = {
    src: string;
    title: string;
    caption: string;
};

type ScreenshotCopy = {
    title: string;
    caption: string;
};

type InfoSection = {
    title: string;
    body: string;
};

type AssetModule = {
    default: string;
};

type ScreenshotAssetDefinition = {
    loadSrc: () => Promise<string>;
};

type RouteState = {
    locale: Locale;
    page: PageId;
};

const supportEmail = "yuzhen23@icloud.com";

const loadAsset = (loader: () => Promise<AssetModule>) => loader().then((module) => module.default);

const screenshotAssetDefinitions: ScreenshotAssetDefinition[] = [
    {
        loadSrc: () => loadAsset(() => import("./assets/TeslaCamViewer-1440x900.webp")),
    },
    {
        loadSrc: () => loadAsset(() => import("./assets/TeslaCamViewer-1440x900-2.webp")),
    },
    {
        loadSrc: () => loadAsset(() => import("./assets/TeslaCamViewer-1440x900-3.webp")),
    },
    {
        loadSrc: () => loadAsset(() => import("./assets/TeslaCamViewer-1440x900-4.webp")),
    },
    {
        loadSrc: () => loadAsset(() => import("./assets/TeslaCamViewer-1440x900-5.webp")),
    },
];

const loadDemoVideo = () => loadAsset(() => import("./assets/demo.mp4"));

const isVideoFullyBuffered = (video: HTMLVideoElement) => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return false;
    }

    for (let index = 0; index < video.buffered.length; index += 1) {
        if (video.buffered.start(index) <= 0.25 && video.buffered.end(index) >= video.duration - 0.25) {
            return true;
        }
    }

    return false;
};

const parseRoute = (pathname: string): RouteState => {
    const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
    const locale = isSupportedLocale(segments[0]) ? segments[0] : defaultLocale;
    const pageSegment = locale === defaultLocale && segments[0] !== defaultLocale ? segments[0] : segments[1];

    if (pageSegment === "support" || pageSegment === "privacy") {
        return { locale, page: pageSegment };
    }

    return { locale, page: "marketing" };
};

const localizedPath = (locale: Locale, page: PageId) => {
    const pagePath = page === "marketing" ? "" : `/${page}`;

    if (locale === defaultLocale) {
        return pagePath || "/";
    }

    return pagePath ? `/${locale}${pagePath}` : `/${locale}/`;
};

const localizedHomePath = (locale: Locale) => localizedPath(locale, "marketing");

const absoluteUrl = (path: string) => `${window.location.origin}${path}`;

const setManagedLink = (rel: string, href: string) => {
    let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][data-i18n-managed="true"]`);

    if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        link.dataset.i18nManaged = "true";
        document.head.appendChild(link);
    }

    link.href = href;
};

const usePageMetadata = (locale: Locale, page: PageId) => {
    const { t } = useTranslation();

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = "ltr";
        document.title = t(`meta.${page}.title`);

        const description = t(`meta.${page}.description`);
        let descriptionMeta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');

        if (!descriptionMeta) {
            descriptionMeta = document.createElement("meta");
            descriptionMeta.name = "description";
            document.head.appendChild(descriptionMeta);
        }

        descriptionMeta.content = description;
        setManagedLink("canonical", absoluteUrl(localizedPath(locale, page)));

        document.head
            .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][data-i18n-managed="true"]')
            .forEach((link) => link.remove());

        supportedLocales.forEach((alternateLocale) => {
            const link = document.createElement("link");
            link.rel = "alternate";
            link.hreflang = alternateLocale;
            link.href = absoluteUrl(localizedPath(alternateLocale, page));
            link.dataset.i18nManaged = "true";
            document.head.appendChild(link);
        });

        const defaultLink = document.createElement("link");
        defaultLink.rel = "alternate";
        defaultLink.hreflang = "x-default";
        defaultLink.href = absoluteUrl(localizedPath(defaultLocale, page));
        defaultLink.dataset.i18nManaged = "true";
        document.head.appendChild(defaultLink);
    }, [locale, page, t]);
};

const App = () => {
    const route = useMemo(() => parseRoute(window.location.pathname), []);

    useEffect(() => {
        if (i18n.language !== route.locale) {
            void i18n.changeLanguage(route.locale);
        }
    }, [route.locale]);

    usePageMetadata(route.locale, route.page);

    if (route.page === "support") {
        return <SupportPage locale={route.locale} page={route.page} />;
    }

    if (route.page === "privacy") {
        return <PrivacyPage locale={route.locale} page={route.page} />;
    }

    return <MarketingPage locale={route.locale} page={route.page} />;
};

const MarketingPage = ({ locale, page }: RouteState) => {
    const { t } = useTranslation();
    const [screenshotSources, setScreenshotSources] = useState<string[]>([]);
    const [demoVideoSrc, setDemoVideoSrc] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDemoVideoReady, setIsDemoVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const screenshotCopy = t("screenshots.items", { returnObjects: true }) as ScreenshotCopy[];
    const screenshots: Screenshot[] = screenshotSources.map((src, index) => ({
        src,
        title: screenshotCopy[index]?.title ?? "",
        caption: screenshotCopy[index]?.caption ?? "",
    }));
    const activeScreenshot = screenshots[activeIndex];
    const features = t("marketing.features", { returnObjects: true }) as string[];

    useEffect(() => {
        let isMounted = true;

        const loadMedia = async () => {
            const [loadedScreenshots, loadedDemoVideo] = await Promise.all([
                Promise.all(screenshotAssetDefinitions.map(({ loadSrc }) => loadSrc())),
                loadDemoVideo(),
            ]);

            if (isMounted) {
                setScreenshotSources(loadedScreenshots);
                setDemoVideoSrc(loadedDemoVideo);
            }
        };

        void loadMedia();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (activeIndex >= screenshots.length) {
            setActiveIndex(0);
        }
    }, [activeIndex, screenshots.length]);

    useEffect(() => {
        if (screenshots.length <= 1) {
            return undefined;
        }

        const rotationTimer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % screenshots.length);
        }, 3000);

        return () => window.clearInterval(rotationTimer);
    }, [screenshots.length]);

    useEffect(() => {
        setIsDemoVideoReady(false);
    }, [demoVideoSrc]);

    const autoplayDemoVideo = () => {
        const video = videoRef.current;

        if (!video || !isVideoFullyBuffered(video)) {
            return;
        }

        setIsDemoVideoReady(true);
        void video.play().catch(() => {
            setIsDemoVideoReady(false);
        });
    };

    const nextScreenshot = () => {
        if (screenshots.length === 0) {
            return;
        }

        setActiveIndex((currentIndex) => (currentIndex + 1) % screenshots.length);
    };

    const previousScreenshot = () => {
        if (screenshots.length === 0) {
            return;
        }

        setActiveIndex((currentIndex) => (currentIndex - 1 + screenshots.length) % screenshots.length);
    };

    return (
        <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
            <SiteHeader locale={locale} page={page} />

            <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-12 pt-5 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-red-600">{t("marketing.eyebrow")}</p>
                    <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
                        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                            {t("marketing.headline")}
                        </h1>
                        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{t("marketing.intro")}</p>
                    </div>
                </div>

                <section aria-label={t("screenshots.ariaLabel")} className="relative">
                    <div className="overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
                        <div className="aspect-[16/10] w-full bg-slate-950">
                            {activeScreenshot ? (
                                <img
                                    src={activeScreenshot.src}
                                    alt={t("screenshots.imageAlt", { title: activeScreenshot.title })}
                                    className="h-full w-full object-contain"
                                    decoding="async"
                                />
                            ) : (
                                <div
                                    className="h-full w-full animate-pulse bg-slate-900"
                                    aria-label={t("shared.loadingScreenshot")}
                                />
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        title={t("screenshots.previous")}
                        aria-label={t("screenshots.previous")}
                        onClick={previousScreenshot}
                        className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/90 text-3xl text-slate-900 shadow-lg ring-1 ring-slate-200 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 sm:-left-4"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        title={t("screenshots.next")}
                        aria-label={t("screenshots.next")}
                        onClick={nextScreenshot}
                        className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/90 text-3xl text-slate-900 shadow-lg ring-1 ring-slate-200 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 sm:-right-4"
                    >
                        ›
                    </button>

                    <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-950">
                                {activeScreenshot?.title || t("shared.loading")}
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                {activeScreenshot?.caption || t("shared.preparingScreenshots")}
                            </p>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {screenshots.map((screenshot, index) => (
                                <button
                                    type="button"
                                    key={`${screenshot.title}-${index}`}
                                    title={screenshot.title}
                                    aria-label={t("screenshots.show", { title: screenshot.title })}
                                    aria-pressed={activeIndex === index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-16 w-24 shrink-0 border bg-slate-950 p-1 transition focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                        activeIndex === index
                                            ? "border-red-500 shadow-md shadow-red-100"
                                            : "border-slate-200 hover:border-slate-400"
                                    }`}
                                >
                                    <img
                                        src={screenshot.src}
                                        alt=""
                                        className="h-full w-full object-contain"
                                        decoding="async"
                                        loading="lazy"
                                    />
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
                    <p className="text-sm font-semibold text-emerald-700">{t("marketing.demoEyebrow")}</p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                        {t("marketing.demoTitle")}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">{t("marketing.demoBody")}</p>
                </div>
                <div className="overflow-hidden border border-slate-200 bg-slate-950 shadow-xl shadow-slate-200">
                    {demoVideoSrc ? (
                        <video
                            ref={videoRef}
                            src={demoVideoSrc}
                            className="h-auto w-full"
                            controls
                            muted
                            playsInline
                            preload="auto"
                            onLoadedMetadata={autoplayDemoVideo}
                            onProgress={autoplayDemoVideo}
                            onCanPlayThrough={autoplayDemoVideo}
                            onSuspend={autoplayDemoVideo}
                            aria-busy={!isDemoVideoReady}
                        />
                    ) : (
                        <div className="aspect-video w-full animate-pulse bg-slate-900" aria-label={t("shared.loadingVideo")} />
                    )}
                </div>
            </section>

            <section className="bg-slate-950 text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
                    <div>
                        <h2 className="text-3xl font-semibold">{t("marketing.ctaTitle")}</h2>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t("marketing.ctaBody")}</p>
                    </div>
                    <a
                        href={localizedPath(locale, "support")}
                        className="inline-flex min-h-12 items-center justify-center border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        {t("nav.support")}
                    </a>
                </div>
            </section>

            <SiteFooter locale={locale} />
        </main>
    );
};

const SupportPage = ({ locale, page }: RouteState) => {
    const { t } = useTranslation();
    const troubleshooting = t("support.troubleshooting", { returnObjects: true }) as string[];
    const supportDetails = t("support.details", { returnObjects: true }) as string[];

    return (
        <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
            <SiteHeader locale={locale} page={page} />

            <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold text-red-600">{t("support.eyebrow")}</p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{t("support.title")}</h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{t("support.intro")}</p>
            </section>

            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <InfoPanel title={t("support.troubleshootingTitle")}>
                        <ul className="space-y-3 text-sm leading-6 text-slate-600">
                            {troubleshooting.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </InfoPanel>
                    <InfoPanel title={t("support.detailsTitle")}>
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
                    <p className="text-sm font-semibold text-slate-950">{t("shared.contact")}</p>
                    <a
                        href={`mailto:${supportEmail}`}
                        className="mt-3 inline-block break-all text-lg font-semibold text-red-600 underline decoration-red-200 underline-offset-4 hover:text-red-700"
                    >
                        {supportEmail}
                    </a>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{t("shared.affiliation")}</p>
                </div>
            </section>

            <SiteFooter locale={locale} />
        </main>
    );
};

const PrivacyPage = ({ locale, page }: RouteState) => {
    const { t } = useTranslation();
    const privacySections = t("privacy.sections", { returnObjects: true }) as InfoSection[];

    return (
        <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
            <SiteHeader locale={locale} page={page} />

            <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold text-red-600">{t("privacy.eyebrow")}</p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{t("privacy.title")}</h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{t("privacy.intro")}</p>
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
                    <p className="text-sm font-semibold text-slate-950">{t("shared.contact")}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {t("privacy.contactPrefix")}{" "}
                        <a
                            href={`mailto:${supportEmail}`}
                            className="break-all font-semibold text-red-600 underline decoration-red-200 underline-offset-4 hover:text-red-700"
                        >
                            {supportEmail}
                        </a>
                        .
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{t("shared.affiliation")}</p>
                </div>
            </section>

            <SiteFooter locale={locale} />
        </main>
    );
};

const InfoPanel = ({ title, children }: { title: string; children: ReactNode }) => (
    <article className="border border-slate-200 bg-[#fbfcfe] p-6">
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
        <div className="mt-5">{children}</div>
    </article>
);

const SiteHeader = ({ locale, page }: RouteState) => {
    const { t } = useTranslation();

    const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = event.target.value;

        if (isSupportedLocale(nextLocale)) {
            window.location.href = localizedPath(nextLocale, page);
        }
    };

    return (
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <nav className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <a href={localizedHomePath(locale)} className="text-base font-semibold text-slate-950">
                    {t("shared.brand")}
                </a>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 sm:gap-5">
                    <a href={`${localizedHomePath(locale)}#demo`} className="transition hover:text-slate-950">
                        {t("nav.demo")}
                    </a>
                    <a href={localizedPath(locale, "support")} className="transition hover:text-slate-950">
                        {t("nav.support")}
                    </a>
                    <a href={localizedPath(locale, "privacy")} className="transition hover:text-slate-950">
                        {t("nav.privacy")}
                    </a>
                    <label className="sr-only" htmlFor="language-switcher">
                        {t("nav.languageLabel")}
                    </label>
                    <select
                        id="language-switcher"
                        value={locale}
                        onChange={handleLocaleChange}
                        className="max-w-full border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        {supportedLocales.map((supportedLocale) => (
                            <option key={supportedLocale} value={supportedLocale}>
                                {localeNames[supportedLocale]}
                            </option>
                        ))}
                    </select>
                </div>
            </nav>
        </header>
    );
};

const SiteFooter = ({ locale }: { locale: Locale }) => {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <p>{t("footer.copyright")}</p>
                <div className="flex flex-wrap gap-5">
                    <a href={localizedHomePath(locale)} className="hover:text-slate-950">
                        {t("footer.marketing")}
                    </a>
                    <a href={localizedPath(locale, "support")} className="hover:text-slate-950">
                        {t("footer.support")}
                    </a>
                    <a href={localizedPath(locale, "privacy")} className="hover:text-slate-950">
                        {t("footer.privacy")}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default App;
