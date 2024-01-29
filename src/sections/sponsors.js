"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import Sponsor from "../components/sponsor";
import Section_header from "./section_header";
import { get_request } from "@/assets/js/utils/services";

class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { event, sponsors } = this.props;

    sponsors;
    if (!event) {
      sponsors = sponsors || (await get_request("sponsors"));
    } else {
      sponsors = await get_request(`event_sponsors/${event._id}`);
    }

    if (!Array.isArray(sponsors)) sponsors = new Array();

    this.setState({ sponsors });
  };

  render() {
    let { sponsors } = this.state;

    if (sponsors && !sponsors.length) return;

    return (
      <section className="ed_view_box">
        <div className="container">
          <Section_header
            title="sponsors"
            description="We are incredibly grateful for the support and contribution of our valued sponsors."
          />

          <div className="row align-items-center justify-content-center">
            {sponsors ? (
              sponsors.map((sponsor) => (
                <Sponsor sponsor={sponsor} key={sponsor._id} />
              ))
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Sponsors;
