import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { getBasketItems, selectBasket } from "../../features/basket/basket";
import { putUser } from "../../features/user/userSlice";
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const basket = useSelector(selectBasket);
  const basketItemCount = getBasketItems(basket);
  const dispatch = useDispatch();
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (basketItemCount > 0) {
          history.push("/addressselect");
        } else {
          history.push("/");
        }
        // console.log(authUser.user.uid);
      })
      .catch((error) => alert(error.message));
    setEmail("");
    setPassword("");
  };
  const registerMe = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        if (basketItemCount > 0) {
          history.push("/addressselect");
        } else {
          history.push("/");
        }
        await authUser.user.updateProfile({
          displayName: userName,
        });
        dispatch(
          putUser({
            email: email,
            displayName: userName,
            userId: authUser.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
    setUserName("");
    setEmail("");
    setPassword("");
  };
  const signUpSwitch = () => {
    setCreateAccount(!createAccount);
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>
      <div className="login_container">
        <h2>{!createAccount ? "Sign In" : "Create account"}</h2>
        <form>
          {createAccount && (
            <div>
              <label>Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!createAccount ? (
            <button
              type="submit"
              className="login__signInButton"
              onClick={signIn}
            >
              Sign In
            </button>
          ) : (
            <button
              type="submit"
              className="login__signInButton"
              onClick={registerMe}
            >
              Create account
            </button>
          )}
        </form>
        <p>
          By continuing, you agree to Amazon Fake Clone's Conditions of Use and
          Privacy Notice.
        </p>
        <button onClick={signUpSwitch} className="login__singUpButton">
          {!createAccount ? "Create your Amazon account" : "Go to sign in"}
        </button>
      </div>
    </div>
  );
}

export default Login;
