import { post_request } from "@/assets/js/utils/services";
import Breadcrumb_banner from "@/src/components/breadcrumb_banner";
import Loadindicator from "@/src/components/loadindicator";
import Padder from "@/src/components/padder";
import Preview_image from "@/src/components/preview_image";
import Header from "@/src/sections/header";
import Section_header from "@/src/sections/section_header";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Visas from "@/src/sections/visas";
import Tourist_centers from "@/src/sections/tourist_centers";
import Articles from "@/src/sections/articles";
import Testimonials from "@/src/sections/testimonials";
import Contact_us_today from "@/src/sections/contact_us_today";
import Footer from "@/src/sections/footer";

const Img_tag = ({ src }) => {
  return (
    <img
      src={src}
      className="img-fluid rounded"
      style={{
        width: "100%",
      }}
    />
  );
};

const A_tag = ({ href, children }) => {
  return (
    <a href={href} className="theme-cl" target="_blank">
      {children}
    </a>
  );
};

const H1_tag = ({ children }) => {
  return <Section_header title={children} color_title="" description="" />;
};

const Page = async ({ params }) => {
  let page = await post_request("page", { item: params._id });

  let { item, sections, image, title, image_file_hash } = page || {};
  if (!sections) sections = new Array();

  return (
    <div>
      <Header page="page" />
      <Padder />

      <Breadcrumb_banner title={title} page="Page" />

      {params._id ? (
        <Visas
          no_more
          query={{
            [params._id.startsWith("visa") ? "visa_type" : "country"]:
              params._id,
          }}
        />
      ) : null}

      {page ? (
        <section>
          <div className="container">
            <div className="row">
              <div className="container">
                <div className="row align-items-center justify-content-between">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="lmp_caption">
                      {sections[0]?.text?.split("\n").map((s, i) => (
                        <ReactMarkdown
                          key={i}
                          children={s}
                          components={{
                            a: A_tag,
                            h1: H1_tag,
                            img: Img_tag,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                    <div className="lmp_thumb">
                      <Preview_image
                        class_name="rounded"
                        style={{ width: "100%" }}
                        image_hash={image_file_hash}
                        image={image}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {sections.slice(1).map((section, i) => {
            if (!((i + 1) % 2)) return;

            return (
              <section className={i % 2 ? "" : "gray"}>
                <div className="container">
                  <div className="row justify-content-between">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                      {section.text.split("\n").map((s, k) => {
                        return (
                          <ReactMarkdown
                            key={k}
                            remarkPlugins={[remarkGfm]}
                            children={s.trim()}
                            components={{
                              a: A_tag,
                              h1: H1_tag,
                              img: Img_tag,
                            }}
                          />
                        );
                      })}
                    </div>
                    {sections.slice(1)[i + 1] ? (
                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        {sections
                          .slice(1)
                          [i + 1].text.split("\n")
                          .map((s, k) => {
                            return (
                              <ReactMarkdown
                                key={k}
                                remarkPlugins={[remarkGfm]}
                                children={s.trim()}
                                components={{
                                  a: A_tag,
                                  h1: H1_tag,
                                  img: Img_tag,
                                }}
                              />
                            );
                          })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>
            );
          })}
        </section>
      ) : (
        <Loadindicator />
      )}

      {item?.startsWith("count") ? (
        <Tourist_centers query={{ country: item }} />
      ) : null}

      {item ? <Articles query={{ visa_type: item }} /> : null}

      <Testimonials />

      <Contact_us_today />

      <Footer />
    </div>
  );
};

export default Page;
