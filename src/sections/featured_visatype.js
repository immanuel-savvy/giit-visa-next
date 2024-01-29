"use client";

import React from "react";
import Small_btn from "../components/small_btn";
import { client_domain, domain } from "@/assets/js/utils/constants";
import { get_request } from "@/assets/js/utils/services";

class Featured_visatype extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { featured_visatype } = this.props;
    featured_visatype =
      featured_visatype || (await get_request("featured_visatype"));

    this.setState({ featured_visatype });
  };

  render() {
    let { featured_visatype } = this.state;
    if (!featured_visatype) return;

    let { title, text, image, visa_type } = featured_visatype || new Object();

    return (
      <>
        <section className="imageblock pt-m-0">
          <div className={`imageblock__content left`}>
            <div
              className="background-image-holder"
              style={{ background: `url(${domain}/images/${image})` }}
            >
              <img
                alt="image"
                className="rounded img-fluid"
                src={`${domain}/images/${image}`}
              />
            </div>
          </div>
          <div className="container">
            <div className={`row align-items-center justify-content-${"end"}`}>
              <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                <div className="lmp_caption">
                  <h2 className="mb-3">{title}</h2>
                  {text?.split("\n").map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
                <Small_btn
                  title="Learn more"
                  action={() =>
                    window.location.assign(
                      `${client_domain}/c/${visa_type.title}/${visa_type._id}`
                    )
                  }
                />
              </div>
            </div>
          </div>
        </section>
        <div className="clearfix"></div>
      </>
    );
  }
}

export default Featured_visatype;
