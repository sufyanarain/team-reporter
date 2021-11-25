import React from 'react'
import Nav from '../signup/navbar/Nav'
import Tabs from './tabs/Tabs'
import AddQuestions from './addQuestions/AddQuestions'
import DisplayQuestions from './displayQuestions/DisplayQuestions'

export const Settings = () => {
  return (
    <div>
      <Nav />
      <Tabs />
      <div className="container">
        <hr />
        <h5>Team : NewTeam</h5>
        <hr />
      </div>
      <AddQuestions/>
      <DisplayQuestions/>
    </div>
  )
}
