import React from "react";
import Link from "next/link";

const NotFound = () => {
    return (
        <section className="page-404">
            <h1>404</h1>
            <p>Page not found.</p>
            <Link href="/">Go back to the homepage</Link>
        </section>
    );
};

export default NotFound;
