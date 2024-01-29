const { get_request } = require("@/assets/js/utils/services");
const {
  default: Breadcrumb_banner,
} = require("@/src/components/breadcrumb_banner");
const { default: Country } = require("@/src/components/country");
const { default: Listempty } = require("@/src/components/listempty");
const { default: Loadindicator } = require("@/src/components/loadindicator");
const { default: Padder } = require("@/src/components/padder");
const {
  default: Contact_us_today,
} = require("@/src/sections/contact_us_today");
const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");

const Countries = async () => {
  let { countries } = (await get_request("entry")) || {};

  return (
    <div id="main-wrapper">
      <Header page="Countries" refs="header" />
      <Padder />
      <Breadcrumb_banner title="Where should we take you?" text="Countries" />
      <div style={{ backgroundColor: "#f7f8f9", paddingTop: 20 }}>
        <div className="container">
          <div class="row justify-content-center my-3 mt-5">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  Select Your
                  <span class="theme-cl">&nbsp;Destination</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-5 row justify-content-center">
            {countries ? (
              countries.length ? (
                countries.map((country) => <Country cc country={country} />)
              ) : (
                <Listempty />
              )
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
      </div>
      <Contact_us_today />
      <Footer />
    </div>
  );
};

export default Countries;
