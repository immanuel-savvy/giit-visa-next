"use client";

import React from "react";
import Text_btn from "./text_btn";
import Preview_image from "./preview_image";
import { to_title } from "@/assets/js/utils/functions";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { restaurant, edit, full, cc, remove, class_name } = this.props;
    let { name, image, _id, image_file_hash } = restaurant;

    return (
      <div
        style={full || cc ? { cursor: "pointer" } : null}
        className={
          full ? "col-11" : class_name || "col-xl-3 col-lg-4 col-md-6 col-sm-6"
        }
      >
        <div className="crs_trt_grid">
          <div className="crs_trt_thumb circle">
            <Preview_image
              image_hash={image_file_hash}
              style={{ height: 100, width: 100 }}
              image={
                image || require("../../assets/img/user_image_placeholder.png")
              }
              class_name="img-fluid circle"
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
                {edit && (
                  <Text_btn text="Edit" action={() => edit(restaurant)} />
                )}
                {remove && (
                  <Text_btn text="Remove" action={() => remove(restaurant)} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Restaurant;
