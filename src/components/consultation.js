"use client";

import React from "react";
import Preview_image from "./preview_image";
import { save_to_session, scroll_to_top } from "../sections/footer";
import Link from "next/link";
import { commalise_figures, to_title } from "@/assets/js/utils/functions";

class Consultation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { in_consultations, consultation, full, edit, remove } = this.props;
    consultation = consultation.consultation || consultation;

    if (!consultation) return;
    let { visa, price_breakdown, title, _id, expert } = consultation;
    if (!visa) return;
    let { country, visa_type } = visa || {};

    return (
      <div
        className={
          full
            ? "col-11"
            : in_consultations
            ? "col-xl-3 col-lg-4 col-md-6 col-sm-12"
            : "col-xl-4 col-lg-4 col-md-6 col-sm-12"
        }
      >
        <div className="crs_grid">
          <div className="crs_grid_thumb" style={{ minHeight: 10 }}>
            {edit ? (
              <div className="">
                <div className="cursor-pointer px-2" onClick={edit}>
                  <i className={`fa fa-edit`}></i>
                </div>
                <div className="cursor-pointer px-2" onClick={remove}>
                  <i className={`fa fa-trash`}></i>
                </div>
              </div>
            ) : null}
          </div>
          <div className="crs_grid_caption">
            <div className="overl_top">
              <Link href={`/c/${country?.name}/${country?._id}`}>
                <Preview_image
                  height={40}
                  image={country?.image}
                  image_hash={country?.image_file_hash}
                  className="img-fluid circle"
                  alt=""
                />
                <span style={{ marginLeft: 20, fontWeight: "bold" }}>
                  {country?.name}
                </span>
              </Link>
            </div>
            <div className="crs_cates cl_4 mt-2">
              <span>{visa_type?.title}</span>
            </div>

            <div className="crs_title">
              <h3 style={{ flexWrap: "wrap", wordBreak: "break-word" }}>
                <Link
                  href={`/consultation/${_id}`}
                  onClick={() => {
                    save_to_session("consultation", {
                      ...consultation,
                    });
                    scroll_to_top();
                  }}
                  className="crs_title_link"
                >
                  {title}
                </Link>
              </h3>
            </div>
            <div className="crs_info_detail">
              <ul style={{ overflowX: "auto" }} className="no_scrollbar">
                {price_breakdown.map((p, index) => (
                  <span key={index} className="mr-4">
                    <span className="text-secondary">
                      {to_title(p.service_name)}
                    </span>
                    <br />
                    <span>
                      {p.price ? (
                        <b>{commalise_figures(Number(p.price))}</b>
                      ) : (
                        <b>Free</b>
                      )}
                    </span>
                  </span>
                ))}
              </ul>
            </div>
            <div className="crs_grid_foot" style={{ padding: "10px 0" }}>
              <div className="crs_flex">
                <div className="crs_fl_first mt-2">
                  <div className="crs_tutor">
                    <div className="">
                      <Link href={`/expert/${expert._id}`}>
                        <Preview_image
                          image={expert.image}
                          height={50}
                          width={50}
                          image_hash={expert.image_hash}
                          class_name="circle"
                        />
                      </Link>
                    </div>
                    <div
                      className="crs_tutor_name"
                      style={{ flexWrap: "wrap", zIndex: 99 }}
                    >
                      <Link href={`/expert/${expert._id}`}>
                        <h5 style={{ marginBottom: 1 }}>
                          {to_title(`${expert.firstname} ${expert.lastname}`)}
                        </h5>
                      </Link>
                      <span>Consultant </span>
                    </div>
                  </div>
                </div>
                <div className="crs_fl_last">
                  <div className="crs_linkview">
                    <Link
                      href={`/book_appointment?consultation=${_id}`}
                      className="btn btn_view_detail theme-bg text-light"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Consultation;
