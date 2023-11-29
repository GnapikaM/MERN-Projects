import React, { useState } from "react";

import { lock } from "../../assets/images/index.js";
import AuthForm from "./AuthForm.jsx";

const Auth = () => {
  const [isSignup, setSignup] = useState(false);

  return (
    <div className="h-[110vh] bg-authbg bg-no-repeat bg-cover flex flex-col items-center justify-center">
      <div>
        <img src={lock} alt="lock image" width={70} />
      </div>
      <h1 className="my-5 text-3xl font-bold font-palanquin">
        {isSignup ? "Sign Up" : "Sign In"}
      </h1>
      <AuthForm isSignup={isSignup} setSignup={setSignup} />
    </div>
  );
};

export default Auth;
