export default function Attendance() {
  return (
    <div>
        <section className="home-section">
            <h1 className="page-heading">Attendance Forms</h1>
            <p className="page-sub">It is mandatory to submit an excuse or check in for every meeting</p>
            <div className="card">
              <div className="hours-grid attendance-grid" style={{justifyContent: 'center'}}>
                <a href={'#'} target="_blank" rel="noopener noreferrer" className="download-link" style={{margin: 0}}>
                  Check In Form
                </a>
                <div className="hours-divider" style={{marginTop: '0.5rem'}}>and</div>
                <a href={'#'} target="_blank" rel="noopener noreferrer" className="download-link" style={{margin: 0}}>
                  Absent Form
                </a>
              </div>
              <p className="page-note">We reserve the right to revoke your future membership if you do not attend meetings or give a valid excuse</p>
            </div>
        </section>
    </div>
  )
}