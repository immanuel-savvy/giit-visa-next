"use client";

import React from "react";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Question from "../../components/question";
import New_question from "./new_question";
import Modal_form_title from "../../components/modal_form_title";
import Text_btn from "../../components/text_btn";
import { post_request } from "@/assets/js/utils/services";

class Manage_questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { visa } = this.props;
    let questions = await post_request("visa_questions", {
      visa: visa._id,
    });

    this.setState({ questions });
  };

  remove_question = async (index) => {
    let { questions } = this.state;
    let question = questions.splice(index, 1);

    this.setState({ questions });

    question.length &&
      (await post_request("remove_question", {
        question: question[0]._id,
        visa: this.props.visa._id,
      }));
  };

  new_question = async (question) => {
    let { questions, loading, question_in_edit } = this.state;
    if (loading) return;
    this.setState({ loading: true });

    let { visa } = this.props;
    question.visa = visa._id;

    let res = await post_request(
      question_in_edit ? "update_question" : "new_question",
      question
    );
    question._id = res._id;
    question.created = res.created;

    if (question_in_edit)
      questions = questions.map((q) => {
        if (q._id === question_in_edit._id) return question;
        return q;
      });
    else questions = new Array(question, ...questions);
    this.setState({ questions, loading: false, question_in_edit: null });
  };

  edit_question = (question) => {
    let { new_question } = this.state;
    new_question
      ? this.setState({ new_question: false }, () =>
          this.edit_question(question)
        )
      : this.setState({ question_in_edit: question, new_question: true });
  };

  toggle_new_question = () =>
    this.setState({
      new_question: !this.state.new_question,
      question_in_edit: null,
    });

  render() {
    let { toggle } = this.props;
    let { questions, question_in_edit, new_question, loading } = this.state;

    return (
      <div className="m-3">
        <Modal_form_title title="Manage Questions" toggle={toggle} />
        {new_question ? (
          <New_question
            new_question={this.new_question}
            loading={loading}
            question={question_in_edit}
            toggle={this.toggle_new_question}
          />
        ) : (
          <Text_btn
            action={this.toggle_new_question}
            text="Question"
            icon="fa-plus"
          />
        )}
        <hr />

        <span>Visa Questions</span>
        <br />
        <br />
        {questions ? (
          questions.length ? (
            questions.map((q, i) => (
              <Question
                question={q}
                key={q._id}
                index={i + 1}
                remove={() =>
                  window.confirm("Are you sure to remove this question?") &&
                  this.remove_question(i)
                }
                editable={() => this.edit_question(q)}
              />
            ))
          ) : (
            <Listempty text="No questions set yet." />
          )
        ) : (
          <Loadindicator contained />
        )}
      </div>
    );
  }
}

export default Manage_questions;
