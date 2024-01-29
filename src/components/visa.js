"use client";

import React from "react";
import Preview_image from "./preview_image";
import Modal from "./modal";
import Manage_questions from "../sections/dashboard/manage_questions";
import { scroll_to_top, to_title } from "@/assets/js/utils/functions";
import { save_to_session } from "../sections/footer";
import Link from "next/link";

class Visa extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_questions = () => this.questions?.toggle();

  render() {
    let { visa, full, fullest, in_scoring, remove, in_visas, edit } =
      this.props;
    let { title, country, _id, perks, visa_type, complexity, duration } = visa;

    return (
      <div
        className={
          fullest
            ? "col-12"
            : full
            ? "col-11"
            : in_visas || edit
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
              <Link href={`/c/${country.name}/${country._id}`}>
                <Preview_image
                  height={40}
                  image={country.image}
                  image_hash={country.image_file_hash}
                  className="img-fluid circle"
                  alt=""
                />
                <span style={{ marginLeft: 20, fontWeight: "bold" }}>
                  {country.name}
                </span>
              </Link>
            </div>
            <div className="crs_cates cl_4 mt-2">
              <span>{visa_type.title}</span>
            </div>
            <div className="crs_title">
              <h3>
                <Link
                  href={`/visa/${visa._id}`}
                  onClick={() => {
                    save_to_session("visa", {
                      ...visa,
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
              <ul>
                <span className="mr-4">
                  <span className="text-secondary">Duration</span>
                  <br />
                  <span>
                    <b>{duration} days</b>
                  </span>
                </span>

                <span>
                  <span className="text-secondary">Complexity:</span>
                  <br />
                  <span>
                    <b>{to_title(complexity)}</b>
                  </span>
                </span>
              </ul>
            </div>
            <hr />
            <div>
              {perks.map((perk) => (
                <div key={perk} className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-light-success theme-cl small d-flex align-items-center justify-content-center">
                      <i className="fas fa-check"></i>
                    </div>
                    <p className="mb-0 ml-3">{to_title(perk)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="crs_grid_foot">
              <div className="crs_flex">
                {in_scoring ? null : (
                  <div className="crs_fl_first">
                    <div className="crs_price">
                      <Link
                        onClick={edit ? this.toggle_questions : null}
                        href={edit ? "" : `/scoring?visa=${_id}`}
                      >
                        <h6>
                          {edit ? "Manage Scoring" : "take a scoring test"}
                        </h6>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="crs_fl_last">
                  <div className="crs_linkview">
                    <Link
                      href={`/visa/${_id}#appointments`}
                      className="btn btn_view_detail theme-bg text-light"
                    >
                      Find Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal ref={(questions) => (this.questions = questions)}>
          <Manage_questions toggle={this.toggle_questions} visa={visa} />
        </Modal>
      </div>
    );
  }
}

export default Visa;
