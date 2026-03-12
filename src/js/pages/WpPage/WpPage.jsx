import React from "react";

const WpPage = ({ page }) => {
    return (
        <section className="page-wp">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <h1
                            className="page-wp__title title--1"
                            dangerouslySetInnerHTML={{ __html: page.title?.rendered }}
                        />
                        <div
                            className="page-wp__content wp-content"
                            dangerouslySetInnerHTML={{ __html: page.content?.rendered }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WpPage;
