"use client";

import { email_regex } from "@/assets/js/utils/functions";
import { post_request } from "@/assets/js/utils/services";
import Loadindicator from "@/src/components/loadindicator";
import Link from "next/link";
import React from "react";
import img from "../../assets/img/loginbg4.jpg";
import Image from "next/image";

class Login_form extends React.Component {
  constructor(props) {
    super(props);

    this.state = new Object();
  }

  proceed = async () => {
    let { email, password, logging_in } = this.state;
    if (logging_in) return;

    this.setState({ logging_in: true });

    if (!email_regex.test(email) || !password) return;

    let res = await post_request("login", { email, password });
    if (res && res._id) {
      this.login(res);
    } else this.setState({ message: res, logging_in: false });
  };

  render() {
    let { email, reveal_password, password, message, logging_in } = this.state;

    return (
      <form>
        <div className="crs_log_wrap">
          <div className="crs_log__thumb">
            <Image src={img} width="100%" className="img-fluid" alt="" />
          </div>
          <div className="crs_log__caption">
            <div className="rcs_log_123">
              <div className="rcs_ico">
                <i className="fas fa-lock"></i>
              </div>
            </div>

            <div className="rcs_log_124">
              <div className="Lpo09">
                <h4>Login Your Account</h4>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="you@mail.com"
                  value={email}
                  onChange={({ target }) =>
                    this.setState({
                      email: target.value,
                      message: "",
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type={reveal_password ? "text" : "password"}
                  className="form-control"
                  placeholder="*******"
                  value={password}
                  onChange={({ target }) =>
                    this.setState({
                      password: target.value,
                      message: "",
                    })
                  }
                />
                <a
                  onClick={() =>
                    this.setState({
                      reveal_password: !this.state.reveal_password,
                    })
                  }
                  style={{ cursor: "pointer" }}
                  className="text-dark"
                >
                  {`${reveal_password ? "Hide" : "Show"}`}
                </a>
              </div>
              {message ? <p className="text-danger">{message}</p> : null}
              <div className="form-group">
                {logging_in ? (
                  <Loadindicator />
                ) : (
                  <button
                    type="button"
                    className="btn full-width btn-md theme-bg text-white"
                    onClick={this.proceed}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="crs_log__footer d-flex justify-content-between">
            <div className="fhg_45">
              <p className="musrt">
                Don't have account?{" "}
                <Link href="/signup" className="theme-cl">
                  SignUp
                </Link>
              </p>
            </div>
            <div className="fhg_45">
              <p className="musrt">
                <Link href="/forgot_password" className="text-danger">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login_form;
