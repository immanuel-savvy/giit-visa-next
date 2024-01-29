import Padder from "@/src/components/padder";
import Header from "@/src/sections/header";
import Signup_form from "./signup_form";
import Footer from "@/src/sections/footer";

const Signup = async () => {
  return (
    <div id="main-wrapper">
      <Header page="login" />
      <Padder />
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
              <Signup_form />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Signup;
