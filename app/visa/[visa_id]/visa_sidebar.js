"use client";

import React from "react";
import Link from "next/link";
import {
  date_string,
  time_string,
  to_title,
} from "@/assets/js/utils/functions";
import Modal from "@/src/components/modal";
import Login from "@/src/components/login";
import Visa from "@/src/components/visa";

class Visa_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  parse_datetime = (datetime) => {
    let date = new Date(datetime).getTime();

    return `${date_string(date)}, ${time_string(date)}`;
  };

  render() {
    let { visa, consultation } = this.props;
    if (!visa) visa = consultation.visa;

    let { perks, _id, duration, country, visa_type } = visa;

    return (
      <div className="col-lg-4 col-md-12 order-lg-last">
        <div className="ed_view_box style_2 border min pt-3">
          <span className="ml-3">{""}</span>
          {consultation ? null : (
            <div className="ed_author">
              <Link href={`/scoring?visa=${_id}`}>
                <div className="btn theme-light enroll-btn">
                  <h4 style={{ cursor: "pointer" }} className="theme-cl m-0">
                    Self-Test
                  </h4>
                </div>
              </Link>
            </div>
          )}

          <div className="ed_author">
            <Link href={`/appointments?visa=${_id}`}>
              <div className="btn theme-bg enroll-btn">
                <h4 style={{ cursor: "pointer" }} className="text-light m-0">
                  Book Appointment
                </h4>
              </div>
            </Link>
          </div>
          {consultation ? null : (
            <div className="ed_view_features">
              <div className="eld mb-3">
                <h5 className="font-medium"></h5>
              </div>
              <div className="eld mb-3">
                <ul className="edu_list right">
                  <li>
                    <i className="ti-check"></i>
                    Country:<strong>{country.name}</strong>
                  </li>
                  <li>
                    <i className="ti-check"></i>
                    Visa Type:<strong>{visa_type.title}</strong>
                  </li>
                  <li>
                    <i className="ti-calendar"></i>
                    Duration:<strong>{duration} days</strong>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="ed_view_features">
            <div className="eld mb-3">
              <h5 className="font-medium">
                {consultation ? "Price Breakdown" : "Advantages"}
              </h5>
            </div>
            <div className="eld mb-3">
              {consultation ? (
                <ul className="edu_list right">
                  {consultation.price_breakdown.map((p) => {
                    return (
                      <li>
                        <i className="ti-check"></i>
                        {p.service_name}:
                        {p.price ? (
                          <strong>&#8358;{p.price}</strong>
                        ) : (
                          <strong>Free</strong>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="edu_list right">
                  {perks.map((perk) => (
                    <li key={perk}>
                      <span>
                        <i className="ti-check"></i>
                        {to_title(perk)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {consultation ? <Visa visa={visa} full /> : null}

        <Modal ref={(login) => (this.login = login)}>
          <Login
            no_redirect
            action={this.register_attendance}
            toggle={() => this.login?.toggle()}
          />
        </Modal>
      </div>
    );
  }
}

export default Visa_sidebar;
