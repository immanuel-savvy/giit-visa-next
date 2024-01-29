"use client";

import React from "react";
import Listempty from "@/src/components/listempty";
import Loadindicator from "@/src/components/loadindicator";
import { post_request } from "@/assets/js/utils/services";
import Visa from "@/src/components/visa";

class Article_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_param: "",
      search_results: new Array(),
    };
  }

  componentDidMount = async () => {
    let { article } = this.props;
    let { visa_type } = article;

    if (visa_type) {
      let visas = await post_request("visas", {
        limit: 3,
        query: { visa_type: visa_type._id },
      });
      this.setState({ visas });
    }
  };

  render() {
    let { article } = this.props;
    let { visa_type } = article;
    let { visas } = this.state;

    return (
      <div class="col-lg-4 col-md-12 col-sm-12 col-12">
        <div class="single_widgets widget_search">
          <h4 class="title">{visa_type.title}</h4>
        </div>

        {visas ? (
          visas.length ? (
            visas.map((visa) => <Visa visa={visa} fullest />)
          ) : (
            <Listempty />
          )
        ) : (
          <Loadindicator />
        )}
      </div>
    );
  }
}

export default Article_sidebar;
