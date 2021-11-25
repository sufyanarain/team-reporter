function TeamCards(props) {
  return (
    <div className="container mt-3">
      <div id="teamsDiv" className="card ">
        <div className="card-body">
          <h5>{props.teamName}</h5>
          <h6>
            members :{' '}
            <span>
              {props.members.map((mem) => {
                return ` ${mem} ,`
              })}
            </span>
          </h6>
          <button type="button" onClick={props.settingFunc} className="btn btn-dark">
            See more details
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamCards
