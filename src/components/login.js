"use client";

import React from "react";
import Link from "next/link";
import Stretch_button from "./stretch_button";
import { post_request } from "@/assets/js/utils/services";
import { email_regex } from "@/assets/js/utils/functions";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  proceed = async () => {
    let { email, password, logging_in } = this.state;
    if (logging_in) return;
    let { action, no_redirect } = this.props;

    this.setState({ logging_in: true });

    if (!email_regex.test(email) || !password) return;

    let res = await post_request("login", { email, password });

    if (res && res._id) {
      action && action(res);
      this.login(res, no_redirect);
    } else
      this.setState({
        message: res?.message || "Cannot login at the moment",
        logging_in: false,
      });
  };

  render() {
    let { toggle } = this.props;
    let { reveal_password, message, email, password, logging_in } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Login Your Account</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form">
              <form>
                <div class="form-group">
                  <label>Email</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={email}
                      onChange={({ target }) =>
                        this.setState({
                          email: target.value,
                          message: "",
                        })
                      }
                      placeholder="Email"
                    />
                    <i class="ti-user"></i>
                  </div>
                </div>

                <div class="form-group">
                  <label>Password</label>
                  <div class="input-with-icon">
                    <input
                      type={reveal_password ? "text" : "password"}
                      class="form-control"
                      placeholder="*******"
                      value={password}
                      onChange={({ target }) =>
                        this.setState({
                          password: target.value,
                          message: "",
                        })
                      }
                    />
                    <i class="ti-unlock"></i>
                  </div>
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

                <div class="form-group">
                  <Stretch_button
                    action={this.proceed}
                    title="login"
                    loading={logging_in}
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="crs_log__footer d-flex justify-content-between mt-0">
            <div class="fhg_45">
              <p class="musrt">
                Don't have account?{" "}
                <Link href="/signup" class="theme-cl">
                  Sign Up
                </Link>
              </p>
            </div>
            <div class="fhg_45">
              <p class="musrt">
                <Link href="/forgot_password" class="text-danger">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
