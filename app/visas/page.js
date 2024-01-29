import Section from "../experts/section";

const {
  default: Breadcrumb_banner,
} = require("@/src/components/breadcrumb_banner");
const { default: Padder } = require("@/src/components/padder");
const { default: Header } = require("@/src/sections/header");
const { default: Testimonials } = require("@/src/sections/testimonials");
const {
  default: Contact_us_today,
} = require("@/src/sections/contact_us_today");
const { default: Footer } = require("@/src/sections/footer");

const Experts = async () => {
  return (
    <div id="main-wrapper">
      <Header page="consultations" />
      <Padder />
      <Breadcrumb_banner title="consultations" no_gray text="Find Experts" />
      <Section visas />
      <Testimonials no_header />
      <Contact_us_today />
      <Footer />
    </div>
  );
};

export default Experts;
