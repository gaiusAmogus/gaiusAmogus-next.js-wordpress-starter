import React from "react";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p className="main-footer__text text-center mb-0">
                            &copy; {new Date().getFullYear()} <a href="https://github.com/gaiusAmogus/gaiusAmogus-next.js-wordpress-starter">Gaius Amogus Next.js WordPress Starter</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
