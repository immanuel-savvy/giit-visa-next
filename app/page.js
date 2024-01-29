import Header from "@/src/sections/header";

import { navs } from "./static_data";
import Banner from "@/src/sections/banner";
import Footer from "@/src/sections/footer";
import Contact_us_today from "@/src/sections/contact_us_today";
import { get_request, post_request } from "@/assets/js/utils/services";
import Where_should_we_take_you from "@/src/sections/where_should_we_take_you";
import Visas from "@/src/sections/visas";
import Experts from "@/src/sections/experts";
import Experts_header from "@/src/components/experts_header";
import Featured_visatype from "@/src/sections/featured_visatype";
import Testimonials from "@/src/sections/testimonials";
import Faqs from "@/src/sections/faqs";

const Home = async ({}) => {
  let { visa_types, countries } = (await get_request("entry")) || {};

  let visas = await post_request("visas", { featured: true, limit: 12 });

  let experts = await post_request("consultations", { limit: 12 });

  let experts_overview = await get_request("expert_overview");

  let featured_visatype = await get_request("featured_visatype");

  let reviews = await post_request("reviews", { verified: true, limit: 12 });

  let videos = await post_request("video_reviews", { limit: 12 });

  return (
    <div id="main-wrapper">
      <Header navs_data={{ navs }} visa_types={visa_types} />
      <div className="body">
        <Banner home />

        <Where_should_we_take_you countries={countries} />

        <Visas visas={visas} />

        <Experts experts={experts} />

        <section id="" className={`gray`}>
          <div className="container">
            <Experts_header experts_overview={experts_overview} />
          </div>
        </section>

        <Featured_visatype featured_visatype={featured_visatype} />

        <Testimonials reviews={reviews} videos={videos} />

        <Faqs limit={6} />

        <Contact_us_today />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
