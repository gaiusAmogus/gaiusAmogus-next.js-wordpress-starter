import React from "react";
import Link from "next/link";
import Image from "next/image";

function getFeaturedImageUrl(post) {
    return post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

const Home = ({ latestPosts = [] }) => {
    return (
        <section className="page-home">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Hello world!</h1>
                    </div>
                </div>

                {latestPosts.length > 0 && (
                    <div className="row">
                        <div className="col-12">
                            <h2 className="title--2">Najnowsze wpisy</h2>
                        </div>
                        {latestPosts.map((post) => {
                            const imageUrl = getFeaturedImageUrl(post);
                            return (
                                <div key={post.id} className="col-12 col-md-4">
                                    <article>
                                        {imageUrl && (
                                            <Link href={`/blog/${post.slug}`}>
                                                <Image
                                                    src={imageUrl}
                                                    alt={post.title?.rendered || ""}
                                                    width={600}
                                                    height={340}
                                                    style={{ width: "100%", height: "auto" }}
                                                />
                                            </Link>
                                        )}
                                        <h3 className="title--4">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
                                            />
                                        </h3>
                                    </article>
                                </div>
                            );
                        })}
                        <div className="col-12">
                            <Link href="/blog" className="btn btn--primary">
                                Zobacz wszystkie wpisy
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
