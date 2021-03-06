import React, { useEffect, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import Button from "components/Button";

import AttemptQuiz from "./AttemptQuiz";
import ErrorPage from "./ErrorPage";

import publicQuizzesApi from "../../apis/publicQuizzes";
import usersApi from "../../apis/users";
import PageLoader from "../PageLoader";

const LoginUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [quizName, setQuizName] = useState("");
  const [quizId, setQuizId] = useState("");
  const [loading, setLoading] = useState(true);
  const [attemptId, setAttemptId] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    fetchQuizName(slug);
  }, []);

  const fetchQuizName = async slug => {
    try {
      const response = await publicQuizzesApi.showQuizName(slug);
      setQuizName(response.data.quiz_name);
      setQuizId(response.data.quiz_id);
      setLoading(false);
    } catch (error) {
      setError(true);
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);

      const response = await usersApi.create({
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          attempts_attributes: [
            {
              submitted: false,
              quiz_id: quizId,
            },
          ],
        },
      });
      //console.log(response)
      setAttemptId(response.data.attemptId);
      setLoading(false);
      setLogin(true);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (!error) {
    if (!login) {
      return (
        <div>
          <div className="text-5xl font-bold border-b-2 px-12">Quizzy</div>
          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 py-40 w-1/4">
              <div className="text-2xl font-bold">Welcome to {quizName}</div>
              <Input
                label="First Name"
                placeholder=""
                size="small"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Last Name"
                placeholder=""
                size="small"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
              <Input
                label="Email"
                placeholder=""
                size="small"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button type="submit" buttonText="Next" loading={loading} />
            </form>
          </div>
        </div>
      );
    }

    return <AttemptQuiz slug={slug} attemptId={attemptId} />;
  }

  return <ErrorPage />;
};
export default LoginUser;
