import React from "react";

const devColors = [
    "white",
    "green",
    "black",
    "green-light",
    "gray",
    "white-soft",
    "lime-glow",
    "green-strong",
    "green-medium",
    "green-vivid",
    "green-muted",
    "white-frost",
    "green-fog",
    "dark-gray",
];

const DevPage = () => {
    return (
        <section className="page-dev bg--gray ui-kit">
            <div className="container page-dev__container">
                <div className="row page-dev__row">
                    <div className="col-12">
                        <h1 className="title--1 color--black">Dev Typography and Colors</h1>
                    </div>
                </div>

                <div className="row page-dev__row">
                    <div className="col-12 page-dev__card page-dev__card--dark bg--black">
                        <div className="title title--1 color--white">title--1</div>
                        <div className="title title--2 color--green-light">title--2</div>
                        <div className="title title--3 color--white-soft">title--3</div>
                        <div className="title title--4 color--white">title--4</div>
                        <div className="title title--5 color--white-frost">title--5</div>
                        <div className="title title--6 color--green-medium">title--6</div>
                    </div>
                </div>

                <div className="row page-dev__row">
                    <div className="col-12 page-dev__card bg--white">
                        <p className="text text--1 color--black">text--1 Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        <p className="text text--2 color--gray">text--2 Quisque faucibus, sem in facilisis sollicitudin, libero neque cursus justo</p>
                        <p className="text text--3 color--green">text--3 Integer vitae augue at ipsum tincidunt cursus</p>
                    </div>
                </div>

                <div className="row page-dev__row">
                    <div className="col-12 page-dev__card bg--green-fog">
                        <h2 className="color--black">HTML Elements (base styles)</h2>
                        <h3 className="color--black">Heading h3</h3>
                        <h4 className="color--black">Heading h4</h4>
                        <h5 className="color--black">Heading h5</h5>
                        <h6 className="color--black">Heading h6</h6>
                        <p className="color--black">Test paragraph with <b>bold b</b> and <strong>bold strong</strong></p>
                        <span className="color--black">Test span</span>
                        <a className="color--green page-dev__inline-link" href="#">Test link</a>
                    </div>
                </div>

                <div className="row page-dev__row">
                    <div className="col-12 page-dev__card page-dev__card--dark bg--black">
                        <h3 className="title--3 color--green">Inputs</h3>

                        <div className="page-dev__form-grid">
                            <input type="text" placeholder="Name and surname" />
                            <input type="email" placeholder="Email address" />
                            <textarea placeholder="Message content"></textarea>
                        </div>

                        <div className="page-dev__check-row">
                            <input type="checkbox" id="dev-accept" />
                            <label htmlFor="dev-accept" className="color--green">By sending this message you accept lorem ipsum</label>
                        </div>

                        <div className="page-dev__submit-row">
                            <input type="submit" value="Send message" />
                        </div>
                    </div>
                </div>

                <div className="row page-dev__row">
                    <div className="col-12 page-dev__card bg--white">
                        <h3 className="title--3 color--black">Buttons</h3>
                        <div className="page-dev__btn-row">
                            <a href="#" className="btn btn--primary">btn btn--primary</a>
                            <a href="#" className="btn btn--secondary">btn btn--secondary</a>
                            <a href="#" className="btn btn--tertiary">btn btn--tertiary</a>
                        </div>
                    </div>
                </div>

                <div className="row page-dev__row">
                    <div className="col-12">
                        <h3 className="title--3 color--black">Color preview</h3>
                        <div className="row page-dev__palette-row">
                            {devColors.map((devColor) => (
                                <div key={devColor} className="col-6 col-md-3 col-lg-2">
                                    <div className="page-dev__palette-item">
                                        <div className={`page-dev__swatch bg--${devColor}`}></div>
                                        <span className="text--3 color--black">bg--{devColor}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevPage;