import { useState } from 'react'
import CustomerDashboard from './CustomerDashboard'
import CustomerTicketForm from './CustomerTicketForm'

function CustomerLayout({
    customerLoginEmail,
    setCustomerLoginEmail,
    tickets,
    viewTicket,
    selectedTicket,
    setSelectedTicket,
    setUserRole,
    customerName,
    setCustomerName,
    subject,
    setSubject,
    description,
    setDescription,
    createTicket,
}) {
    const [activePage, setActivePage] = useState('my-tickets')
    const [sidebarExpanded, setSidebarExpanded] = useState(false)

    return (
        <div className={`employee-layout ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
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
                        className={`sidebar-link ${activePage === 'my-tickets' ? 'active' : ''
                            }`}
                        onClick={() => setActivePage('my-tickets')}
                    >
                        <span>🎫</span>
                        My Tickets
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
                        onClick={() => {
                            setSelectedTicket(null)
                            setCustomerName('')
                            setCustomerLoginEmail('')
                            setSubject('')
                            setDescription('')
                            setUserRole(null)
                        }}
                    >
                        <span>↪</span>
                        Logout
                    </button>
                </div>
            </aside>

            <div className="main-area">
                <header className="topbar">
                    <div className="topbar-right">
                        <div className="employee-profile">
                            <div className="profile-avatar">CU</div>

                            <div className="profile-info">
                                <strong>{customerName}</strong>
                                <span>{customerLoginEmail}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="page-content">
                    {activePage === 'my-tickets' && (
                        <CustomerDashboard
                            customerLoginEmail={customerLoginEmail}
                            tickets={tickets}
                            viewTicket={viewTicket}
                            selectedTicket={selectedTicket}
                            setSelectedTicket={setSelectedTicket}
                        />
                    )}

                    {activePage === 'new-ticket' && (
                        <CustomerTicketForm
                            customerLoginEmail={customerLoginEmail}
                            setShowCreateForm={() => setActivePage('my-tickets')}
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            subject={subject}
                            setSubject={setSubject}
                            description={description}
                            setDescription={setDescription}
                            createTicket={async () => {
                                await createTicket()
                                setActivePage('my-tickets')
                            }}
                        />
                    )}
                </main>
            </div>
        </div>
    )
}

export default CustomerLayout