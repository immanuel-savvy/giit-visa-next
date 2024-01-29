"use client";

import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loadindicator from "../components/loadindicator";
import Consultation from "../components/consultation";
import Section_header from "./section_header";
import { post_request } from "@/assets/js/utils/services";

class Experts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { visa, consultations } = this.props;
    consultations =
      consultations ||
      (await post_request(
        visa ? `visa_consultations/${visa._id}` : "consultations",
        { limit: 12 }
      ));

    this.setState({
      consultations,
      slides: 1 /*  window.innerWidth < 650 ? 1 : 3  */,
    });
  };

  render() {
    let { no_gray, visa } = this.props;
    let { consultations, slides } = this.state;

    if (visa && consultations && !consultations.length) return null;

    return (
      <section id="appointments" className={no_gray ? "" : `gray`}>
        <div className="container">
          {consultations?.length ? (
            <Section_header title="speak to our" color_title="Consultants" />
          ) : null}
          <div className="row justify-content-center">
            {consultations ? (
              !consultations.length ? null : (
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
                  {consultations.map((consultation, index) => (
                    <SwiperSlide key={index}>
                      <Consultation full consultation={consultation} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Experts;
