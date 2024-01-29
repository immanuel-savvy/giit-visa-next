import Contact_us_today from "@/src/sections/contact_us_today";
import Where_should_we_take_you from "@/src/sections/where_should_we_take_you";
import { Img_tag } from "@/src/sections/who_we_are";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Article_comments from "./article_comments";
import Article_sidebar from "./article_sidebar";

const { get_request, domain } = require("@/assets/js/utils/services");
const {
  default: Breadcrumb_banner,
} = require("@/src/components/breadcrumb_banner");
const { default: Padder } = require("@/src/components/padder");
const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");

const Article = async ({ params }) => {
  let article = await get_request(`article/${params.article_id}`);

  let { title, image, comments, sections } = article || new Object();

  return (
    <div>
      <Header page="article" />
      <Padder />

      <Breadcrumb_banner page="Article" title={article.title} no_gray />

      <section className="gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="article_detail_wrapss single_article_wrap format-standard">
                <div className="article_body_wrap">
                  <div className="article_featured_image">
                    <img
                      className="img-fluid"
                      src={`${domain}/images/${image}`}
                      alt=""
                    />
                  </div>
                  <div className="article_top_info">
                    <ul className="article_middle_info">
                      <li>
                        <a href="#article_comments">
                          <span className="icons">
                            <i className="ti-comment-alt"></i>
                          </span>
                          {`${comments || 0} Comments`}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h2 className="post-title">{`${title}.`}</h2>
                  {sections.map((section, index) =>
                    section.type === "paragraph" ? (
                      <ReactMarkdown
                        children={section.text}
                        components={{
                          img: Img_tag,
                        }}
                      />
                    ) : (
                      <blockquote key={index}>
                        <span className="icon">
                          <i className="fas fa-quote-left"></i>
                        </span>
                        <ReactMarkdown
                          children={section.text}
                          components={{
                            img: Img_tag,
                          }}
                        />

                        <h5 className="name">{`- ${section.speaker || ""}`}</h5>
                      </blockquote>
                    )
                  )}
                </div>
                <Article_comments article={article} />
              </div>
            </div>
            <Article_sidebar article={article} />
          </div>
        </div>
      </section>

      <Where_should_we_take_you />
      <Contact_us_today />

      <Footer />
    </div>
  );
};

export default Article;
