"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Visa from "../components/visa";
import Explore_more from "../components/explore_more";
import { post_request } from "@/assets/js/utils/services";

class Visas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { query, visas } = this.props;
    visas =
      visas ||
      (await post_request(
        "visas",
        query ? { query } : { featured: true, limit: 12 }
      ));

    this.setState({ visas, slides: 1 /*  window.innerWidth < 650 ? 2 : 3 */ });
  };

  render() {
    let { query, no_more } = this.props;
    let { visas, slides } = this.state;
    if (visas && !visas.length) return;

    return (
      <section className="">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  {query ? "" : "featured"}{" "}
                  <span className="theme-cl">Visas</span>
                </h2>
                <p>
                  Discover Your Path to Possibilities: Explore Our Featured
                  Visas
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {visas ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={slides}
                autoplay={{
                  delay: 2000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
                }}
                loop
                className="swiper-container"
              >
                {visas.map((visa, index) => (
                  <SwiperSlide key={index}>
                    <Visa visa={visa} full />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loadindicator />
            )}
          </div>

          {visas && visas.length && !no_more ? (
            <Explore_more to="visas" />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Visas;
