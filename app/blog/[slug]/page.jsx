import { getPostBySlug, getAllPostSlugs } from "../../../../lib/wordpress";
import NotFound from "../../../../src/js/pages/NotFound/NotFound";
import SinglePost from "../../../../src/js/pages/SinglePost/SinglePost";

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};
    return {
        title: post.title?.rendered,
        description: post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() || "",
    };
}

export default async function PostPage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return <NotFound />;
    return <SinglePost post={post} />;
}
