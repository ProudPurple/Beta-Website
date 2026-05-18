export default function Requirements() {
  return (
    <div>
        <section className="home-section">
            <h1 className="page-heading">Total Hour Requirements</h1>
            <h2 className="page-sub">Hour Requirements are Mandatory for Continued Membership</h2>
            <div className="hours-grid">
                <div className="hours-card hours-collection">
                    <div>
                        <div className="hours-number">25</div>
                        <div className="hours-label">Outside of Club</div>
                    </div>
                </div>
                <div className="hours-divider">or</div>
                <div className="hours-card hours-collection">
                    <div>
                        <div className="hours-number">15</div>
                        <div className="hours-label">Outside club</div>
                    </div>
                    <div className="hours-plus">+</div>
                    <div>
                        <div className="hours-number">5</div>
                        <div className="hours-label">In club</div>
                    </div>
                </div>
            </div>
            <div className="card">
                <p style = {{textAlign: "center"}}>Hours must come from a verifiable organization and cannot be from family members</p>
            <a href={'https://drive.google.com/uc?export=download&id=1_B7b73CFG10vmlEu39VuWw5up3dZKLze'} target="_blank" rel="noopener noreferrer" className="download-link">
                Download Hours Sheet
            </a>
            </div>
        </section>
    </div>
  )
}