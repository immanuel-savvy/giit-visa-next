"use client";

import React from "react";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";
import Alert_box from "../../components/alert_box";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import { domain } from "@/assets/js/utils/constants";
import { post_request } from "@/assets/js/utils/services";

class Add_restaurant extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { restaurant } = this.props;
    this.state = { ...restaurant };
  }

  componentDidMount = async () => {};

  add = async () => {
    let { toggle, on_add, city } = this.props;

    let { name, _id, image } = this.state;
    this.setState({ loading: true });

    let cat = {
      name: name.trim(),
      image,
      city: city._id,
      country: city.country,
      _id,
    };

    let result = await post_request(
      _id ? "update_restaurant" : "add_restaurant",
      cat
    );

    if (result?._id) {
      cat._id = result._id;
      cat.created = result.created;
      cat.image = result.image;

      on_add(cat);
      toggle();
    } else {
      this.setState({
        message: result?.message || "Cannot create restaurant at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let { name, loading, _id, image, image_file_loading, message } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Add Restaurant" toggle={toggle} />

          <div class="modal-body">
            <div class="login-form">
              <form>
                <div className="form-group smalls">
                  <label>Image*</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={(e) =>
                        this.handle_file(e, "image", null, null, true)
                      }
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose Image
                    </label>
                  </div>
                  {image_file_loading ? (
                    <Loadindicator />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <span>
                        <img
                          className="py-3 rounded"
                          style={{
                            maxHeight: 200,
                            maxWidth: 200,
                            marginRight: 10,
                          }}
                          src={
                            image && image.startsWith("data")
                              ? image
                              : `${domain}/images/${image}`
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label>Name</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={name}
                      onChange={({ target }) =>
                        this.setState({
                          name: target.value,
                          message: "",
                        })
                      }
                      placeholder="Title"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                {message ? <Alert_box message={message} /> : null}

                <div class="form-group mt-2">
                  <Stretch_button
                    disabled={!image || !name?.trim()}
                    loading={loading}
                    title={_id ? "Update" : "Add"}
                    action={this.add}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_restaurant;
