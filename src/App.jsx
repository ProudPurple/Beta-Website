import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

import Home from './pages/Home'
import JoinUs from './pages/JoinUs'
import Officers from './pages/Officers'
import Philanthropies from './pages/Philanthropies'
import Schedule from './pages/Schedule'
import Forms from './pages/Forms'
import Requirements from './pages/Requirements'
import CheckIn from './pages/CheckIn'
import Dashboard from './pages/officer/Dashboard'
import Records from './pages/officer/Records'
import ManageContent from './pages/officer/ManageContent'
import OpenSession from './pages/officer/OpenSession'
import logo from './assets/cambridge-logo.png'

import './index.css'
import { SupabaseClient } from '@supabase/supabase-js'

const NAV = [
  {
    label: 'About',
    icon: '◎',
    links: [
      { to: '/', label: 'Home' },
      { to: '/requirements', label: 'Requirements' },
      { to: '/joinus', label: 'Join Us' },
      { to: '/officers', label: 'Officers' },
      { to: '/philanthropies', label: 'Philanthropies' },
    ],
  },
  {
    label: 'Events',
    icon: '▦',
    links: [
      { to: '/schedule', label: 'Calender' },
      { to: '/checkin', label: 'Check in' },
      { to: '/forms', label: 'Forms' },
    ],
  },
  {
    label: 'News',
    icon: '◆',
    links: [],
  },
  {
    label: 'Officer Controls',
    icon: '⊛',
    links: [
      { to: '/officer/dashboard', label: 'Dashboard' },
      { to: '/officer/session', label: 'Open session' },
      { to: '/officer/records', label: 'Records' },
      { to: '/officer/content', label: 'Manage content' },
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
          <div className="nav-section" key={section.label}>
            <div
              className={`nav-section-header ${open[section.label] ? 'open' : ''}`}
              onClick={() => toggle(section.label)}
            >
              <span>{section.icon}</span>
              {!collapsed && <span>{section.label}</span>}
              {!collapsed && <span className="chevron">{">"}</span>}
            </div>
            {!collapsed && (
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
            )}
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

function Sessionbar({ collapsed, setCollapsed }) {
  const [activeSession, setActiveSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchSession() {
    const result = await supabase.from('sessions').select('*').eq('is_open', 'TRUE')

    if (result.data?.length) {
      setActiveSession(result.data[0]);
    }
  }

  return (
    <>
      {activeSession && (
      <div className="session-banner" onClick={() => navigate('/checkin')}>
        <span className="session-dot" />
        <span>
          <strong>Check In Open:</strong> {activeSession.label} — Click Here to Check In
        </span>
      </div>
    )}
    </>
  );
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
        <Sessionbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/philanthropies" element={<Philanthropies />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/officer/dashboard" element={<Dashboard />} />
          <Route path="/officer/session" element={<OpenSession />} />
          <Route path="/officer/records" element={<Records />} />
          <Route path="/officer/content" element={<ManageContent />} />
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