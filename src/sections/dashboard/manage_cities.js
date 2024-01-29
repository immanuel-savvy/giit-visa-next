"use client";

import React from "react";
import Add_city from "./add_city";
import Modal_form_title from "../../components/modal_form_title";
import Modal from "../../components/modal";
import Text_btn from "../../components/text_btn";
import City from "./city";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import { get_request, post_request } from "@/assets/js/utils/services";

class Manage_cities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { country } = this.props;

    let cities = await get_request(`cities/${country._id}`);

    this.setState({ cities });
  };

  on_add = (city) => {
    let { cities, city_in_edit } = this.state;

    if (city_in_edit)
      cities = cities.map((city_) =>
        city_._id === city_in_edit._id ? city : city_
      );
    else cities = new Array(city, ...cities);

    this.setState({
      cities,
      city_in_edit: null,
    });
  };

  edit = (city) => this.setState({ city_in_edit: city }, this.toggle_add_city);

  remove = async (city) => {
    let { _id, name, country } = city;

    if (!window.confirm(`Are you sure to remove \`${name}\``)) return;
    let { cities } = this.state;
    cities = cities.filter((c) => c._id !== _id);

    this.setState({ cities });

    await post_request("remove_city", { city: _id, country });
  };

  toggle_add_city = () => this.city?.toggle();

  render() {
    let { toggle, country } = this.props;
    let { city_in_edit, cities } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Manage Cities" toggle={toggle} />

          <div className="row mx-2">
            {cities ? (
              cities.length ? (
                cities.map((city) => (
                  <City
                    edit={this.edit}
                    remove={this.remove}
                    city={city}
                    key={city._id}
                  />
                ))
              ) : (
                <Listempty />
              )
            ) : (
              <Loadindicator />
            )}
          </div>
          <Text_btn
            text="Add"
            icon="fa-plus"
            style={{ textAlign: "center", fontWeight: "900" }}
            action={this.toggle_add_city}
          />

          <div class="modal-body">
            <Modal ref={(city) => (this.city = city)}>
              <Add_city
                city={city_in_edit}
                country={country}
                on_add={this.on_add}
                toggle={this.toggle_add_city}
              />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage_cities;
