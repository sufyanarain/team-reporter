import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../Firebase'

function LoginForm() {
  let history = useHistory()
  let email = useState('')
  let password = useState('')

  let loginFunc = (e) => {
    signInWithEmailAndPassword(auth, email[0], password[0])
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user, 'signed in')
        history.push('/Teams')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
      })

    e.preventDefault()
  }

  return (
    <div>
      <Container className="formDiv">
        <form onSubmit={loginFunc}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={(e) => {
                email[1](e.target.value)
              }}
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => {
                password[1](e.target.value)
              }}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link
            to="/SignUp"
            id="loginBtn"
            className="btn btn-outline-primary ml-2"
          >
            Signup
          </Link>
        </form>
      </Container>
    </div>
  )
}

export default LoginForm
