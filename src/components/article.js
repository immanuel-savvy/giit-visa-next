"use client";

import React from "react";
import Link from "next/link";
import Preview_image from "./preview_image";
import { date_string } from "@/assets/js/utils/functions";

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  handle_article = () => {
    let { article } = this.props;
  };

  toggle_full_text = () => this.setState({ full_text: !this.state.full_text });

  render() {
    let { full_text } = this.state;
    let { article, full, edit, remove } = this.props;
    if (!article) return null;

    let {
      image,
      image_hash,
      title,
      sections,
      views,
      comments,
      _id,
      created,
      categories,
    } = article;

    let text = sections.find((sec) => sec.type === "paragraph")?.text;

    return (
      <div className={full ? "col-11" : "col-xl-4 col-lg-6 col-md-8 col-sm-12"}>
        <div className="blg_grid_box">
          <div className="blg_grid_thumb">
            <Link href={`/article/${_id}`}>
              <Preview_image
                image={image}
                image_hash={image_hash}
                onclick={this.handle_article}
              />
            </Link>
            {edit ? (
              <div className="crs_video_ico" onClick={edit}>
                <i className={`fa fa-edit`}></i>
              </div>
            ) : null}
            {remove ? (
              <div
                className="crs_locked_ico"
                onClick={() =>
                  window.confirm("Are you sure to remove article?") && remove()
                }
              >
                <i className={`fa fa-trash`}></i>
              </div>
            ) : null}
          </div>
          <div className="blg_grid_caption">
            {categories.length ? (
              <div className="blg_tag">
                <span>{categories[0].tags[0]}</span>
              </div>
            ) : null}
            <div className="blg_title">
              <h4>
                <Link href={`/article/${_id}`}>
                  <span onClick={this.handle_article}>{title}</span>
                </Link>
              </h4>
            </div>
            <p className="cursor-pointer" onClick={this.toggle_full_text}>
              {full_text ? text : text.slice(0, 70)}
              {text.length > 70 ? (
                <span
                  className="theme-cl"
                  style={{ fontStyle: "italic", marginLeft: 5 }}
                  onClick={this.toggle_full_text}
                >
                  {full_text ? "Show less" : "...Read more"}
                </span>
              ) : null}
            </p>
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex" style={{ marginLeft: 0 }}>
              <div className="crs_fl_last" style={{ marginLeft: 0 }}>
                <div className="foot_list_info" style={{ marginLeft: 0 }}>
                  <ul
                    className="article_footer_ul"
                    style={{ marginLeft: 0, marginBlockStart: 0 }}
                  >
                    <li>
                      <div className="elsio_ic">
                        <i className="fa fa-eye text-success"></i>
                      </div>
                      <div className="elsio_tx">{views} Views</div>
                    </li>
                    <li>
                      <div className="elsio_ic">
                        <i className="ti-comment-alt text-success"></i>
                      </div>
                      <div className="elsio_tx">{comments} Comments</div>
                    </li>
                    <li>
                      <div className="elsio_ic">
                        <i className="fa fa-clock text-warning"></i>
                      </div>
                      <div className="elsio_tx">{date_string(created)}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
