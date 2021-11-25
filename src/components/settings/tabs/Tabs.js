import React from 'react'
import './tabs.css'

export default function Tabs() {
  return (
    <div className='mainHead text-success text-center mt-2 container-sm'>
      <a href="reports.html">
          <button type="button" className="btn btn-outline-primary">
            <i className="bi bi-card-checklist"></i> Reports
          </button>
      </a>
      <a href="team.html">
          <button type="button" className="btn active btn-outline-primary">
            <i className="bi bi-gear"></i> Settings
          </button>
      </a>
    </div>
  )
}
