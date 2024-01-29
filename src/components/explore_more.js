"use client";

import React from "react";
import Link from "next/link";
import { scroll_to_top, to_title } from "@/assets/js/utils/functions";

const Explore_more = ({ to }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-7 col-md-8 mt-2">
        <div className="text-center">
          <Link href={`/${to}`} onClick={scroll_to_top}>
            <span className="btn btn-md theme-bg-light theme-cl">
              Explore More {to_title(to)}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore_more;
