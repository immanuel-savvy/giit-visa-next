"use client";

import React from "react";
import Link from "next/link";
import Preview_image from "./preview_image";
import { client_domain, domain } from "@/assets/js/utils/constants";

class Tourist_center extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  toggle_full_text = () => this.setState({ full_text: !this.state.full_text });

  render() {
    let { center, full, edit, remove } = this.props;
    if (!center) return null;
    let { cities, countries } = this.state;

    center = center.center || center;

    let { image, image_hash, title, _id, country, address, city } = center;

    let country_ = countries?.find((c) => c._id === country);
    let city_ = cities && cities[country]?.find((c) => c._id === city);

    return (
      <div className={full ? "col-11" : "col-xl-4 col-lg-6 col-md-8 col-sm-12"}>
        <div className="blg_grid_box">
          <div className="blg_grid_thumb">
            <Link href={`/tourist_center/${_id}`}>
              <Preview_image
                image={image || "GIIT_ICT_Foundation_1692191352667firesk.jpg"}
                image_hash={image_hash}
              />
            </Link>
            {edit ? (
              <div className="crs_video_ico" onClick={edit}>
                <i className={`fa fa-edit`}></i>
              </div>
            ) : null}
            {remove ? (
              <div className="crs_locked_ico" onClick={remove}>
                <i className={`fa fa-trash`}></i>
              </div>
            ) : null}
          </div>
          <div className="blg_grid_caption">
            <div class="crs_tutor_thumb overl_top">
              {country_ ? (
                <a
                  href={`${client_domain}/c/${country_?.name}/${country_?._id}`}
                >
                  <img
                    src={`${domain}/images/${country_?.image}`}
                    class="img-fluid circle img-responsive"
                    alt=""
                  />
                </a>
              ) : null}
            </div>
            <div className="blg_tag">
              <span>{country_?.name}</span>
            </div>
            <div className="blg_tag ml-2">
              <span>{city_?.name}</span>
            </div>

            <div className="blg_title">
              <h4>
                <Link href={`/tourist_center/${_id}`}>
                  <span>{title}</span>
                </Link>
              </h4>
            </div>
            <p className="cursor-pointer">{address}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Tourist_center;
