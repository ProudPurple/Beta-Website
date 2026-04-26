import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'

export default function Philanthropies() {
  const [philanthropies, setPhilanthropies] = useState([])

  useEffect(() => {
    fetchPhilanthropies()
  }, [])

  async function fetchPhilanthropies() {
    const philanthropyRes = await supabase.from('content').select('*');
    if (philanthropyRes.data)
        setPhilanthropies(philanthropyRes.data)
    console.log(philanthropyRes.data);
  }
  return (
    <div>
      <h1 className="page-heading">Featured Philanthropies</h1>
      <div className="officer-focus-grid">
        {philanthropies.map(philanthropy => (
          <div className="officer-focus-card" key={philanthropy.id}>
            <div className="officer-focus-photo-wrap">
              {philanthropy.photo_url
                ? <img src={philanthropy.photo_url} alt={philanthropy.name} className="officer-photo" />
                : <div className="officer-focus-photo-placeholder">{philanthropy.title?.[0]}</div>
              }
            </div>
            <div className='officer-description'>
              <div className="officer-focus-name">{philanthropy.title}</div>
              <div className="philanthropy-description">{philanthropy.description}</div>
              <div className="philanthropy-url"><a href={philanthropy.url} target="_blank" rel="noopener noreferrer">Click Here to See Their Website</a></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}