"use client";

import React from "react";
import { Carousel } from "react-bootstrap";
import Loadindicator from "../components/loadindicator";
import Small_btn from "../components/small_btn";
import { client_domain } from "@/assets/js/utils/constants";
import Hero_banner from "../components/hero_banner";
import bg1 from "../../assets/img/banner1.webp";
import bg2 from "../../assets/img/banner1.webp";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { home } = this.props;

    let heros = new Array(
      {
        main_text: "One platform gathering all your relocation needs",
        sub_text:
          "Get a Global Talent Visa and relocate to the UK. Start your journey now",
        bg: bg1,
        btn: (
          <Small_btn
            title="Take a scoring test"
            action={() => window.location.assign(`${client_domain}/scoring`)}
          />
        ),
      },
      {
        main_text:
          "Your Path to a New Beginning: Simplifying Immigration Process and Empowering Dreams",
        sub_text: "",
        bg: bg2,
        btn: (
          <Small_btn
            title="Book Appointment"
            action={() => window.location.assign(`${client_domain}/scoring`)}
          />
        ),
      }
    );

    this.setState({ heros });
  };

  render() {
    let { heros } = this.state;

    return heros ? (
      <div
        style={{
          backgroundImage: `url(${require("../../assets/img/hero1.png")})`,
        }}
      >
        <Carousel fade nextLabel="" prevLabel="" indicators={false}>
          {heros.map((hero, index) => (
            <Carousel.Item>
              <Hero_banner hero={hero} key={index} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    ) : (
      <Loadindicator />
    );
  }
}

export default Banner;
