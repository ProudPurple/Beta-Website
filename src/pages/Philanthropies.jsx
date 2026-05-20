import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'

export default function Philanthropies() {
  const [philanthropies, setPhilanthropies] = useState([])

  useEffect(() => {
    fetchPhilanthropies()
  }, [])

  async function fetchPhilanthropies() {
    const philanthropyRes = await supabase.from('philanthropies').select('*');
    if (philanthropyRes.data)
        setPhilanthropies(philanthropyRes.data);
  }
  return (
    <div>
      <h1 className="page-heading">Featured Philanthropies</h1>
      <div className="philanthropies-grid">
        {philanthropies.map(philanthropy => (
          <div className="philanthropy-card" key={philanthropy.id}>
            <div className="philanthropy-photo-wrap">
              {philanthropy.img
                ? <img src={philanthropy.img} alt={philanthropy.title} className="philanthropy-photo" />
                : <div className="philanthropy-photo-placeholder">{philanthropy.title?.[0]}</div>
              }
            </div>
            <div className="philanthropy-body">
              <div className="philanthropy-title">{philanthropy.title}</div>
              <div className="philanthropy-description">{philanthropy.description}</div>
              {philanthropy.url && (
                <a href={philanthropy.url} target="_blank" rel="noopener noreferrer" className="philanthropy-link">
                  Visit Website →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}