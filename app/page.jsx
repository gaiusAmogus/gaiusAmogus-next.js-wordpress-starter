import { getPosts } from "../lib/wordpress";
import Home from "../src/js/pages/Home/Home";

export default async function Page() {
    const posts = await getPosts({ perPage: 3 });
    return <Home latestPosts={posts} />;
}
