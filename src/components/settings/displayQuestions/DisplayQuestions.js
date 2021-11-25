import React, { useEffect, useState } from 'react'
import { db } from '../../../Firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import './displayQuestions.css'
import { IoTrashOutline } from "react-icons/io5";


const DisplayQuestions = () => {
  const [question, setQuestions] = useState({q:1, s:3})

  let currentTeamUid = localStorage.getItem('currentTeamUid')
  currentTeamUid = JSON.parse(currentTeamUid)
  useEffect(() => {
    getQuestFromFirestore()
  }, [])
  const getQuestFromFirestore = async () => {
    const unsub = onSnapshot(
      doc(db, 'questions', `${currentTeamUid}`),
      (doc) => {
        setQuestions(doc.data())
        console.log('Document data:', doc.data())
        // console.log('Current data: ', doc.data())
      },
    )

    // const docRef = doc(db, 'questions', `${currentTeamUid}`)
    // const docSnap = await getDoc(docRef)

    // if (docSnap.exists()) {
    //   setQuestions(docSnap.data())
    //   console.log('Document data:', docSnap.data())
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log('No such document!')
    // }
  }

  return (
    <div>
      <div className="container">
        <ul id="questionUl" className="list-group">
            
          {Object.keys(question).map((quest) => {
            console.log(question[quest])

            return (
              <li className="list-group-item">
                <div>{question[quest]}</div>
                <div>
                  <IoTrashOutline/>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default DisplayQuestions
