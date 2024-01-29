"use client";

import React from "react";
import Visa_details from "./visa_details";
import Visa_media from "./visa_media";
import Visa_reviews from "./visa_reviews";
import Experts from "@/src/sections/experts";

class Visa_overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { visa, consultation, center } = this.props;
    if (!visa) visa = consultation?.visa || center;

    return (
      <div class="col-lg-8 col-md-12 order-lg-first">
        <Visa_media visa={visa} />

        <Visa_details visa={consultation || visa} />

        {consultation ? null : <Experts visa={visa} no_gray />}

        <Visa_reviews visa={visa} />
      </div>
    );
  }
}

export default Visa_overview;
