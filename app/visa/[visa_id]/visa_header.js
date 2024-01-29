"use client";

import React from "react";
import { client_domain } from "@/assets/js/utils/constants";
import Preview_image from "@/src/components/preview_image";

class Visa_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_speaker = () => {
    let { visa, consultation } = this.props;
    if (!visa) visa = consultation;

    let { country } = visa;

    window.location.assign(`${client_domain}/visas?country=${country._id}`);
  };

  parse_duration = (duration) => {
    let hours = Math.floor(duration / 60);
    let minutes = duration - hours * 60;

    let str = "";
    if (hours) str += `${hours} Hours `;
    str += `${minutes} Mins`;

    return str;
  };

  render() {
    let { visa, consultation } = this.props;
    if (!visa) visa = consultation.visa;

    let { title, applicants, visa_type, country, duration } = visa;

    return (
      <div className="ed_detail_head">
        <div className="container">
          <div className="row align-items-center justify-content-between mb-2">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  <div className="crs_cates cl_4">
                    <span>{visa_type.title}</span>
                  </div>

                  <div className="ed_header_caption">
                    <h2 className="ed_title">{title}</h2>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center cursor-pointer">
                      <Preview_image
                        image={
                          country.image
                          // require(`../assets/img/user_image_placeholder.png`)
                        }
                        action={this.handle_speaker}
                        image_hash={country.image_file_hash}
                        class_name="img img-fluid circle"
                        height={70}
                        width={70}
                      />
                    </div>
                    <div className="ml-2 ml-md-3">
                      <span>{"Country"}</span>
                      <h6
                        onClick={this.handle_speaker}
                        style={{ cursor: "pointer" }}
                        className="m-0"
                      >
                        {country.name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12">
              <ul className="row p-0">
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-star mr-1 text-warning"></i>
                  <span>4.9 Star (5,254)</span>
                </li>
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-clock mr-1 text-success"></i>
                  <span>
                    {duration} Days, <br />
                  </span>
                </li>
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-user mr-1 text-info"></i>
                  <span>{applicants || 0} Applicants</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Visa_header;
