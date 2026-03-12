import { getPosts } from "../../../lib/wordpress";
import BlogPage from "../../../src/js/pages/BlogPage/BlogPage";

export const metadata = {
    title: "Blog",
    description: "",
};

export default async function Blog({ searchParams }) {
    const { page = "1" } = await searchParams;
    const currentPage = Math.max(1, Number(page));
    const posts = await getPosts({ perPage: 10, page: currentPage });

    return (
        <BlogPage
            posts={posts}
            currentPage={currentPage}
            totalPages={posts._paginationMeta?.totalPages ?? 1}
        />
    );
}
