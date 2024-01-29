import Faqs from "@/src/sections/faqs";

const {
  default: Breadcrumb_banner,
} = require("@/src/components/breadcrumb_banner");
const { default: Padder } = require("@/src/components/padder");
const {
  default: Contact_us_today,
} = require("@/src/sections/contact_us_today");
const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");

const Faqs_page = async () => {
  return (
    <div id="main-wrapper">
      <Header page="faq" />
      <Padder />

      <Breadcrumb_banner page="FAQ" title="What you need to know" />
      <Faqs />
      <Contact_us_today />
      <Footer />
    </div>
  );
};

export default Faqs_page;
