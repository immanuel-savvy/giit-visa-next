"use client";

import React from "react";
import { Col } from "react-bootstrap";
import Video from "./video";
import Small_btn from "./small_btn";
import { client_domain, domain } from "@/assets/js/utils/constants";
import { get_request } from "@/assets/js/utils/services";

class Experts_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { experts_overview } = this.props;

    experts_overview =
      experts_overview || (await get_request("expert_overview"));

    this.setState({ experts_overview });
  };

  render() {
    let { experts_overview } = this.state;
    let { title, text, video, thumbnail, image_hash } =
      experts_overview || new Object();

    return (
      <div className="row mb-3">
        <div
          className={`col-lg-${experts_overview ? "6" : "12"} col-md-${
            experts_overview ? "6" : "12"
          } ${
            experts_overview ? "" : "justify-content-center"
          } col-sm-12 align-items-center d-flex`}
        >
          <div className="">
            <h2>
              {title ||
                "Expert Consultants: Guiding You Towards Successful Immigration"}
            </h2>
            <p className="lead">
              {text ||
                `Our team of experienced immigration consultants are here to provide you with the expertise and support you need throughout your immigration journey. With their in-depth knowledge of immigration laws and processes, our consultants will guide you through every step, helping you navigate the complexities and making the process as smooth as possible.`}
            </p>
            <Small_btn
              title="Become an Expert"
              action={() =>
                window.location.assign(`${client_domain}/become_an_expert`)
              }
            />
            <br />
            <br />
          </div>
        </div>
        {experts_overview ? (
          <Col lg={6} md={6} sm={12} className="align-items-center">
            <Video
              url={`${domain}/videos/${video}`}
              thumbnail={thumbnail}
              thumbnail_hash={image_hash}
            />
          </Col>
        ) : null}
      </div>
    );
  }
}

export default Experts_header;
