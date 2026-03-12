import React from "react";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p className="main-footer__text text-center mb-0">
                            &copy; {new Date().getFullYear()} <a href="https://github.com/gaiusAmogus/webpack_react_gaius_amogus.git">Webpack React Gaius Amogus</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
