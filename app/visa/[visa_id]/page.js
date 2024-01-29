import { get_request } from "@/assets/js/utils/services";
import Padder from "@/src/components/padder";
import Articles from "@/src/sections/articles";
import Footer from "@/src/sections/footer";
import Header from "@/src/sections/header";
import Tourist_centers from "@/src/sections/tourist_centers";
import Visa_header from "./visa_header";
import Visa_overview from "./visa_overview";
import Visa_sidebar from "./visa_sidebar";

const Visa = async ({ params }) => {
  let visa = await get_request(`visa/${params.visa_id}`);

  return (
    <div>
      <Header page="visa" />
      <Padder />

      <Visa_header visa={visa} />

      <section class="gray pt-5">
        <div class="container">
          <div class="row">
            <Visa_overview visa={visa} />

            <Visa_sidebar visa={visa} />
          </div>
        </div>
      </section>

      {visa ? (
        <Tourist_centers query={{ country: visa?.country?._id }} />
      ) : null}

      {visa ? <Articles query={{ visa_type: visa?.visa_type?._id }} /> : null}

      <Footer />
    </div>
  );
};

export default Visa;
