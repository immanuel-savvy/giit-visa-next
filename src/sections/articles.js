"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Article from "../components/article";
import { post_request } from "@/assets/js/utils/services";

class Articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { query } = this.props;
    let articles = await post_request(
      "articles",
      query ? { query } : { featured: true }
    );

    this.setState({ articles });
  };

  render() {
    let { query } = this.props;
    let { articles } = this.state;
    if (articles && !articles.length) return;

    return (
      <section className="">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  {query ? "" : "featured"}{" "}
                  <span class="theme-cl">Articles</span>
                </h2>
                <p>
                  Discover Your Path to Possibilities: Explore Our Featured
                  Articles
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            {articles ? (
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
                {articles.map((article) => (
                  <SwiperSlide key={article._id}>
                    <Article article={article} full />
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

export default Articles;
