"use client";

import React from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Loadindicator from "../components/loadindicator";
import { client_domain } from "@/assets/js/utils/constants";
import { scroll_to_top, to_title } from "@/assets/js/utils/functions";
import { post_request } from "@/assets/js/utils/services";

class Custom_nav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      subnavs: new Object(),
      submenus: new Object(),
      subnavs: new Object(),
    };
  }

  load_subnavs = async (current_subnav) => {
    let { submenus } = this.state;

    let courses = await post_request("get_courses", {
      courses: current_subnav.submenu,
    });
    submenus[current_subnav._id] = courses;

    this.setState({
      submenus,
    });
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  search = () => {
    let { search_param } = this.state;
    window.location.assign(
      `${client_domain}/courses?search_param=${search_param}`
    );
    scroll_to_top();
  };

  render() {
    let { current_subnav, current_nav, submenus, show_search, search_param } =
      this.state;
    let { navs } = this.props.navs_data;

    this.navs = navs;

    if (current_subnav && !submenus[current_subnav._id])
      this.load_subnavs(current_subnav);

    return (
      <div id="navigation" className="navigation navigation-landscape">
        <Navbar dark expand="xl">
          <NavbarBrand href="/" className="nav-brand">
            {/* <img
              src={`${domain}/Images/giit_africa_logo_white.png`}
              className="logo"
              id="logo_white"
              alt=""
            /> */}
            <h2 className="text-dark">GIIT VISA</h2>
          </NavbarBrand>
          <NavbarToggler style={{ color: "#fff" }} onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar style={{ alignItems: "center" }}>
              {navs.map((nav, index) => {
                return nav.submenu && nav.submenu.length ? (
                  <UncontrolledDropdown key={index} nav inNavbar>
                    <DropdownToggle
                      style={{
                        backgroundColor: "transparent",
                      }}
                      nav
                      caret
                      ref={(dropdown) =>
                        (this[`main_dropdown_${index}`] = dropdown)
                      }
                      onMouseOver={() => {
                        let comp = this[`main_dropdown_${index}`];
                        !comp.context.isOpen && comp.context.toggle();
                        this.setState({ current_nav: nav.title });
                      }}
                      onMouseMove={() => {
                        let comp = this[`main_dropdown_${index}`];
                        current_nav !== nav.title &&
                          comp.context.isOpen &&
                          comp.context.toggle();
                      }}
                    >
                      <span>{to_title(nav.title.replace(/_/g, " "))}</span>
                    </DropdownToggle>
                    {current_nav === nav.title ? (
                      <DropdownMenu className="nav-dropdown nav-submenu" end>
                        {nav.submenu.map((subnav, index) => (
                          <li
                            onMouseOver={
                              subnav.view_all
                                ? null
                                : () =>
                                    this.setState(
                                      { current_subnav: subnav },
                                      this.set_submenu
                                    )
                            }
                          >
                            {subnav?.path?.startsWith("http") ? (
                              <a onClick={subnav.on_click} href={subnav.path}>
                                {to_title(subnav.title.replace(/_/g, " "))}
                              </a>
                            ) : (
                              <Link
                                onClick={subnav.on_click}
                                href={
                                  subnav.view_all ? "/courses" : subnav.path
                                }
                              >
                                {subnav.view_all
                                  ? "View all courses..."
                                  : to_title(subnav.title.replace(/_/g, " "))}
                              </Link>
                            )}

                            {nav.title !== "courses" ? null : subnav.submenu &&
                              !subnav.submenu.length ? null : subnav._id ===
                              (current_subnav && current_subnav._id) ? (
                              <UncontrolledDropdown
                                key={index}
                                nav
                                inNavbar
                                onClick={subnav.on_click}
                              >
                                <DropdownToggle
                                  style={{
                                    backgroundColor: "transparent",
                                  }}
                                  nav
                                  caret
                                  ref={(dropdown) =>
                                    (this[`dropdown_${index}`] = dropdown)
                                  }
                                  onMouseOver={
                                    subnav.view_all
                                      ? null
                                      : () => {
                                          let comp = this[`dropdown_${index}`];
                                          !comp.context.isOpen &&
                                            comp.context.toggle();
                                        }
                                  }
                                ></DropdownToggle>
                                <DropdownMenu
                                  className="nav-dropdown nav-submenu"
                                  end
                                >
                                  {submenus[subnav._id] ? (
                                    submenus[subnav._id].length ? (
                                      submenus[subnav._id].map((sub_nav) => (
                                        <li
                                          onClick={() =>
                                            this.handle_course(sub_nav)
                                          }
                                          style={{
                                            backgroundColor: "transparent",
                                          }}
                                          key={sub_nav._id}
                                        >
                                          <Link href="/course">
                                            {sub_nav.title.replace(/_/g, " ")}
                                          </Link>
                                        </li>
                                      ))
                                    ) : null
                                  ) : (
                                    <Loadindicator />
                                  )}
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            ) : null}
                          </li>
                        ))}
                      </DropdownMenu>
                    ) : null}
                  </UncontrolledDropdown>
                ) : nav.title === "search" ? (
                  <li
                    onClick={() =>
                      this.setState({
                        show_search: !this.state.show_search,
                      })
                    }
                  >
                    <Link
                      href="#"
                      style={{ border: "none" }}
                      className="btn btn-action"
                    >
                      <i className="ti-search"></i>
                    </Link>
                  </li>
                ) : nav.title === "logout" ? (
                  <li>
                    <Link
                      onClick={loggeduser ? this.profile : this.login}
                      href={nav.path}
                    >
                      <i
                        className={`fas fa-${
                          this.loggeduser ? "user" : "sign-in-alt"
                        } mr-1 text-dark`}
                      ></i>
                      <span className="dn-lg text-dark">
                        {loggeduser ? "Profile" : "Log In"}
                      </span>
                    </Link>
                  </li>
                ) : nav.title === "scoring" ? (
                  <ul
                    className="nav-menu nav-menu-social align-to-right mb-3"
                    // style={{ width:  }}
                  >
                    <li className="add-listing theme-bg">
                      <Link
                        href={
                          this.loggeduser?.expert
                            ? `/expert/${this.loggeduser.expert}`
                            : "/scoring"
                        }
                        className="text-white"
                      >
                        {this.loggeduser?.expert
                          ? "Expert Profile"
                          : "Take a Scoring Test"}
                      </Link>
                    </li>
                  </ul>
                ) : nav.path === "/signup" ? (
                  <ul className="nav-menu nav-menu-social align-to-right mb-3">
                    <li className="add-listing theme-bg">
                      <Link href="/signup" className="text-white">
                        Get Started
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <NavItem>
                    <NavLink
                      style={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <Link
                        style={{ textDecorationColor: "none" }}
                        href={nav.path}
                      >
                        <span>{to_title(nav.title.replace(/_/g, " "))}</span>
                      </Link>
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
          </Collapse>
        </Navbar>
        {show_search ? (
          <div className="form-group col-md-6 col-lg-4">
            <div className="input-with-icon">
              <input
                type="text"
                className="form-control"
                autoFocus
                placeholder="Search Your Courses"
                value={search_param}
                onKeyUp={async (e) => {
                  if (
                    e.target.value === this.previous_value &&
                    this.previous_value
                  )
                    return this.search(e);
                  this.previous_value = e.target.value;
                }}
                onChange={({ target }) =>
                  this.setState({ search_param: target.value })
                }
              />
              <i className="ti-search"></i>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Custom_nav;
