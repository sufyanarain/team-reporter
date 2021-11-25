import React, { useState, useRef } from 'react'

import { db } from '../../../Firebase'
import { setDoc, doc, updateDoc } from 'firebase/firestore'

let counter
const AddQuestions = () => {
  let currentTeamUid = localStorage.getItem('currentTeamUid')
  currentTeamUid = JSON.parse(currentTeamUid)

  console.log(currentTeamUid)
  let getCounterVal = localStorage.getItem(`${currentTeamUid}`)

  if (getCounterVal) {
    if (getCounterVal === currentTeamUid) {
      counter = Number(currentTeamUid)
    }
  } else {
    counter = 0
  }
  const [addQuestions, setAddQuestions] = useState()

  const questionInp = useRef()
  const setQuestionsFireStore = async () => {
    counter += 1
    console.log(currentTeamUid)
    localStorage.setItem(`${currentTeamUid}`, `${counter}`)
    console.log(questionInp.current.value)
    let qProperty = `q${counter}`

    if (counter === 1) {
      console.log('counter === 0')
      setDoc(doc(db, 'questions', `${currentTeamUid}`), {
        [qProperty]: questionInp.current.value,
      })
    } else {
      console.log('counter is not === 0')

      const addQuestFunc = doc(db, 'questions', `${currentTeamUid}`)
      // Set the "capital" field of the city 'DC'
      updateDoc(addQuestFunc, {
        [qProperty]: questionInp.current.value,
      })
    }
  }

  return (
    <div className="container">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary mb-2 "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {/* <!-- <i className="bi bi-plus"></i> --> */}
        Add Question
      </button>
      {/* <!-- questions --> */}

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Question
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <!-- input box --> */}
              <div className="mb-3">
                <input
                  ref={questionInp}
                  type="text"
                  className="form-control"
                  id="questionInp"
                  placeholder="Type Question"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={setQuestionsFireStore}
                id="addQuestionBtn"
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Add
              </button>
              {/* <!-- <button type="button" className="btn btn-primary">Save changes</button> --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuestions
