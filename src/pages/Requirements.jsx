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
                <h2 className="page-sub">Hours must come from a verifiable organization and cannot be from family members</h2>
            </div>
        </section>
    </div>
  )
}