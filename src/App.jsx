import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

import Home from './pages/Home'
import About from './pages/About'
import JoinUs from './pages/JoinUs'
import Requirements from './pages/Requirements'
import Attendance from './pages/Attendance'
import Officers from './pages/Officers'
import Oppurtunities from './pages/Oppurtunities'
import Philanthropies from './pages/Philanthropies'
import logo from './assets/cambridge-logo.png'

import './index.css'
import { SupabaseClient } from '@supabase/supabase-js'

const NAV = [
  {
    label: 'About',
    icon: '◎',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/joinus', label: 'Join Us' },
      { to: '/requirements', label: 'Requirements' },
      { to: '/attendance', label: 'Attendance' },
      { to: '/officers', label: 'Officers' },
      { to: '/oppurtunities', label: 'Oppurtunities' },
      { to: '/philanthropies', label: 'Philanthropies' },
    ],
  },
]

function Sidebar({ dark, setDark, collapsed, setCollapsed }) {
  const [open, setOpen] = useState({ About: true, Attendance: true, Officers: false })

  function toggle(label) {
    setOpen(prev => ({ ...prev, [label]: !prev[label] }))
  }



  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>

      {/* always-visible collapse button pinned to top */}
      <div className="sidebar-top">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(section => (
          <div className={`nav-sub ${open[section.label] ? 'open' : ''}`}>
            {section.links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="theme-btn" onClick={() => setDark(d => !d)}>
          {collapsed
            ? (dark ? '☀' : '☾')
            : (dark ? '☀ Light mode' : '☾ Dark mode')
          }
        </button>
      </div>
    </aside>
  )
}

function Layout({ dark, setDark }) {
  const [collapsed, setCollapsed] = useState(true)
  
  return (
    <>
      <header className="topbar">
        <div className="topbar-title">Cambridge Beta Club</div>
        <img className="topbar-icon" src={logo}/>
      </header>
      <Sidebar dark={dark} setDark={setDark} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`main ${collapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/oppurtunities" element={<Oppurtunities />} />
          <Route path="/philanthropies" element={<Philanthropies />} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  
  function toggleDark(val) {
    const next = typeof val === 'boolean' ? val : !dark
    setDark(next)
    document.body.classList.toggle('dark', next)
  }

  return (
    <BrowserRouter>
      <Layout dark={dark} setDark={toggleDark} />
    </BrowserRouter>
  )
}