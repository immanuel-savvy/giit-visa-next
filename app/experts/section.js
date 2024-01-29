"use client";

import { organisation_name } from "@/assets/js/utils/constants";
import { get_request, post_request } from "@/assets/js/utils/services";
import Consultation from "@/src/components/consultation";
import Listempty from "@/src/components/listempty";
import Loadindicator from "@/src/components/loadindicator";
import Text_btn from "@/src/components/text_btn";
import React from "react";

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: new Object(),
      page: 0,
      page_size: 24,
      c_try: "all",
      v_type: "all",
      // active_tab: visas_tabs[experts ? 1 : 0],
    };
  }

  fetch_visas = async (filter, page, mount) => {
    let { visas: visas_ } = this.props;

    this.setState({ fetching_visas: true });

    let visas = await post_request("visas", {
      total_visas: true,
      filter: filter || this.state.filter,
    });

    let consultations;
    if (mount)
      consultations = await post_request("consultations", {
        total_consultations: true,
        filter: filter || this.state.filter,
      });

    this.setState(
      {
        visas,
        page,
        filter: filter || new Object(),
        fetching_visas: false,
        consultations: consultations || this.state.consultations,
      },
      scroll_to_top
    );
  };

  componentDidMount = async () => {
    document.title = `Experts | ${organisation_name}`;

    let { filter } = this.state;
    let query = window.location.search;
    let params = query.slice(1).split("&");
    params.map((param) => {
      param = param.split("=");
      filter[param[0]] = param[1];
    });

    if (filter.search) {
      delete filter.search;
      this.setState({ search_focus: true });
    }

    this.setState({ data: await get_request("entry") });
    await this.refresh();
  };

  page = async (page) => {
    await this.fetch_visas(null, page);

    scroll_to_top();
  };

  next_page = async () => {
    let { page, total_pages } = this.state;
    page < total_pages - 1 && (await this.fetch_visas(null, page + 1));
  };

  prev_page = async () => {
    let { page } = this.state;
    page > 0 && (await this.fetch_visas(null, page - 1));
  };

  render_pagers = () => {
    let { page_size, page, total_visas } = this.state,
      mapper = new Array(),
      i = 0;
    for (let p = 0; p < total_visas; p += page_size) mapper.push(i++);

    return mapper.map((pager, index) => (
      <li
        className={`page-item ${index === page ? "active" : ""}`}
        onClick={() => this.page(index)}
      >
        <a className="page-link" href="#">
          {pager + 1}
        </a>
      </li>
    ));
  };

  render_pagination = () => {
    let { page, page_size, total_pages, consultations, total_visas } =
      this.state;

    return (
      <div className="row align-items-center justify-content-between">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <p className="p-0">{`Showing ${page * page_size + 1} to ${
            page * page_size + consultations.length
          } of ${total_visas} entire`}</p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <nav className="float-right">
            <ul className="pagination smalls m-0">
              <li
                onClick={this.prev_page}
                className={`page-item ${page === 0 ? "disabled" : ""}`}
              >
                <a className="page-link" href="#" tabindex="-1">
                  <i className="fas fa-arrow-circle-left"></i>
                </a>
              </li>

              {this.render_pagers()}

              <li
                className={`page-item ${
                  total_pages - 1 === page ? "disabled" : ""
                }`}
                onClick={this.next_page}
              >
                <a className="page-link" href="#">
                  <i className="fas fa-arrow-circle-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  refresh = async () => {
    let { visas } = this.props;
    let { v_type, c_try } = this.state;

    let consultations = await post_request(visas ? "visas" : "consultations", {
      query:
        v_type === "all" && c_try === "all"
          ? null
          : v_type !== "all" && c_try !== "all"
          ? { visa_type: v_type, country: c_try }
          : v_type !== "all"
          ? { visa_type: v_type }
          : { country: c_try },
    });

    this.setState({ consultations });
  };

  toggle_country_filter = () =>
    this.setState({
      show_country_filter: !this.state.show_country_filter,
      country_filter: "",
    });

  toggle_visa_filter = () =>
    this.setState({
      show_visa_filter: !this.state.show_visa_filter,
      visa_filter: "",
    });

  render() {
    let {
      consultations,
      c_try,
      v_type,
      show_visa_filter,
      visa_filter,
      show_country_filter,
      country_filter,
      data,
    } = this.state;

    if (!data) return <Loadindicator />;

    return (
      <section className="gray" style={{ paddingTop: 20 }}>
        <div className="container">
          {show_country_filter ? (
            <div className="row align-items-center">
              <div className="form-group mr-0 pr-0 col-md-6 col-lg-4">
                <div className="input-with-icon">
                  <input
                    type="text"
                    className="form-control"
                    autoFocus
                    placeholder={`Filter countries...`}
                    value={country_filter}
                    onChange={({ target }) =>
                      this.setState({
                        country_filter: target.value,
                      })
                    }
                  />
                  <i className="ti-search"></i>
                </div>
              </div>
              <div className="form-group col-4"></div>
            </div>
          ) : null}
          <div className="row align-items-center">
            <div className="col-1 justify-content-center">
              <Text_btn
                icon={show_country_filter ? "fa-window-close" : "fa-search"}
                action={this.toggle_country_filter}
              />
            </div>
            <div
              className="col-11"
              style={{
                display: "flex",
                flexDirection: "row",
                overflowX: "scroll",
              }}
            >
              {"all" === c_try ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ c_try: "all" }, this.refresh);
                  }}
                  type="submit"
                  className={"btn theme-bg btn-rounded m-2"}
                >
                  {"All"}
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ c_try: "all" }, this.refresh);
                  }}
                  type="submit"
                  className={"btn btn-outline-theme m-2"}
                >
                  {"All"}
                </button>
              )}
              {data.countries.map((country) =>
                country_filter &&
                !country?.name
                  ?.toLowerCase()
                  ?.includes(
                    country_filter.toLowerCase()
                  ) ? null : country._id === c_try ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ c_try: country._id }, this.refresh);
                    }}
                    type="submit"
                    className={"btn theme-bg btn-rounded m-2"}
                  >
                    {country.name}
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ c_try: country._id }, this.refresh);
                    }}
                    type="submit"
                    className={"btn btn-outline-theme m-2"}
                  >
                    {country.name}
                  </button>
                )
              )}

              {/* {consultations ? this.render_pagination() : null} */}
            </div>
            {show_visa_filter ? (
              <div className="row align-items-center">
                <div className="form-group mr-0 pr-0 col-md-6 col-lg-4">
                  <div className="input-with-icon">
                    <input
                      type="text"
                      className="form-control"
                      autoFocus
                      placeholder={`Filter visa types...`}
                      value={visa_filter}
                      onChange={({ target }) =>
                        this.setState({
                          visa_filter: target.value,
                        })
                      }
                    />
                    <i className="ti-search"></i>
                  </div>
                </div>
                <div className="form-group col-4"></div>
              </div>
            ) : null}
          </div>
          <div className="row align-items-center">
            <div className="col-1">
              <Text_btn
                icon={show_visa_filter ? "fa-window-close" : "fa-search"}
                action={this.toggle_visa_filter}
              />
            </div>
            <div
              className="col-11"
              style={{
                display: "flex",
                flexDirection: "row",
                overflowX: "scroll",
              }}
            >
              {"all" === v_type ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ v_type: "all" }, this.refresh);
                  }}
                  type="submit"
                  className={"btn theme-bg btn-rounded m-2"}
                >
                  All
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ v_type: "all" }, this.refresh);
                  }}
                  type="submit"
                  className={"btn btn-outline-theme m-2"}
                >
                  All
                </button>
              )}
              {data.visa_types.map((visa) =>
                visa_filter &&
                !visa?.title
                  ?.toLowerCase()
                  ?.includes(visa_filter.toLowerCase()) ? null : visa._id ===
                  v_type ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ v_type: "all" }, this.refresh);
                    }}
                    type="submit"
                    className={"btn theme-bg btn-rounded m-2"}
                  >
                    All
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ v_type: visa._id }, this.refresh);
                    }}
                    type="submit"
                    className={"btn btn-outline-theme m-2"}
                  >
                    {visa.title}
                  </button>
                )
              )}
            </div>

            <div className="row justify-content-center">
              {consultations ? (
                consultations.length ? (
                  consultations.map((consultation) => (
                    <Consultation
                      in_consultations
                      consultation={consultation}
                      key={consultation._id}
                    />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Section;
