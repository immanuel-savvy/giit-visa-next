"use client";

import React from "react";
import Icon_btn from "./icon_btn";
import { to_title } from "@/assets/js/utils/functions";

class Modal_form_title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { toggle, title, text, style } = this.props;

    return (
      <div style={{ ...style }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 10,
          }}
        >
          <div>&nbsp;</div>
          <div className="rcs_log_124">
            <div className="Lpo09">
              <h4>{to_title(title)}</h4>
            </div>
          </div>

          <Icon_btn toggle={toggle} />
        </div>

        {text ? <p className="text-center mb-4">{text}</p> : null}
      </div>
    );
  }
}

export default Modal_form_title;
