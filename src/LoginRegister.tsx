import AppLayout from "./AppLayout";
import { FormEvent, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { useHistory } from "react-router-dom";

export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { isAuthenticated, isLoading, login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(email);
    console.log(password);

    try {
      await login(email.trim(), password);
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppLayout activeNav="login">
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign up</h1>
                <p className="text-xs-center">
                  <a href="">Have an account?</a>
                </p>

                {/*<ul className="error-messages">*/}
                {/*  <li>That email is already taken</li>*/}
                {/*</ul>*/}

                <form onSubmit={handleSubmit}>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      required
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
