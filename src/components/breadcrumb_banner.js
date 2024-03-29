"use client";

import React from "react";
import Link from "next/link";
import bg_img from "../../assets/img/vouchers1.png";

class Breadcrumb_banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { page, title, bg, text } = this.props;
    page = page || text;

    return (
      <section
        className="page-title bg-cover"
        style={{
          backgroundImage: `url(${bg_img.src})`,
          backgroundRepeat: "no-repeat",
        }}
        data-overlay="8"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="breadcrumbs-wrap">
                <h1 className="breadcrumb-title text-light">{title || page}</h1>
                <nav className="transparent">
                  <ol className="breadcrumb p-0">
                    <li className="breadcrumb-item">
                      <Link href="/" className="text-light">
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item text-light"
                      aria-current="page"
                      style={{ textTransform: "capitalize" }}
                    >
                      {page}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Breadcrumb_banner;
