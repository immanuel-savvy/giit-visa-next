"use client";

import React from "react";
import Nav from "./nav";
import { navs as navs_data } from "@/app/static_data";
import { get_request } from "@/assets/js/utils/services";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { entry } = this.props;
    if (!entry) {
      entry = await get_request("entry");
    }

    if (entry?.visa_types?.find((v) => v.page))
      navs_data[2].submenu = entry.visa_types.map(
        (v) => new Object({ title: v.title, path: `/c/${v.title}/${v._id}` })
      );

    if (entry?.countries?.length) {
      navs_data[3].submenu = entry.countries.slice(0, 10).map((c) => {
        return { title: c.name, path: `/c/${c.name}/${c._id}` };
      });
      navs_data[3].submenu = new Array(...navs_data[3].submenu, {
        title: "View all...",
        path: "/countries",
      });
    }

    this.setState({ navs_data });

    window.onscroll = (e) => {
      if (window.scrollY > 200) {
        document.querySelector(".header").classList.add("header-fixed");
        document.getElementById("top_info").style.display = "none";
      } else {
        document.querySelector(".header").classList.remove("header-fixed");
        document.getElementById("top_info").style.display = "block";
      }
    };
  };

  render() {
    let { page, lock, visa_types } = this.props;

    return (
      <div
        className={
          page === "home" || !page || true
            ? "header header-transparent dark-text my_header_style_init"
            : "header header-light head-shadow my_header_style_init"
        }
      >
        <div className="container">
          <Nav navs_data={{ navs: navs_data }} lock={lock} sub />
          <div className="clearfix"></div>
        </div>
        <div
          id="top_info"
          className="top-bar-area address-two-lines text-light"
          style={{ backgroundColor: "#000b47" }}
        >
          {visa_types ? (
            <div className="container pt-2">
              <div className="row">
                <div className="col-md-12 col-sm-12 address-info">
                  <ul
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    {visa_types?.map((type) =>
                      type.highlighted ? (
                        <li key={type._id}>
                          <a
                            href="#"
                            onClick={() =>
                              window.location.assign(
                                `${client_domain}/c/${type.title}/${type._id}`
                              )
                            }
                            style={{ color: "#fff" }}
                          >
                            {type.title}
                          </a>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Header;
