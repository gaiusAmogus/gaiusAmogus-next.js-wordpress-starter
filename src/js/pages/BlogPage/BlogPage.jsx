import React from "react";
import Link from "next/link";
import Image from "next/image";

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function getFeaturedImageUrl(post) {
    return (
        post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null
    );
}

const PostCard = ({ post }) => {
    const imageUrl = getFeaturedImageUrl(post);
    return (
        <article className="post-card">
            {imageUrl && (
                <Link href={`/blog/${post.slug}`} className="post-card__image-link">
                    <Image
                        src={imageUrl}
                        alt={post.title?.rendered || ""}
                        width={800}
                        height={450}
                        className="post-card__image"
                    />
                </Link>
            )}
            <div className="post-card__body">
                <time className="post-card__date" dateTime={post.date}>
                    {formatDate(post.date)}
                </time>
                <h2 className="post-card__title title--3">
                    <Link
                        href={`/blog/${post.slug}`}
                        dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
                    />
                </h2>
                <div
                    className="post-card__excerpt text--2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
                />
                <Link href={`/blog/${post.slug}`} className="btn btn--primary post-card__more">
                    Czytaj dalej
                </Link>
            </div>
        </article>
    );
};

const BlogPage = ({ posts = [], currentPage = 1, totalPages = 1 }) => {
    return (
        <section className="page-blog">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="page-blog__title title--1">Blog</h1>
                    </div>
                </div>

                <div className="row page-blog__grid">
                    {posts.length === 0 ? (
                        <div className="col-12">
                            <p className="text--2">Brak wpisów.</p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="col-12 col-md-6 col-lg-4">
                                <PostCard post={post} />
                            </div>
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="row">
                        <div className="col-12">
                            <nav className="page-blog__pagination" aria-label="Paginacja bloga">
                                {currentPage > 1 && (
                                    <Link
                                        href={`/blog?page=${currentPage - 1}`}
                                        className="btn btn--secondary"
                                    >
                                        &larr; Poprzednia
                                    </Link>
                                )}
                                <span className="page-blog__page-info text--2">
                                    Strona {currentPage} z {totalPages}
                                </span>
                                {currentPage < totalPages && (
                                    <Link
                                        href={`/blog?page=${currentPage + 1}`}
                                        className="btn btn--secondary"
                                    >
                                        Następna &rarr;
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogPage;
