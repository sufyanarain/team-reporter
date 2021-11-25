import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Nav from '../signup/navbar/Nav'
import TeamCards from './teamCards'
import CreateTeamBtn from './CreateTeamBtn'

import { db } from '../../Firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

let currentUser = localStorage.getItem('currentUser')
currentUser = JSON.parse(currentUser)

function Teams() {
  const history = useHistory();
  let [teamsCard, setTeamsCard] = useState([])
  console.log(teamsCard)

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, 'teams'),
        where('adminUid', '==', currentUser.uid),
      )
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const arr = []
        querySnapshot.forEach((doc) => {
          arr.push(doc.data())
        })
        setTeamsCard(arr)
        console.log('Current cities in CA: ', arr)
      })
    }
  }, [])

  return (
    <div>
      <Nav />
      <h2>Teams You Own</h2>
      {teamsCard.map((elem, index) => {
        return (
          <TeamCards
            name={elem.teamUid}
            teamName={`Team Name :  ${elem.teamName}`}
            members={elem.members}
            settingFunc={() => {
              console.log(elem.teamUid)
              localStorage.setItem('currentTeamUid',elem.teamUid)
              history.push("/Settings");

            }}
          />
        )
      })}
      {/* <TeamCards /> */}
      <CreateTeamBtn />
    </div>
  )
}

export default Teams
