import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Home() {
  const [officers, setOfficers] = useState([])
  const [events, setEvents] = useState([])
  const [activeSession, setActiveSession] = useState(null)
  const [mission, setMission] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    const [officersRes, sessionRes, missionRes, ] = await Promise.all([
      supabase.from('officers').select('*'),
      supabase.from('sessions').select('*').eq('is_open', true).limit(1),
    ])

    if (officersRes.data) setOfficers(officersRes.data)

    if (sessionRes.data?.length) setActiveSession(sessionRes.data[0])
  }

  return (
    <div>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-badge">2026 – 2027</div>
        <h1 className="hero-title">Cambridge High School<br />Beta Club</h1>
        <p className="hero-tagline">Leadership · Service · Character · Achievement</p>
      </div>

      {/* ── MISSION ── */}
      <section className="home-section">
        <h2 className="section-heading">Our Mission</h2>
        <div className="card">
          <p className="mission-text">
            {mission || 'The National Beta Club began as the dream of our founder, Dr. John W. Harris, a professor at Wofford College in Spartanburg, SC. Since the first Beta Club was formed in Landrum, SC in 1934, The National Beta Club has become the nation’s largest independent, non-profit, educational youth organization. We are committed to recognizing and promoting high academic achievement, rewarding and nurturing worthy character, fostering leadership skills and encouraging service to others.'}
          </p>
        </div>
      </section>

      {/* ── JOIN REQUIREMENTS ── */}
      <section className="home-section">
        <h2 className="section-heading">Join Requirements</h2>
        <div className="hours-grid">
          <div className="hours-card hours">
            <div className="hours-number">All Members</div>
            <div className="hours-label">90+ Cumalitive Weighted Average</div>
          </div>
          <div className="hours-divider">and</div>
          <div className="hours-card hours">
            <div className="hours-number">Returning Members</div>
            <div className="hours-label">2025-2026 Hours Requirement Met</div>
          </div>
        </div>
      </section>

      {/* ── OFFICERS ── */}
      {officers.length > 0 && (
        <section className="home-section">
          <h2 className="section-heading">Current Officers</h2>
          <div className="officers-grid">
            {officers.map(officer => (
              <div className="officer-card" key={officer.id}>
                <div className="officer-photo-wrap">
                  {officer.photo_url
                    ? <img src={officer.photo_url} alt={officer.name} className="officer-photo" />
                    : <div className="officer-photo-placeholder">{officer.name?.[0]}</div>
                  }
                </div>
                <div className="officer-name">{officer.name}</div>
                <div className="officer-role">{officer.role}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}