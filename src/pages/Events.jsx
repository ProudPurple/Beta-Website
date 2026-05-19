import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'

export default function Events() {
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const eventRes = await supabase.from('events').select('*').order('date', {ascending: false});
    if (eventRes.data)
        setEvents(eventRes.data)
  }
  return (
    <div>
        <h1 className="page-heading">Upcoming Events</h1>
      <div className="philanthropies-grid">
        {events.map(event => (
          <div className="philanthropy-card" key={event.id}>
            <div className="philanthropy-photo-wrap">
              {event.photo_url
                ? <img src={event.img} alt={event.title} className="philanthropy-photo" />
                : <div className="philanthropy-photo-placeholder">{event.title?.[0]}</div>
              }
            </div>
            <div className="philanthropy-body">
              <div className="philanthropy-title">{event.title}</div>
              <div className="philanthropy-description">{event.description}</div>
              {event.url && (
                <a href={event.url} target="_blank" rel="noopener noreferrer" className="philanthropy-link">
                  Sign Up →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}