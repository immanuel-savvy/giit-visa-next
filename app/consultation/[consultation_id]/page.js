import { get_request } from "@/assets/js/utils/services";
import Padder from "@/src/components/padder";
import Articles from "@/src/sections/articles";
import Footer from "@/src/sections/footer";
import Header from "@/src/sections/header";
import Visa_sidebar from "@/app/visa/[visa_id]/visa_sidebar";
import Visa_overview from "@/app/visa/[visa_id]/visa_overview";
import Visa_header from "@/app/visa/[visa_id]/visa_header";

const Consultation = async ({ params }) => {
  let consultation = await get_request(
    `consultation/${params.consultation_id}`
  );

  return (
    <div>
      <Header page="consultation" />
      <Padder />

      <Visa_header consultation={consultation} />

      <section class="gray pt-5">
        <div class="container">
          <div class="row">
            <Visa_overview consultation={consultation} />

            <Visa_sidebar consultation={consultation} />
          </div>
        </div>
      </section>

      {consultation ? (
        <Articles query={{ visa_type: consultation?.visa?.visa_type?._id }} />
      ) : null}

      <Footer />
    </div>
  );
};

export default Consultation;
