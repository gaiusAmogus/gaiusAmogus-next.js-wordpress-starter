import { getPageBySlug, getAllPageSlugs } from "../../lib/wordpress";
import NotFound from "../../src/js/pages/NotFound/NotFound";
import WpPage from "../../src/js/pages/WpPage/WpPage";

export async function generateStaticParams() {
    const slugs = await getAllPageSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);
    if (!page) return {};
    return {
        title: page.title?.rendered,
        description: page.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() || "",
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);
    if (!page) return <NotFound />;
    return <WpPage page={page} />;
}
