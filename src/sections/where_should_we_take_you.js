"use client";

import React from "react";
import Country from "../components/country";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Explore_more from "../components/explore_more";

class Where_should_we_take_you extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { countries } = this.props;
    if (countries) {
      countries = await get_request("entry");
      countries = countries?.countries;
      this.setState({ countries });
    }

    this.setState({ small_screen: window.innerWidth < 650 ? true : false });
  };

  render() {
    let { grey, countries } = this.props;
    let { small_screen, countries: countries_ } = this.state;

    if (!countries) {
      if (countries_) countries = countries_;
      else return null;
    }

    return (
      <section className={grey ? "gray" : ""}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Where should we <span className="theme-cl">Take you</span>
                </h2>
                <p>{/*  */}</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {small_screen ? (
              <div className="col-lg-12 col-md-12 col-sm-12">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  slidesPerView={1}
                  autoplay={{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                  loop
                  className="swiper-container"
                >
                  {countries?.slice(0, 10)?.map((country, index) => (
                    <SwiperSlide key={index}>
                      <Country full country={country} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              countries
                .slice(0, 12)
                .map((country) => (
                  <Country cc country={country} key={country._id} />
                ))
            )}
          </div>

          {countries?.length ? <Explore_more to="countries" /> : null}
        </div>
      </section>
    );
  }
}

export default Where_should_we_take_you;
