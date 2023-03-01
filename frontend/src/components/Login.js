import { useState } from 'react'

function Login(props) {
  const [disabled, setDisabled] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);

    props.client
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        setDisabled(false);
        props.loggedIn(response.data.token);
      })
      .catch((err) => {
        console.log(err);
        alert("an error occursed, please try again");
        setDisabled(false);
      });
  };

  return (
    <>
      Login
      <br />
      <form onSubmit={(e) => submitHandler(e)}>
        username
        <br />
        <input type="text" name="username" disabled={disabled} />
        <br />
        password
        <br />
        <input type="password" name="password" disabled={disabled} />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;