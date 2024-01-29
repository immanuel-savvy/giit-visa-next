import Breadcrumb_banner from "@/src/components/breadcrumb_banner";
import Padder from "@/src/components/padder";
import Header from "@/src/sections/header";
import Sponsors from "@/src/sections/sponsors";
import Who_we_are from "@/src/sections/who_we_are";

const { get_request } = require("@/assets/js/utils/services");
const { default: Loadindicator } = require("@/src/components/loadindicator");
const {
  default: Contact_us_today,
} = require("@/src/sections/contact_us_today");
const { default: Footer } = require("@/src/sections/footer");
const { default: Testimonials } = require("@/src/sections/testimonials");

const About = async () => {
  let about_statement = await get_request("about_statement");

  let sponsors = await get_request("sponsors");

  return (
    <div>
      <Header page="about" />
      <Padder />

      <Breadcrumb_banner title="Who we are?" page="About Us" />

      {about_statement ? (
        <>
          <Who_we_are about={about_statement} />
        </>
      ) : (
        <Loadindicator contained />
      )}

      <Testimonials />

      <Sponsors sponsors={sponsors} />

      <Contact_us_today />

      <Footer />
    </div>
  );
};

export default About;
