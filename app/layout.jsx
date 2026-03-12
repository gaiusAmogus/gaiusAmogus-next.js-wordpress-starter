import "../src/scss/style.scss";
import Header from "../src/js/components/Header/Header";
import Footer from "../src/js/components/Footer/Footer";
import { getSiteInfo, getMenuItems } from "../lib/wordpress";

export async function generateMetadata() {
    try {
        const siteInfo = await getSiteInfo();
        return {
            title: {
                default: siteInfo?.name ?? "WordPress Site",
                template: `%s | ${siteInfo?.name ?? "WordPress Site"}`,
            },
            description: siteInfo?.description ?? "",
        };
    } catch {
        return { title: "WordPress Site", description: "" };
    }
}

export default async function RootLayout({ children }) {
    let menuItems = [];
    try {
        menuItems = await getMenuItems();
    } catch {
        // WordPress unreachable — render without nav items
    }

    return (
        <html lang="pl">
            <body>
                <Header menuItems={menuItems} />
                <main className="main-content">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
