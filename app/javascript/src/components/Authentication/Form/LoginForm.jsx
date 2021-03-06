import React from "react";

import { Input } from "@bigbinary/neetoui/v2";

import Button from "components/Button";

const LoginForm = ({ handleSubmit, setEmail, setPassword, loading }) => {
  return (
    <div>
      <div className="text-5xl font-bold border-b-2 px-12">Quizzy</div>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 py-40 w-1/4">
          <div className="text-2xl font-bold">Login</div>
          <Input
            label="Email"
            placeholder="sam@example.com"
            size="small"
            type="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            placeholder="********"
            size="small"
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" buttonText="Submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
