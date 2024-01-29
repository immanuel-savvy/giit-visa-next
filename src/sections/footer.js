"use client";

import React from "react";
import Link from "next/link";
import Loadindicator from "../components/loadindicator";
import Socials from "../components/socials";
import { post_request } from "@/assets/js/utils/services";
import { email_regex, scroll_to_top } from "@/assets/js/utils/functions";
import { organisation_name } from "@/assets/js/utils/constants";

let navs = new Array("Scoring", "Visas", "Experts", "FAQS");

const save_to_session = (key, value) =>
  window.sessionStorage.setItem(key, JSON.stringify(value));

const get_session = (key) => {
  let value = window.sessionStorage.getItem(key);

  try {
    value = JSON.parse(value);
  } catch (e) {}

  return value;
};

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { total_length: 1 };
  }

  componentDidMount = async () => {};

  set_email_subscription = ({ target }) =>
    this.setState({ email: target.value });

  subscribe_newsletter = async () => {
    let { email, subscribing } = this.state;
    if (!email || (email && !email_regex.test(email)) || subscribing) return;

    this.setState({ subscribing: true });

    await post_request("subscribe_newsletter", { email });
    this.setState({ subscribing: false, subscribed: true });
  };

  render() {
    let { lock } = this.props;
    let { subscribing, subscribed, email } = this.state;

    return (
      <span>
        <footer
          className="dark-footer skin-dark-footer style-2"
          style={{ backgroundColor: "#000" }}
        >
          {lock ? null : (
            <div className="footer-middle">
              <Socials />
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 col-md-5">
                    <div className="footer_widget">
                      <Link href="/">
                        {/* <img
                          onClick={scroll_to_top}
                          src={`${domain}/Images/giit_africa_logo_white.png`}
                          className="img-footer small mb-2"
                          alt=""
                        /> */}
                        <h3 className="text-light">GIIT Visa</h3>
                      </Link>
                      <h6 className="extream text-light mb-3">Nigeria</h6>

                      <hr />

                      <h4 className="extream mb-3">
                        Do you need help with
                        <br />
                        anything?
                      </h4>
                      <p>
                        Receive updates, hot deals, tutorials, discounts sent
                        straight in your inbox every week
                      </p>
                      <div className="foot-news-last">
                        <div className="input-group">
                          <input
                            type="text"
                            value={email}
                            disabled={!!subscribed}
                            className="form-control"
                            placeholder="Email Address"
                            onChange={this.set_email_subscription}
                          />
                          <div className="input-group-append">
                            {subscribing ? (
                              <Loadindicator />
                            ) : (
                              <button
                                type="button"
                                onClick={this.subscribe_newsletter}
                                className="input-group-text theme-bg b-0 text-light"
                              >
                                Subscribe
                              </button>
                            )}
                          </div>
                        </div>
                        {subscribed ? (
                          <p>Email subscribed to newsletter!</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-7 ml-auto">
                    <div className="row">
                      <div className="col-lg-4 col-md-4">
                        <div className="footer_widget">
                          <h4 className="widget_title">Useful Links</h4>
                          <ul className="footer-menu">
                            {navs.map((nav) =>
                              nav === "developer" ? null : (
                                <li
                                  className={`text-light`}
                                  key={nav}
                                  onClick={scroll_to_top}
                                >
                                  <Link
                                    href={`/${nav
                                      .replace(/ /g, "")
                                      .toLowerCase()}`}
                                  >
                                    {nav || "home"}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="footer_widget">
                          <h4 className="widget_title">Company</h4>
                          <ul className="footer-menu">
                            <li>
                              <Link href={`/about`}>About</Link>
                            </li>
                            <li>
                              <Link href={`/contact`}>Contact</Link>
                            </li>
                            <li>
                              <Link href={`/testimonials`}>Testimonials</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="footer-bottom" style={{ backgroundColor: "#000" }}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12 text-center">
                  <p className="mb-0">
                    © {new Date().getFullYear()} {organisation_name}. All rights
                    reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <a id="back2Top" className="top-scroll" title="Back to top" href="#">
            <i className="ti-arrow-up"></i>
          </a>
        </footer>
      </span>
    );
  }
}

export default Footer;
export { save_to_session, scroll_to_top, get_session };
