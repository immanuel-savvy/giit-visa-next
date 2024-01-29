"use client";

import React from "react";
import Text_btn from "../../components/text_btn";
import { to_title } from "@/assets/js/utils/functions";

class City extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_page = () => this.page?.toggle();

  render() {
    let { city, edit, remove } = this.props;
    if (!city) return;

    let { name, restaurants } = city;

    return (
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div class="crs_trt_grid">
          <div class="crs_trt_caption">
            <div class="instructor_title">
              <h4>{to_title(name)}</h4>
            </div>
            <em>Restaurants: {restaurants || 0}</em>
          </div>

          {edit || remove ? (
            <div class="crs_trt_footer">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {edit && <Text_btn text="Edit" action={() => edit(city)} />}

                {remove && (
                  <Text_btn text="Remove" action={() => remove(city)} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default City;
