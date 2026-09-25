import { useEffect, useState } from 'react'
import RoleSelection from './components/RoleSelection'
import EmployeeLayout from './components/EmployeeLayout'
import CustomerLogin from './components/CustomerLogin'
import CustomerLayout from './components/CustomerLayout'
import CustomerDashboard from './components/CustomerDashboard'
import CustomerTicketForm from './components/CustomerTicketForm'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import TicketDetails from './components/TicketDetails'
import {
  getTickets,
  getTicket,
  createTicketRequest,
  updateTicketRequest,
} from './services/ticketApi'


function App() {

  const [tickets, setTickets] = useState([])
  const [allTickets, setAllTickets] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [updateStatus, setUpdateStatus] = useState('')
  const [newNote, setNewNote] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [activeEmployeePage, setActiveEmployeePage] = useState('dashboard')
  const [customerLoginEmail, setCustomerLoginEmail] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [lastTicketCount, setLastTicketCount] = useState(0)
  const [notification, setNotification] = useState('')

  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setCurrentPage(1)
    setTickets([])
    const email =
      userRole === 'customer'
        ? customerLoginEmail
        : ''

    getTickets(search, status, email)
      .then((data) => {
        setTickets(data)
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error)
      })
  }, [search, status, userRole, customerLoginEmail])

  useEffect(() => {
    if (userRole !== 'customer' || !customerLoginEmail) {
      return
    }

    const refreshCustomerTickets = () => {
      getTickets(search, status, customerLoginEmail)
        .then((data) => {
          setTickets(data)
        })
        .catch((error) => {
          console.error(
            'Error refreshing customer tickets:',
            error
          )
        })
    }

    const interval = setInterval(
      refreshCustomerTickets,
      10000
    )

    return () => clearInterval(interval)
  }, [userRole, customerLoginEmail, search, status])

  useEffect(() => {
    if (userRole !== 'employee') {
      return
    }

    getTickets('', '', '')
      .then((data) => {
        setAllTickets(data)
      })
      .catch((error) => {
        console.error('Error fetching all tickets:', error)
      })
  }, [userRole])

  useEffect(() => {
    if (userRole !== 'employee') {
      return
    }

    const checkForNewTickets = () => {
      getTickets('', '', '')
        .then((data) => {
          if (
            lastTicketCount > 0 &&
            data.length > lastTicketCount
          ) {
            setNotification('🔔 New ticket received!')
          }

          setAllTickets(data)

          const filteredData = data.filter((ticket) => {
            const searchTerm = search.toLowerCase()

            const matchesSearch =
              !search ||
              ticket.ticket_id.toLowerCase().includes(searchTerm) ||
              ticket.customer_name.toLowerCase().includes(searchTerm) ||
              ticket.customer_email.toLowerCase().includes(searchTerm) ||
              ticket.subject.toLowerCase().includes(searchTerm) ||
              ticket.description.toLowerCase().includes(searchTerm)

            const matchesStatus =
              !status || ticket.status === status

            return matchesSearch && matchesStatus
          })

          setTickets(filteredData)
          setLastTicketCount(data.length)
        })
        .catch((error) => {
          console.error(
            'Error checking for new tickets:',
            error
          )
        })
    }

    checkForNewTickets()

    const interval = setInterval(
      checkForNewTickets,
      10000
    )

    return () => clearInterval(interval)
  }, [userRole, lastTicketCount, search, status])


  const viewTicket = (ticketId) => {
    if (userRole === 'employee') {
      setActiveEmployeePage('tickets')
    }
    const email =
      userRole === 'customer'
        ? customerLoginEmail
        : ''

    console.log('Viewing ticket:', ticketId)
    console.log('Customer email:', email)

    getTicket(ticketId, email)
      .then((data) => {
        console.log('Ticket details response:', data)
        setSelectedTicket(data)
      })
      .catch((error) => {
        console.error('Error fetching ticket:', error)
      })
  }

  const updateTicket = () => {
    updateTicketRequest(selectedTicket.ticket_id, {
      status: updateStatus,
      notes: newNote,
    })
      .then((data) => {
        console.log('Ticket updated:', data)

        return getTicket(selectedTicket.ticket_id)
      })
      .then((data) => {
        setSelectedTicket(data)
        setNewNote('')
        setUpdateStatus(data.status)

        return refreshTickets()
      })
      .then((data) => {
        setTickets(data)
      })
      .catch((error) => {
        console.error('Error updating ticket:', error)
      })
  }

  const refreshTickets = () => {
    const email =
      userRole === 'customer'
        ? customerLoginEmail.trim()
        : ''

    return getTickets('', '', email)
      .then((data) => {
        setTickets(data)
        return data
      })
  }

  const createTicket = () => {
    const email =
      userRole === 'customer'
        ? customerLoginEmail.trim()
        : customerEmail.trim()

    if (
      !customerName.trim() ||
      !email ||
      !subject.trim() ||
      !description.trim()
    ) {
      alert('Please fill in all fields before creating the ticket.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.')
      return
    }

    setIsCreating(true)

    return createTicketRequest({
      customer_name: customerName.trim(),
      customer_email: email,
      subject: subject.trim(),
      description: description.trim(),
    })
      .then((data) => {
        console.log('Ticket created:', data)

        const email =
          userRole === 'customer'
            ? customerLoginEmail.trim()
            : ''

        return getTickets('', '', email)
      })
      .then((data) => {
        setTickets(data)

        if (userRole === 'employee') {
          setAllTickets(data)
        }
        setShowCreateForm(false)

        if (userRole === 'employee') {
          setCustomerName('')
          setCustomerEmail('')
        }

        setSubject('')
        setDescription('')
      })
      .catch((error) => {
        console.error('Error creating ticket:', error)
        alert('Unable to create the ticket. Please try again.')
      })
      .finally(() => {
        setIsCreating(false)
      })
  }

  const ticketsPerPage = 10

  const totalPages = Math.ceil(
    tickets.length / ticketsPerPage
  )

  const startIndex =
    (currentPage - 1) * ticketsPerPage

  const paginatedTickets = tickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  )


  return (

    <>
      {!userRole ? (
        <RoleSelection setUserRole={setUserRole} />
      ) : userRole === 'customer-login' ? (
        <CustomerLogin
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerLoginEmail={customerLoginEmail}
          setCustomerLoginEmail={setCustomerLoginEmail}
          setUserRole={setUserRole}
        />
      ) : userRole === 'customer' ? (
        <CustomerLayout
          customerLoginEmail={customerLoginEmail}
          setCustomerLoginEmail={setCustomerLoginEmail}
          tickets={tickets}
          viewTicket={viewTicket}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          setUserRole={setUserRole}
          customerName={customerName}
          setCustomerName={setCustomerName}
          subject={subject}
          setSubject={setSubject}
          description={description}
          setDescription={setDescription}
          createTicket={createTicket}
        />
      ) : (
        <EmployeeLayout
          activePage={activeEmployeePage}
          setActivePage={setActiveEmployeePage}
          setUserRole={setUserRole}
        >
          {notification && (
            <div
              className="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              <strong>{notification}</strong>

              <button
                type="button"
                className="btn-close"
                onClick={() => setNotification('')}
              ></button>
            </div>
          )}

          {/* =========================
    DASHBOARD
    ========================= */}

          {activeEmployeePage === 'dashboard' && (
            <>
              <div className="mb-4">
                <h1 className="fw-bold mb-1">Dashboard</h1>

                <p className="text-muted mb-0">
                  Welcome back! Here's an overview of your support tickets.
                </p>
              </div>

              {/* Statistics */}
              <div className="row g-3 mb-4">

                <div className="col-6 col-md-3">
                  <div className="dashboard-stat-card stat-total h-100">
                    <div className="card-body">
                      <div className="stat-header">
                        <p className="stat-title">Total Tickets</p>

                        <div className="stat-icon">
                          🎫
                        </div>
                      </div>

                      <h2 className="stat-number">
                        {allTickets.length}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="dashboard-stat-card stat-open h-100">
                    <div className="card-body">
                      <div className="stat-header">
                        <p className="stat-title">Open</p>

                        <div className="stat-icon">
                          🟢
                        </div>
                      </div>

                      <h2 className="stat-number">
                        {allTickets.filter(
                          (ticket) => ticket.status === 'Open'
                        ).length}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="dashboard-stat-card stat-progress h-100">
                    <div className="card-body">
                      <div className="stat-header">
                        <p className="stat-title">In Progress</p>

                        <div className="stat-icon">
                          ⏳
                        </div>
                      </div>

                      <h2 className="stat-number">
                        {allTickets.filter(
                          (ticket) => ticket.status === 'In Progress'
                        ).length}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="dashboard-stat-card stat-closed h-100">
                    <div className="card-body">
                      <div className="stat-header">
                        <p className="stat-title">Closed</p>

                        <div className="stat-icon">
                          ✓
                        </div>
                      </div>

                      <h2 className="stat-number">
                        {allTickets.filter(
                          (ticket) => ticket.status === 'Closed'
                        ).length}
                      </h2>
                    </div>
                  </div>
                </div>

              </div>

              {/* Recent Tickets */}
              <div className="card recent-tickets-card">

                <div className="card-body">

                  <div className="recent-tickets-header">

                    <div>
                      <h4 className="fw-bold mb-1">
                        Recent Tickets
                      </h4>

                      <p className="text-muted mb-0">
                        Latest customer support requests
                      </p>
                    </div>

                    <button
                      className="view-all-button"
                      onClick={() => setActiveEmployeePage('tickets')}
                    >
                      View All →
                    </button>

                  </div>

                  <div className="table-responsive">

                    <table className="table align-middle">

                      <thead>
                        <tr>
                          <th>Ticket ID</th>
                          <th>Customer</th>
                          <th>Subject</th>
                          <th>Status</th>
                          <th>Created</th>
                        </tr>
                      </thead>

                      <tbody>

                        {[...allTickets]
                          .sort(
                            (a, b) =>
                              new Date(b.created_at) -
                              new Date(a.created_at)
                          )
                          .slice(0, 5)
                          .map((ticket) => (

                            <tr key={ticket.ticket_id}>

                              <td>
                                <button
                                  className="btn btn-link p-0 fw-semibold"
                                  onClick={() => viewTicket(ticket.ticket_id)}
                                >
                                  {ticket.ticket_id}
                                </button>
                              </td>

                              <td>
                                {ticket.customer_name}
                              </td>

                              <td>
                                {ticket.subject}
                              </td>

                              <td>

                                <span
                                  className={`status-badge ${ticket.status === 'Open'
                                    ? 'status-open'
                                    : ticket.status === 'In Progress'
                                      ? 'status-progress'
                                      : 'status-closed'
                                    }`}
                                >
                                  {ticket.status}
                                </span>

                              </td>

                              <td>
                                {new Date(
                                  ticket.created_at
                                ).toLocaleDateString()}
                              </td>

                            </tr>

                          ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>
            </>
          )}


          {/* =========================
    TICKETS
    ========================= */}

          {activeEmployeePage === 'tickets' && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                  <h1 className="fw-bold mb-1">
                    Tickets
                  </h1>

                  <p className="text-muted mb-0">
                    Manage and track customer support requests.
                  </p>
                </div>

              </div>

              <div className="card ticket-page-card">

                <div className="card-body">

                  <TicketList
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    tickets={paginatedTickets}
                    viewTicket={viewTicket}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalTickets={tickets.length}
                    setCurrentPage={setCurrentPage}
                  />

                  {selectedTicket && (
                    <TicketDetails
                      selectedTicket={selectedTicket}
                      setSelectedTicket={setSelectedTicket}
                      updateStatus={updateStatus}
                      setUpdateStatus={setUpdateStatus}
                      newNote={newNote}
                      setNewNote={setNewNote}
                      updateTicket={updateTicket}
                    />
                  )}

                </div>

              </div>
            </>
          )}


          {/* =========================
    NEW TICKET
    ========================= */}

          {activeEmployeePage === 'new-ticket' && (
            <>
              <div className="mb-4">

                <h1 className="fw-bold mb-1">
                  Create New Ticket
                </h1>

                <p className="text-muted mb-0">
                  Create a support ticket for a customer.
                </p>

              </div>

              <TicketForm
                setShowCreateForm={setShowCreateForm}
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerEmail={customerEmail}
                setCustomerEmail={setCustomerEmail}
                subject={subject}
                setSubject={setSubject}
                description={description}
                setDescription={setDescription}
                createTicket={createTicket}
              />
            </>
          )}

        </EmployeeLayout>
      )}
    </>
  )
}

export default App