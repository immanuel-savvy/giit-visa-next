"use client";

import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

class Visa_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { visa } = this.props;
    let { things_to_know, what_to_expect, description } = visa;

    return (
      <>
        <div class="edu_wraper">
          <h4 class="edu_title">
            {visa.price_breakdown ? "Consultation" : "Visa"} Details
          </h4>
          {description.split("\n").map((d, index) => (
            <ReactMarkdown key={index} children={d} />
          ))}

          {things_to_know && things_to_know.length ? (
            <>
              <h6>Thing you need to know</h6>
              <ul class="simple-list p-0">
                {things_to_know.map((knw, index) => (
                  <li key={index}>{knw}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {what_to_expect && what_to_expect.length ? (
          <div class="edu_wraper">
            <h4 class="edu_title">What to expect</h4>
            <ul class="lists-3 row">
              {what_to_expect.map((wah, index) => (
                <li key={index} class="col-xl-4 col-lg-6 col-md-6 m-0">
                  {wah}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </>
    );
  }
}

export default Visa_details;
