"use client";

import React from "react";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";
import Alert_box from "../../components/alert_box";
import Text_btn from "../../components/text_btn";
import Modal from "../../components/modal";
import Add_restaurant from "./add_restaurant";
import Restaurant from "../../components/restaurant";
import { post_request } from "@/assets/js/utils/services";

class Add_city extends React.Component {
  constructor(props) {
    super(props);

    let { city } = this.props;
    this.state = { city: city?.name || "", ...city };
  }

  componentDidMount = async () => {
    let { city } = this.props;
    let restaurants = await post_request("restaurants", { city: city._id });
    this.setState({ restaurants });
  };

  on_add = (restaurant) => {
    let { restaurants, restaurant_in_edit } = this.state;

    if (restaurant_in_edit)
      restaurants = restaurants.map((restaurant_) =>
        restaurant_._id === restaurant_in_edit._id ? restaurant : restaurant_
      );
    else restaurants = new Array(restaurant, ...restaurants);

    this.setState({
      restaurants,
      restaurant_in_edit: null,
    });
  };

  add = async () => {
    let { toggle, on_add, country } = this.props;
    let { city: name, _id } = this.state;
    this.setState({ loading: true });

    let cat = {
      name: name.trim(),
      country: country._id,
      city: _id,
    };

    let result = await post_request(_id ? "update_city" : "add_city", cat);

    if (result?._id) {
      cat._id = result._id;
      cat.created = result.created;

      on_add(cat);
      toggle();
    } else {
      this.setState({
        message: result?.message || "Cannot create city at the moment.",
        loading: false,
      });
    }
  };

  edit = (restaurant) => {
    this.setState(
      { restaurant_in_edit: restaurant },
      this.toggle_add_restaurant
    );
  };

  remove = async (restaurant) => {
    if (!window.confirm("Are you sure to remove restaurant?")) return;

    let { restaurants } = this.state;
    restaurants = restaurants.filter((res) => res._id !== restaurant._id);
    this.setState({ restaurants });

    await post_request("remove_restaurant", {
      _id: restaurant._id,
      city: restaurant.city,
    });
  };

  toggle_add_restaurant = () => this.res?.toggle();

  render() {
    let { toggle } = this.props;
    let { city, loading, _id, message, restaurant_in_edit, restaurants } =
      this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Add City" toggle={toggle} />

          <div class="modal-body">
            <div class="login-form">
              <form>
                <div class="form-group">
                  <label>Name</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={city}
                      onChange={({ target }) =>
                        this.setState({
                          city: target.value,
                          message: "",
                        })
                      }
                      placeholder="Title"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                {_id ? (
                  <Text_btn
                    text="Add Restaurant"
                    icon="fa-plus"
                    action={this.toggle_add_restaurant}
                  />
                ) : null}

                {restaurants?.length
                  ? restaurants.map((restaurant) => (
                      <Restaurant
                        restaurant={restaurant}
                        class_name={`col-sm-12 col-md-6`}
                        key={restaurant._id}
                        edit={() => this.edit(restaurant)}
                        remove={() => this.remove(restaurant)}
                      />
                    ))
                  : null}

                {message ? <Alert_box message={message} /> : null}

                <div class="form-group mt-2">
                  <Stretch_button
                    disabled={!city.trim()}
                    loading={loading}
                    title={_id ? "Update" : "Add"}
                    action={this.add}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal ref={(res) => (this.res = res)}>
          <Add_restaurant
            toggle={this.toggle_add_restaurant}
            restaurant={restaurant_in_edit}
            city={this.props.city}
            on_add={this.on_add}
          />
        </Modal>
      </div>
    );
  }
}

export default Add_city;
