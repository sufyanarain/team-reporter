import { useRef, useEffect, useState } from 'react'
import '../teamsPage/CreateTeamBtn.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, setDoc, doc, getDocs } from 'firebase/firestore'

function CreateTeamBtn() {
  // getting users data from local storage
  let currentUser = localStorage.getItem('currentUser')
  currentUser = JSON.parse(currentUser)

  // getting selected members from modal
  const getMembersArr = []
  const showMembersArr = []
  const [membersArr, setMembersArr] = useState([])
  const [showMembers, setShowMembers] = useState([])

  console.log(showMembers)

  // firebase authentication
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
      console.log(uid)
    } else {
      // User is signed out
      // ...
    }
  })

  // getting user's data from firebase
  useEffect(() => {
    getDataFromFirestore()
  }, [])

  const getDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      getMembersArr.push(doc.data().email)
      console.log(doc.data())
    })
    setMembersArr(getMembersArr)
  }

  const [selectedCategory, setSelectedCategory] = useState('Testing Team')

  const membersUl = useRef()
  const teamName = useRef()
  const selectCategoryHandler = (e) => {
    setSelectedCategory(e.target.value)
  }

  const createTeam = () => {
    let teamUid = new Date().getTime()
    console.log(teamName.current.value)
    // Add a new document in collection "teams"
    setDoc(doc(db, 'teams', `${teamUid}`), {
      teamName: teamName.current.value,
      teamUid: teamUid,
      adminEmail: currentUser.email,
      adminUid: currentUser.uid,
      category: selectedCategory,
      members: showMembers,
    })
  }
  useEffect(() => {}, [])
  const addMembersToNewTeam = (e) => {
    setShowMembers((statt) => [...statt, e.target.innerText])
    // showMembersArr.push(e.target.innerText)
    console.log(showMembersArr)
    // setShowMembers(e.terget)
    e.target.remove()
    console.log(e.target.innerText)
  }

  return (
    <div>
      {/* Button trigger modal */}
      <button
        id="modalBBtn"
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Create Team
      </button>

      {/* Modal  */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create new Team
              </h5>
              <button
                type="button"
                className="btn-classNameose"
                data-bs-dismiss="modal"
                aria-label="classNameose"
              ></button>
            </div>
            <div className="modal-body">
              {/* input box  */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  ref={teamName}
                  placeholder="Team Name"
                />
              </div>
              {/* select bar  */}
              <select
                onChange={selectCategoryHandler}
                value={selectedCategory}
                className="form-select"
                aria-label="Default select example"
              >
                {/* <option selected>Select Category</option> */}
                <option value="Testing Team">Testing Team</option>
                <option value="Development team">Development team</option>
                <option value="Marketing team">Marketing team</option>
              </select>
              {/* end select bar  */}
              {/* input box  */}
              <hr />
              <h5 id="addMembersHead" className="mt-2">
                Add Members
              </h5>
              <hr />
              <div className="mt-3">
                <ul
                  id="addedMembers"
                  className="addedMembers"
                  //   id="membersUl"
                >
                  {showMembers.map((memb) => {
                    return <li>{memb}</li>
                  })}
                </ul>
              </div>
              <hr />
              <div>
                {/* <ul id="selectedMembers">
                  <li>Sufyan</li>
                  <li>Zubair</li>
                </ul> */}
              </div>
              <hr />
              <div className="mt-3">
                <ul className="membersUl" ref={membersUl}>
                  {membersArr.map((member, index) => {
                    return (
                      <li onClick={addMembersToNewTeam.bind(this)}>{member}</li>
                    )
                  })}
                  {/* <li>zubair</li> */}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="createTeam"
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={createTeam}
              >
                Create
              </button>
              {/* <button type="button" className="btn btn-primary">Save changes</button>  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTeamBtn
