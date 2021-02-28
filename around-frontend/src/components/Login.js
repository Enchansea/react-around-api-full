import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login (props) {

  const [ username, setUsername] = useState('');
  const [ password, setPassword ] = useState('');

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(username, password);
    props.handleLogin(username, password);
  }

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      history.push('/');
    }
  }, [history])



  return (
    <div>
      <form action="#" className="login" onSubmit={handleSubmit}>
        <h3 className="login__title">Log In</h3>
        <input className="login__input" name="username" type="email" value={username} onChange={e => setUsername(e.target.value)} placeholder="Email" required />
        <input className="login__input" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" className="login__button">Log in</button>
        <div>
          <Link to="signup" className="login__note">Not a member yet? Sign up here!</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;
