import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function Schedule() {
  const [events, setEvents] = useState([])
  const [today] = useState(new Date())
  const [current, setCurrent] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() })
  const [selected, setSelected] = useState(null)

  useEffect(() => { fetchEvents() }, [])

  async function fetchEvents() {
    const { data, error } = await supabase.from('events').select('*')
    if (!error && data) setEvents(data)
  }

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate()
  }

  function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay()
  }

  function prevMonth() {
    setCurrent(c => {
      if (c.month === 0) return { month: 11, year: c.year - 1 }
      return { month: c.month - 1, year: c.year }
    })
    setSelected(null)
  }

  function nextMonth() {
    setCurrent(c => {
      if (c.month === 11) return { month: 0, year: c.year + 1 }
      return { month: c.month + 1, year: c.year }
    })
    setSelected(null)
  }

  function getEventsForDay(day) {
    return events.filter(e => {
      const d = new Date(e.date)
      return d.getUTCFullYear() === current.year &&
             d.getUTCMonth() === current.month &&
             d.getUTCDate() === day
    })
  }

  const daysInMonth = getDaysInMonth(current.month, current.year)
  const firstDay = getFirstDayOfMonth(current.month, current.year)
  const cells = []

  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const selectedEvents = selected ? getEventsForDay(selected) : []

  return (
    <div>
      <h1 className="page-heading">Calender</h1>
      <p className="page-sub">2026-2027 Events</p>

      <div className="cal-wrap">

        {/* ── HEADER ── */}
        <div className="cal-header">
          <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
          <span className="cal-month-label">
            {MONTHS[current.month]} {current.year}
          </span>
          <button className="cal-nav-btn" onClick={nextMonth}>›</button>
        </div>

        {/* ── LEGEND ── */}
        <div className="cal-legend">
          <span className="cal-legend-item">
            <span className="cal-dot meeting" />
            Meeting
          </span>
          <span className="cal-legend-item">
            <span className="cal-dot deadline" />
            Deadline
          </span>
          <span className="cal-legend-item">
            <span className="cal-dot service" />
            Service
          </span>
        </div>

        {/* ── DAY HEADERS ── */}
        <div className="cal-grid">
          {DAYS.map(d => (
            <div className="cal-day-header" key={d}>{d}</div>
          ))}

          {/* ── CELLS ── */}
          {cells.map((day, i) => {
            if (!day) return <div className="cal-cell empty" key={`empty-${i}`} />

            const dayEvents = getEventsForDay(day)
            const isToday = day === today.getDate() &&
                            current.month === today.getMonth() &&
                            current.year === today.getFullYear()
            const isSelected = day === selected

            return (
              <div
                key={day}
                className={`cal-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length ? 'has-events' : ''}`}
                onClick={() => setSelected(isSelected ? null : day)}
              >
                <span className="cal-day-num">{day}</span>
                <div className="cal-dots">
                  {dayEvents.slice(0, 3).map((e, idx) => (
                    <span key={idx} className={`cal-dot ${e.type}`} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── SELECTED DAY EVENTS ── */}
        {selected && (
          <div className="cal-events-panel">
            <div className="cal-events-date">
              {MONTHS[current.month]} {selected}, {current.year}
            </div>
            {selectedEvents.length === 0 ? (
              <p className="cal-no-events">No events this day</p>
            ) : (
              selectedEvents.map(e => (
                <div key={e.id} className={`cal-event-item ${e.type}`}>
                  <span className={`cal-event-badge ${e.type}`}>
                    {e.type}
                  </span>
                  <span className="cal-event-title">{e.title}</span>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}