import { useState } from 'react'
function EmployeeLayout({ children, activePage, setActivePage, setUserRole }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  return (
    <div className={`employee-layout ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>

      {/* Sidebar */}
      <aside className="sidebar">

        <button
          className="sidebar-brand"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          <div className="brand-icon">🎧</div>
          <span>Support CRM</span>
        </button>

        <nav className="sidebar-nav">

          <button
            className={`sidebar-link ${activePage === 'dashboard' ? 'active' : ''
              }`}
            onClick={() => setActivePage('dashboard')}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={`sidebar-link ${activePage === 'tickets' ? 'active' : ''
              }`}
            onClick={() => setActivePage('tickets')}
          >
            <span>🎫</span>
            Tickets
          </button>

          <button
            className={`sidebar-link ${activePage === 'new-ticket' ? 'active' : ''
              }`}
            onClick={() => setActivePage('new-ticket')}
          >
            <span>＋</span>
            New Ticket
          </button>


        </nav>

        <div className="sidebar-bottom">
          <button
            className="sidebar-link"
            onClick={() => setUserRole(null)}
          >
            <span>↪</span>
            Logout
          </button>
        </div>

      </aside>


      {/* Main Area */}
      <div className="main-area">

        {/* Topbar */}
        <header className="topbar">


          <div className="topbar-right">

            <div className="employee-profile">

              <div className="profile-avatar">
                ER
              </div>

              <div className="profile-info">
                <strong>Employee</strong>
                <span>admin@company.com</span>
              </div>

            </div>

          </div>

        </header>


        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  )
}

export default EmployeeLayout