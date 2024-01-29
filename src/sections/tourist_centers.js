"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Tourist_center from "../components/tourist_center";
import { post_request } from "@/assets/js/utils/services";

class Tourist_centers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { query } = this.props;

    let centers = await post_request(
      "tourist_centers_by_country",
      query ? { query } : null
    );

    this.setState({ centers });
  };

  render() {
    let { query } = this.props;
    let { centers } = this.state;
    if (centers && !centers.length) return;

    return (
      <section className="">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  {query ? "" : "featured"}{" "}
                  <span class="theme-cl">Tourist Centers</span>
                </h2>
                <p>
                  Discover Your Path to Possibilities: Explore Our Featured
                  Tourist Centers
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            {centers ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={window.innerWidth < 650 ? 1 : 3}
                autoplay={{
                  delay: 2000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
                }}
                loop
                className="swiper-container"
              >
                {centers.map((center) => (
                  <SwiperSlide key={center._id}>
                    <Tourist_center center={center} full />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Tourist_centers;
