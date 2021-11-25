import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import {  createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../Firebase'
import {  setDoc, doc } from 'firebase/firestore'
import { useHistory } from 'react-router-dom'
import './signUp.css'

function Form() {
  let history = useHistory()
  //states for getting data from inputs
  let name = useState('')
  let email = useState('')
  let password = useState('')
  let Cpassword = useState('')

  //function to set data on firestore

  // function for firebase authentication
  let signUpFunc = async (e) => {
    createUserWithEmailAndPassword(auth, email[0], password[0])
      .then((userCredential) => {
        let user = userCredential.user
        // Signed in
        setDoc(doc(db, 'users', user.uid), {
          name: name[0],
          email: email[0],
          userUid: user.uid,
        })
        // console.log('Document written with ID: ', docRef.id)

        // const user = userCredential.user
        history.push('/')
        console.log(user)
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
        <form onSubmit={signUpFunc}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              required
              onChange={(e) => {
                name[1](e.target.value)
              }}
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
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
              required
              onChange={(e) => {
                password[1](e.target.value)
              }}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cPassword" className="form-label">
              Confirm Password
            </label>
            <input
              required
              onChange={(e) => {
                Cpassword[1](e.target.value)
              }}
              type="password"
              className="form-control"
              id="cPassword"
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
          <Link to="/" id="loginBtn" className="btn btn-outline-primary ml-2">
            Login
          </Link>
        </form>
      </Container>
    </div>
  )
}

export default Form
