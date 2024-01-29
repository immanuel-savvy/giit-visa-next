"use client";

import Preview_image from "@/src/components/preview_image";
import React from "react";

class Visa_media extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { visa } = this.props;
    let { image, image_file_hash } = visa;

    return (
      <>
        <div class="property_video radius lg mb-4">
          <div class="thumb">
            <Preview_image
              image={image}
              image_hash={image_file_hash}
              class_name="pro_img img-fluid w100"
            />
          </div>
        </div>
      </>
    );
  }
}

export default Visa_media;
