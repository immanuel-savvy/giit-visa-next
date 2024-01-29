"use client";

import React from "react";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import logo_img from "../../assets/img/rate.png";

class Sponsor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { sponsor, edit, remove } = this.props;

    if (!sponsor) return;

    let { logo, logo_hash, url } = sponsor;

    if (!logo) logo = logo_img;

    return (
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="crs_partn ed_view_box">
          <div class="p-3">
            <a href={url} target="_blank">
              <Preview_image
                image={logo}
                image_hash={logo_hash}
                class_name="img-fluid"
              />
            </a>
          </div>

          {edit || remove ? (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {edit ? (
                <Text_btn text="Edit" icon="fa-edit" action={edit} />
              ) : null}
              {remove ? (
                <Text_btn text="Remove" icon="fa-cancel" action={remove} />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Sponsor;
