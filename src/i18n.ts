import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const supportedLocales = ["en", "zh-CN", "ja", "es"] as const;

export type Locale = (typeof supportedLocales)[number];
export type PageId = "marketing" | "support" | "privacy";

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
    en: "English",
    "zh-CN": "简体中文",
    ja: "日本語",
    es: "Español",
};

export const isSupportedLocale = (value: string | undefined): value is Locale =>
    supportedLocales.includes(value as Locale);

const getInitialLocale = (): Locale => {
    if (typeof window === "undefined") {
        return defaultLocale;
    }

    const firstPathSegment = window.location.pathname.split("/").filter(Boolean)[0];
    return isSupportedLocale(firstPathSegment) ? firstPathSegment : defaultLocale;
};

const resources = {
    en: {
        translation: {
            meta: {
                marketing: {
                    title: "TeslaCamViewer",
                    description:
                        "TeslaCamViewer is a macOS app for reviewing TeslaCam and Sentry footage with multi-camera playback, event browsing, trimming, and map context.",
                },
                support: {
                    title: "TeslaCamViewer Support",
                    description:
                        "Find support information and troubleshooting steps for the TeslaCamViewer macOS app.",
                },
                privacy: {
                    title: "TeslaCamViewer Privacy Policy",
                    description: "TeslaCamViewer privacy policy for the macOS app.",
                },
            },
            nav: {
                demo: "Demo",
                support: "Support",
                privacy: "Privacy",
                languageLabel: "Language",
            },
            footer: {
                copyright: "© 2026 Eugene Wang",
                marketing: "Marketing",
                support: "Support",
                privacy: "Privacy",
            },
            shared: {
                brand: "TeslaCamViewer",
                affiliation: "TeslaCamViewer is an independent macOS app and is not affiliated with Tesla, Inc.",
                contact: "Contact",
                loading: "Loading",
                loadingScreenshot: "Loading screenshot",
                preparingScreenshots: "Preparing screenshots.",
                loadingVideo: "Loading demo video",
            },
            screenshots: {
                ariaLabel: "TeslaCamViewer screenshots",
                imageAlt: "TeslaCamViewer {{title}} screenshot",
                previous: "Previous screenshot",
                next: "Next screenshot",
                show: "Show {{title}} screenshot",
                items: [
                    {
                        title: "Playback",
                        caption: "Scrub a drive, jump to key moments, and switch camera angles quickly.",
                    },
                    {
                        title: "Events",
                        caption: "Browse SavedClips, SentryClips, and RecentClips in one macOS window.",
                    },
                    {
                        title: "Grid View",
                        caption: "Review front, rear, side, and pillar cameras together without losing context.",
                    },
                    {
                        title: "Timeline",
                        caption: "Set in and out points for the segment you want to keep.",
                    },
                    {
                        title: "Map",
                        caption: "Keep location context beside the footage when GPS data is available.",
                    },
                ],
            },
            marketing: {
                eyebrow: "macOS TeslaCam review",
                headline: "TeslaCamViewer",
                intro:
                    "Review TeslaCam and Sentry footage on your Mac with synchronized camera views, event browsing, timeline selection, and location context.",
                features: [
                    "Multi-camera TeslaCam playback",
                    "Saved, Sentry, and Recent clip browsing",
                    "Timeline selection for export workflows",
                    "Map context for recorded drives",
                ],
                demoEyebrow: "Demo",
                demoTitle: "Fast review for real driving footage.",
                demoBody:
                    "TeslaCamViewer keeps the footage front and center, with controls for switching views, checking events, selecting moments, and keeping map context nearby.",
                ctaTitle: "Built for macOS drivers who keep the receipts.",
                ctaBody:
                    "Keep review sessions simple: open the folder, find the event, inspect every angle, and move on with the clip that matters.",
            },
            support: {
                eyebrow: "Support",
                title: "TeslaCamViewer Support",
                intro: "Find quick fixes for common TeslaCamViewer issues, then send the details below if you still need help.",
                troubleshootingTitle: "Troubleshooting",
                troubleshooting: [
                    "Confirm your TeslaCam USB drive or copied folder still contains the TeslaCam directory structure.",
                    "If clips do not appear, try opening the parent folder that contains SavedClips, SentryClips, or RecentClips.",
                    "If playback is choppy, copy the footage to your Mac first and open the local folder.",
                    "For missing location data, check whether the clip includes GPS metadata from the vehicle.",
                ],
                detailsTitle: "Include in your message",
                details: [
                    "macOS version",
                    "TeslaCamViewer app version",
                    "A short description of what happened",
                    "Whether the issue affects SavedClips, SentryClips, RecentClips, or all folders",
                    "A screenshot or screen recording if it helps explain the issue",
                ],
            },
            privacy: {
                eyebrow: "Privacy Policy",
                title: "TeslaCamViewer Privacy Policy",
                intro: "Effective date: July 3, 2026. TeslaCamViewer is designed to review TeslaCam footage locally on your Mac.",
                contactPrefix: "For privacy questions, contact",
                sections: [
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
                ],
            },
        },
    },
    "zh-CN": {
        translation: {
            meta: {
                marketing: {
                    title: "TeslaCamViewer",
                    description: "TeslaCamViewer 是一款 macOS 应用，可用于查看 TeslaCam 和哨兵模式视频，支持多摄像头播放、事件浏览、片段选择和地图位置上下文。",
                },
                support: {
                    title: "TeslaCamViewer 支持",
                    description: "查看 TeslaCamViewer macOS 应用的支持信息和常见问题排查步骤。",
                },
                privacy: {
                    title: "TeslaCamViewer 隐私政策",
                    description: "TeslaCamViewer macOS 应用隐私政策。",
                },
            },
            nav: {
                demo: "演示",
                support: "支持",
                privacy: "隐私",
                languageLabel: "语言",
            },
            footer: {
                copyright: "© 2026 Eugene Wang",
                marketing: "首页",
                support: "支持",
                privacy: "隐私",
            },
            shared: {
                brand: "TeslaCamViewer",
                affiliation: "TeslaCamViewer 是一款独立的 macOS 应用，与 Tesla, Inc. 没有关联。",
                contact: "联系",
                loading: "正在加载",
                loadingScreenshot: "正在加载截图",
                preparingScreenshots: "正在准备截图。",
                loadingVideo: "正在加载演示视频",
            },
            screenshots: {
                ariaLabel: "TeslaCamViewer 截图",
                imageAlt: "TeslaCamViewer {{title}} 截图",
                previous: "上一张截图",
                next: "下一张截图",
                show: "显示 {{title}} 截图",
                items: [
                    {
                        title: "播放",
                        caption: "快速浏览行程、跳转到关键时刻，并迅速切换摄像头角度。",
                    },
                    {
                        title: "事件",
                        caption: "在一个 macOS 窗口中浏览 SavedClips、SentryClips 和 RecentClips。",
                    },
                    {
                        title: "网格视图",
                        caption: "同时查看前方、后方、侧方和立柱摄像头画面，保持完整上下文。",
                    },
                    {
                        title: "时间线",
                        caption: "设置要保留片段的起点和终点。",
                    },
                    {
                        title: "地图",
                        caption: "在视频旁保留位置上下文，前提是片段包含 GPS 数据。",
                    },
                ],
            },
            marketing: {
                eyebrow: "macOS TeslaCam 查看工具",
                headline: "TeslaCamViewer",
                intro: "在 Mac 上查看 TeslaCam 和哨兵模式视频，支持同步摄像头视图、事件浏览、时间线选择和位置上下文。",
                features: ["多摄像头 TeslaCam 播放", "浏览 Saved、Sentry 和 Recent 片段", "为导出流程选择时间线片段", "为录制行程保留地图上下文"],
                demoEyebrow: "演示",
                demoTitle: "快速查看真实行车视频。",
                demoBody: "TeslaCamViewer 让视频始终位于中心，同时提供视图切换、事件检查、片段选择和地图上下文控制。",
                ctaTitle: "为习惯保留证据的 macOS 车主打造。",
                ctaBody: "让查看过程保持简单：打开文件夹，找到事件，检查每个角度，然后带着重要片段继续前进。",
            },
            support: {
                eyebrow: "支持",
                title: "TeslaCamViewer 支持",
                intro: "先查看常见问题的快速修复方法；如果仍需要帮助，请发送下面的信息。",
                troubleshootingTitle: "故障排查",
                troubleshooting: [
                    "确认你的 TeslaCam USB 盘或复制的文件夹仍保留 TeslaCam 目录结构。",
                    "如果片段没有显示，请尝试打开包含 SavedClips、SentryClips 或 RecentClips 的上级文件夹。",
                    "如果播放卡顿，请先将视频复制到 Mac 本地，再打开本地文件夹。",
                    "如果缺少位置数据，请检查该片段是否包含车辆记录的 GPS 元数据。",
                ],
                detailsTitle: "请在邮件中包含",
                details: ["macOS 版本", "TeslaCamViewer 应用版本", "问题的简短描述", "问题影响 SavedClips、SentryClips、RecentClips，还是所有文件夹", "如果有助于说明问题，请附上截图或录屏"],
            },
            privacy: {
                eyebrow: "隐私政策",
                title: "TeslaCamViewer 隐私政策",
                intro: "生效日期：2026 年 7 月 3 日。TeslaCamViewer 旨在本地查看 Mac 上的 TeslaCam 视频。",
                contactPrefix: "如有隐私问题，请联系",
                sections: [
                    {
                        title: "数据收集",
                        body: "TeslaCamViewer 不收集、出售或共享个人数据。本应用不包含广告 SDK、第三方分析或跟踪技术。",
                    },
                    {
                        title: "TeslaCam 文件",
                        body: "视频文件、截图、GPS 元数据和其他 TeslaCam 内容都在你的 Mac 本地处理。你的视频不会上传到 TeslaCamViewer 服务器。",
                    },
                    {
                        title: "导出和分享",
                        body: "你导出、保存或分享的任何文件均由你控制。一旦你选择将文件发送到其他应用、服务或个人，TeslaCamViewer 无法控制之后的数据使用。",
                    },
                    {
                        title: "支持请求",
                        body: "如果你通过电子邮件联系支持，你选择提供的信息仅用于回复你的请求。除非排查问题确有必要，请避免发送敏感视频或个人信息。",
                    },
                    {
                        title: "变更",
                        body: "当 TeslaCamViewer 发生变化时，本政策可能会更新。最新版本将发布在此页面。",
                    },
                ],
            },
        },
    },
    ja: {
        translation: {
            meta: {
                marketing: {
                    title: "TeslaCamViewer",
                    description: "TeslaCamViewer は、マルチカメラ再生、イベント閲覧、範囲選択、地図コンテキストに対応した TeslaCam と Sentry 映像確認用の macOS アプリです。",
                },
                support: {
                    title: "TeslaCamViewer サポート",
                    description: "TeslaCamViewer macOS アプリのサポート情報とトラブルシューティング手順です。",
                },
                privacy: {
                    title: "TeslaCamViewer プライバシーポリシー",
                    description: "TeslaCamViewer macOS アプリのプライバシーポリシーです。",
                },
            },
            nav: {
                demo: "デモ",
                support: "サポート",
                privacy: "プライバシー",
                languageLabel: "言語",
            },
            footer: {
                copyright: "© 2026 Eugene Wang",
                marketing: "マーケティング",
                support: "サポート",
                privacy: "プライバシー",
            },
            shared: {
                brand: "TeslaCamViewer",
                affiliation: "TeslaCamViewer は独立した macOS アプリであり、Tesla, Inc. とは提携していません。",
                contact: "お問い合わせ",
                loading: "読み込み中",
                loadingScreenshot: "スクリーンショットを読み込み中",
                preparingScreenshots: "スクリーンショットを準備しています。",
                loadingVideo: "デモ動画を読み込み中",
            },
            screenshots: {
                ariaLabel: "TeslaCamViewer のスクリーンショット",
                imageAlt: "TeslaCamViewer {{title}} のスクリーンショット",
                previous: "前のスクリーンショット",
                next: "次のスクリーンショット",
                show: "{{title}} のスクリーンショットを表示",
                items: [
                    {
                        title: "再生",
                        caption: "走行映像をスクラブし、重要な場面へ移動して、カメラ角度を素早く切り替えます。",
                    },
                    {
                        title: "イベント",
                        caption: "SavedClips、SentryClips、RecentClips を 1 つの macOS ウィンドウで閲覧できます。",
                    },
                    {
                        title: "グリッド表示",
                        caption: "前方、後方、側方、ピラーのカメラ映像をまとめて確認できます。",
                    },
                    {
                        title: "タイムライン",
                        caption: "保存したい区間の開始点と終了点を指定できます。",
                    },
                    {
                        title: "地図",
                        caption: "GPS データがある場合、映像の横に位置情報のコンテキストを表示できます。",
                    },
                ],
            },
            marketing: {
                eyebrow: "macOS TeslaCam レビュー",
                headline: "TeslaCamViewer",
                intro: "Mac で TeslaCam と Sentry の映像を確認。同期したカメラ表示、イベント閲覧、タイムライン選択、位置情報コンテキストに対応しています。",
                features: ["複数カメラの TeslaCam 再生", "Saved、Sentry、Recent クリップの閲覧", "書き出し向けのタイムライン選択", "録画ドライブの地図コンテキスト"],
                demoEyebrow: "デモ",
                demoTitle: "実際の走行映像をすばやく確認。",
                demoBody: "TeslaCamViewer は映像を中心に据え、表示切り替え、イベント確認、場面選択、地図コンテキストの操作をまとめて行えます。",
                ctaTitle: "記録を残す macOS ドライバーのために。",
                ctaBody: "フォルダを開き、イベントを見つけ、すべての角度を確認し、必要なクリップだけを持って次へ進めます。",
            },
            support: {
                eyebrow: "サポート",
                title: "TeslaCamViewer サポート",
                intro: "よくある問題の解決方法を確認し、それでも解決しない場合は以下の情報をお送りください。",
                troubleshootingTitle: "トラブルシューティング",
                troubleshooting: [
                    "TeslaCam USB ドライブまたはコピーしたフォルダに TeslaCam のディレクトリ構造が残っていることを確認してください。",
                    "クリップが表示されない場合は、SavedClips、SentryClips、RecentClips を含む親フォルダを開いてみてください。",
                    "再生が途切れる場合は、映像を先に Mac にコピーし、ローカルフォルダを開いてください。",
                    "位置情報が表示されない場合は、クリップに車両の GPS メタデータが含まれているか確認してください。",
                ],
                detailsTitle: "メッセージに含める情報",
                details: ["macOS のバージョン", "TeslaCamViewer アプリのバージョン", "発生した問題の短い説明", "SavedClips、SentryClips、RecentClips、またはすべてのフォルダのどれに影響するか", "説明に役立つ場合はスクリーンショットまたは画面収録"],
            },
            privacy: {
                eyebrow: "プライバシーポリシー",
                title: "TeslaCamViewer プライバシーポリシー",
                intro: "施行日：2026年7月3日。TeslaCamViewer は、Mac 上で TeslaCam 映像をローカルに確認するためのアプリです。",
                contactPrefix: "プライバシーに関するお問い合わせは、こちらまでご連絡ください:",
                sections: [
                    {
                        title: "データ収集",
                        body: "TeslaCamViewer は個人データを収集、販売、共有しません。本アプリには広告 SDK、第三者分析、トラッキング技術は含まれていません。",
                    },
                    {
                        title: "TeslaCam ファイル",
                        body: "動画ファイル、スクリーンショット、GPS メタデータ、その他の TeslaCam コンテンツは Mac 上でローカルに処理されます。映像が TeslaCamViewer のサーバーにアップロードされることはありません。",
                    },
                    {
                        title: "書き出しと共有",
                        body: "書き出し、保存、共有したファイルはユーザー自身が管理します。他のアプリ、サービス、人物へ送信した後のデータについて、TeslaCamViewer は管理できません。",
                    },
                    {
                        title: "サポート依頼",
                        body: "メールでサポートに連絡する場合、提供された情報は返信のためだけに使用されます。問題調査に必要な場合を除き、機密性の高い映像や個人情報の送信は避けてください。",
                    },
                    {
                        title: "変更",
                        body: "TeslaCamViewer の変更に伴い、本ポリシーが更新される場合があります。最新版はこのページに掲載されます。",
                    },
                ],
            },
        },
    },
    es: {
        translation: {
            meta: {
                marketing: {
                    title: "TeslaCamViewer",
                    description: "TeslaCamViewer es una app para macOS para revisar videos de TeslaCam y Sentry con reproducción multicámara, navegación de eventos, selección de clips y contexto de mapa.",
                },
                support: {
                    title: "Soporte de TeslaCamViewer",
                    description: "Información de soporte y pasos de solución de problemas para la app TeslaCamViewer para macOS.",
                },
                privacy: {
                    title: "Política de privacidad de TeslaCamViewer",
                    description: "Política de privacidad de TeslaCamViewer para la app de macOS.",
                },
            },
            nav: {
                demo: "Demo",
                support: "Soporte",
                privacy: "Privacidad",
                languageLabel: "Idioma",
            },
            footer: {
                copyright: "© 2026 Eugene Wang",
                marketing: "Marketing",
                support: "Soporte",
                privacy: "Privacidad",
            },
            shared: {
                brand: "TeslaCamViewer",
                affiliation: "TeslaCamViewer es una app independiente para macOS y no está afiliada con Tesla, Inc.",
                contact: "Contacto",
                loading: "Cargando",
                loadingScreenshot: "Cargando captura de pantalla",
                preparingScreenshots: "Preparando capturas de pantalla.",
                loadingVideo: "Cargando video de demostración",
            },
            screenshots: {
                ariaLabel: "Capturas de pantalla de TeslaCamViewer",
                imageAlt: "Captura de pantalla de TeslaCamViewer {{title}}",
                previous: "Captura anterior",
                next: "Siguiente captura",
                show: "Mostrar captura de {{title}}",
                items: [
                    {
                        title: "Reproducción",
                        caption: "Recorre un trayecto, salta a momentos clave y cambia rápidamente entre ángulos de cámara.",
                    },
                    {
                        title: "Eventos",
                        caption: "Explora SavedClips, SentryClips y RecentClips en una sola ventana de macOS.",
                    },
                    {
                        title: "Vista en cuadrícula",
                        caption: "Revisa las cámaras frontal, trasera, laterales y de pilares sin perder contexto.",
                    },
                    {
                        title: "Línea de tiempo",
                        caption: "Define los puntos de entrada y salida del segmento que quieres conservar.",
                    },
                    {
                        title: "Mapa",
                        caption: "Mantén el contexto de ubicación junto al video cuando haya datos GPS disponibles.",
                    },
                ],
            },
            marketing: {
                eyebrow: "Revisión de TeslaCam en macOS",
                headline: "TeslaCamViewer",
                intro: "Revisa videos de TeslaCam y Sentry en tu Mac con vistas de cámara sincronizadas, navegación de eventos, selección en línea de tiempo y contexto de ubicación.",
                features: ["Reproducción TeslaCam multicámara", "Navegación de clips Saved, Sentry y Recent", "Selección en línea de tiempo para exportar", "Contexto de mapa para recorridos grabados"],
                demoEyebrow: "Demo",
                demoTitle: "Revisión rápida de videos reales de conducción.",
                demoBody: "TeslaCamViewer mantiene el video en el centro, con controles para cambiar vistas, revisar eventos, seleccionar momentos y conservar el contexto del mapa.",
                ctaTitle: "Creado para conductores de macOS que guardan evidencia.",
                ctaBody: "Mantén cada revisión simple: abre la carpeta, encuentra el evento, inspecciona cada ángulo y continúa con el clip importante.",
            },
            support: {
                eyebrow: "Soporte",
                title: "Soporte de TeslaCamViewer",
                intro: "Consulta soluciones rápidas para problemas comunes de TeslaCamViewer y envía los detalles siguientes si todavía necesitas ayuda.",
                troubleshootingTitle: "Solución de problemas",
                troubleshooting: [
                    "Confirma que tu unidad USB de TeslaCam o la carpeta copiada aún conserva la estructura de directorios de TeslaCam.",
                    "Si los clips no aparecen, intenta abrir la carpeta principal que contiene SavedClips, SentryClips o RecentClips.",
                    "Si la reproducción va lenta, copia primero los videos a tu Mac y abre la carpeta local.",
                    "Si faltan datos de ubicación, comprueba si el clip incluye metadatos GPS del vehículo.",
                ],
                detailsTitle: "Incluye en tu mensaje",
                details: ["Versión de macOS", "Versión de la app TeslaCamViewer", "Una breve descripción de lo ocurrido", "Si el problema afecta a SavedClips, SentryClips, RecentClips o todas las carpetas", "Una captura de pantalla o grabación de pantalla si ayuda a explicar el problema"],
            },
            privacy: {
                eyebrow: "Política de privacidad",
                title: "Política de privacidad de TeslaCamViewer",
                intro: "Fecha de entrada en vigor: 3 de julio de 2026. TeslaCamViewer está diseñado para revisar videos de TeslaCam localmente en tu Mac.",
                contactPrefix: "Para preguntas sobre privacidad, contacta a",
                sections: [
                    {
                        title: "Recopilación de datos",
                        body: "TeslaCamViewer no recopila, vende ni comparte datos personales. La app no incluye SDK de publicidad, análisis de terceros ni tecnologías de seguimiento.",
                    },
                    {
                        title: "Archivos de TeslaCam",
                        body: "Los archivos de video, capturas de pantalla, metadatos GPS y demás contenido de TeslaCam se procesan localmente en tu Mac. Tus videos no se suben a servidores de TeslaCamViewer.",
                    },
                    {
                        title: "Exportaciones y uso compartido",
                        body: "Todos los archivos que exportes, guardes o compartas están bajo tu control. TeslaCamViewer no puede controlar los datos después de que decidas enviarlos a otra app, servicio o persona.",
                    },
                    {
                        title: "Solicitudes de soporte",
                        body: "Si contactas al soporte por correo electrónico, la información que decidas incluir se usará solo para responder a tu solicitud. Evita enviar videos sensibles o información personal salvo que sea necesario para solucionar el problema.",
                    },
                    {
                        title: "Cambios",
                        body: "Esta política puede actualizarse cuando cambie TeslaCamViewer. La versión más reciente se publicará en esta página.",
                    },
                ],
            },
        },
    },
} as const;

void i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLocale(),
    fallbackLng: defaultLocale,
    interpolation: {
        escapeValue: false,
    },
    returnNull: false,
});

export default i18n;
