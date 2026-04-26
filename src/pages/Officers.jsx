import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'

export default function Officers() {
  const [officers, setOfficers] = useState([])

  useEffect(() => {
    fetchOfficers()
  }, [])

  async function fetchOfficers() {
    const officersRes = await supabase.from('officers').select('*');
    if (officersRes.data)
        setOfficers(officersRes.data)
  }
  return (
    <div>
      <h1 className="page-heading">2026-2027 Officers</h1>
      <div className="officers-focus-grid">
        {officers.map(officer => (
          <div className="officer-focus-card" key={officer.id}>
            <div className="officer-focus-photo-wrap">
              {officer.photo_url
                ? <img src={officer.photo_url} alt={officer.name} className="officer-photo" />
                : <div className="officer-focus-photo-placeholder">{officer.name?.[0]}</div>
              }
            </div>
            <div className='officer-description'>
              <div className="officer-focus-name">{officer.name}</div>
              <div className="officer-focus-role">{officer.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}