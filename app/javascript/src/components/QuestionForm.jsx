import React from "react";

import { Input, Select, Button } from "@bigbinary/neetoui/v2";

import Button2 from "components/Button";
import Container from "components/Container";

const QuestionForm = ({
  quiz,
  setQuestion,
  answer,
  setAnswer,
  options1,
  handleChange,
  handleAdd,
  handleRemove,
  handleSubmit,
  loading,
}) => {
  return (
    <Container>
      <div className="flex-col space-y-40 mt-10">
        <div className="text-3xl font-bold">{quiz.quiz_name}</div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Question"
            placeholder=""
            size="small"
            type="text"
            onChange={e => setQuestion(e.target.value)}
          />
          {options1.map((opt, id) => {
            if (id <= 1) {
              return (
                <div key={`${opt}-${id}`}>
                  <Input
                    label={`Option ${id + 1}`}
                    placeholder=""
                    size="small"
                    type="text"
                    onChange={e => handleChange(id, e)}
                  />
                </div>
              );
            }

            return (
              <div key={`${opt}-${id}`}>
                <Input
                  label={`Option ${id + 1}`}
                  placeholder=""
                  size="small"
                  type="text"
                  onChange={e => handleChange(id, e)}
                />
                <Button
                  label="Remove"
                  onClick={() => handleRemove(id)}
                  style="secondary"
                />
              </div>
            );
          })}

          {options1.length <= 3 && (
            <Button
              label="+ Add option"
              onClick={() => handleAdd()}
              style="link"
            />
          )}

          <div className="p-4 mb-2">
            <Select
              defaultValue={{
                label: "Select an option",
                value: "",
              }}
              isClearable
              isSearchable
              label="Correct answer"
              name="ValueList"
              options={options1.map(opt => {
                //console.log(opt)
                return {
                  label: opt.value,
                  value: opt.value,
                };
              })}
              placeholder="Select an Option"
              value={answer}
              onChange={val => setAnswer(val)}
            />
          </div>
          <Button2 type="submit" buttonText="Submit" loading={loading} />
        </form>
      </div>
    </Container>
  );
};
export default QuestionForm;
