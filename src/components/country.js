"use client";

import React from "react";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Modal from "./modal";
import Manage_page from "../sections/dashboard/add_page";
import Manage_cities from "../sections/dashboard/manage_cities";
import { client_domain } from "@/assets/js/utils/constants";
import { to_title } from "@/assets/js/utils/functions";

class Country extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_page = () => this.page?.toggle();

  toggle_cities = () => this.cities?.toggle();

  render() {
    let { country, full, tours, edit, remove, cc } = this.props;
    if (!country) return;

    let { name, image, image_file_hash, _id, cities } = country;

    return (
      <div
        onClick={
          full || cc
            ? () => window.location.assign(`${client_domain}/c/${name}/${_id}`)
            : null
        }
        style={full || cc ? { cursor: "pointer" } : null}
        className={full ? "col-11" : "col-xl-3 col-lg-4 col-md-6 col-sm-6"}
      >
        <div className="crs_trt_grid">
          <div className="crs_trt_thumb">
            <Preview_image
              image_hash={image_file_hash}
              style={{ height: 100, width: 100 }}
              image={
                image || require("../../assets/img/user_image_placeholder.png")
              }
              class_name="img-fluid w-100"
            />
          </div>
          <div className="crs_trt_caption">
            <div className="instructor_title">
              <h4>{to_title(name)}</h4>
            </div>
          </div>

          {edit || remove ? (
            <div className="crs_trt_footer">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {tours ? (
                  <Text_btn
                    text={`Manage Cities (${cities || 0})`}
                    action={this.toggle_cities}
                  />
                ) : null}

                {!tours && edit && (
                  <Text_btn text="Edit" action={() => edit(country)} />
                )}
                {!tours && (
                  <Text_btn
                    text="Page"
                    icon={country.page ? "fa-edit" : "fa-plus"}
                    action={this.toggle_page}
                  />
                )}
                {!tours && remove && (
                  <Text_btn text="Remove" action={() => remove(country)} />
                )}
              </div>
            </div>
          ) : null}
        </div>

        <Modal ref={(cities) => (this.cities = cities)}>
          <Manage_cities toggle={this.toggle_cities} country={country} />
        </Modal>

        <Modal ref={(page) => (this.page = page)}>
          <Manage_page item={country} toggle={this.toggle_page} />
        </Modal>
      </div>
    );
  }
}

export default Country;
