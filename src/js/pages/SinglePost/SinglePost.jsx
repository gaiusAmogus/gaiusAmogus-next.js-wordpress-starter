import React from "react";
import Image from "next/image";
import Link from "next/link";

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

function getFeaturedImageAlt(post) {
    return (
        post?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
        post.title?.rendered ||
        ""
    );
}

const SinglePost = ({ post }) => {
    const imageUrl = getFeaturedImageUrl(post);

    return (
        <article className="page-single-post">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">

                        <Link href="/blog" className="page-single-post__back text--2">
                            &larr; Wróć do bloga
                        </Link>

                        <header className="page-single-post__header">
                            <time
                                className="page-single-post__date text--2"
                                dateTime={post.date}
                            >
                                {formatDate(post.date)}
                            </time>
                            <h1
                                className="page-single-post__title title--1"
                                dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
                            />
                        </header>

                        {imageUrl && (
                            <div className="page-single-post__featured-image">
                                <Image
                                    src={imageUrl}
                                    alt={getFeaturedImageAlt(post)}
                                    width={1200}
                                    height={630}
                                    priority
                                    className="d-block w-100"
                                />
                            </div>
                        )}

                        <div
                            className="page-single-post__content wp-content"
                            dangerouslySetInnerHTML={{ __html: post.content?.rendered }}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SinglePost;
