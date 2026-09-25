import { useState } from 'react'
function CustomerDashboard({
  customerLoginEmail,
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
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTickets = statusFilter
    ? tickets.filter((ticket) => ticket.status === statusFilter)
    : tickets

  const ticketsPerPage = 10

  const totalPages = Math.ceil(
    filteredTickets.length / ticketsPerPage
  )

  const startIndex = (currentPage - 1) * ticketsPerPage

  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  )

  return (
    <div className="customer-dashboard container-fluid bg-light min-vh-100 p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">My Support Tickets</h1>
          <p className="text-muted mb-0">
            Welcome, {customerName} 👋
          </p>
          <p className="text-muted mb-0 small">
            {customerLoginEmail}
          </p>
        </div>
      </div>


      {/* Tickets */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">My Tickets</h4>

            <select
              className="form-select"
              style={{ maxWidth: '180px' }}
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value)
                setCurrentPage(1)
              }}
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {filteredTickets.length === 0 ? (
            <p className="text-muted">
              You don't have any tickets yet.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Ticket ID</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Created Date</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedTickets.map((ticket) => (
                    <tr key={ticket.ticket_id}>
                      <td>
                        <button
                          className="btn btn-link p-0 fw-bold"
                          onClick={() =>
                            viewTicket(ticket.ticket_id)
                          }
                        >
                          {ticket.ticket_id}
                        </button>
                      </td>

                      <td>{ticket.subject}</td>

                      <td>
                        <span
                          className={`badge ${ticket.status === 'Open'
                            ? 'bg-success'
                            : ticket.status === 'In Progress'
                              ? 'bg-warning text-dark'
                              : 'bg-danger'
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

              <div className="mt-3 text-muted small">
                Showing{' '}
                {filteredTickets.length === 0
                  ? 0
                  : (currentPage - 1) * ticketsPerPage + 1}
                –
                {Math.min(
                  currentPage * ticketsPerPage,
                  filteredTickets.length
                )}{' '}
                of {filteredTickets.length} tickets
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-2 mt-3">

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ← Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={`btn btn-sm ${currentPage === page
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                        }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next →
                  </button>

                </div>
              )}

            </div>
          )}
        </div>
      </div>

      {/* Customer Ticket Details */}
      {selectedTicket && (
        <div className="card shadow-sm mt-4 customer-ticket-details">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3 customer-ticket-details-header">
              <div>
                <h3 className="mb-1">
                  {selectedTicket.ticket_id}
                </h3>
                <p className="text-muted mb-0">
                  Ticket Details
                </p>
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => setSelectedTicket(null)}
              >
                Back to Tickets
              </button>
            </div>

            <div className="row g-3 customer-ticket-details-grid">
              <div className="col-md-6">
                <h6 className="text-muted">Customer</h6>
                <p>{selectedTicket.customer_name}</p>
              </div>

              <div className="col-md-6">
                <h6 className="text-muted">Email</h6>
                <p>{selectedTicket.customer_email}</p>
              </div>

              <div className="col-md-12">
                <h6 className="text-muted">Subject</h6>
                <p>{selectedTicket.subject}</p>
              </div>

              <div className="col-md-12">
                <h6 className="text-muted">Description</h6>
                <p>{selectedTicket.description}</p>
              </div>

              <div className="col-md-12">
                <h6 className="text-muted">Latest Update</h6>

                {selectedTicket.notes && selectedTicket.notes.length > 0 ? (
                  <div className="border rounded p-3">
                    <p className="mb-1">
                      {
                        selectedTicket.notes[
                          selectedTicket.notes.length - 1
                        ].note_text
                      }
                    </p>

                    <small className="text-muted">
                      {new Date(
                        selectedTicket.notes[
                          selectedTicket.notes.length - 1
                        ].created_at
                      ).toLocaleString()}
                    </small>
                  </div>
                ) : (
                  <p className="text-muted mb-0">
                    No updates have been added yet.
                  </p>
                )}
              </div>

              <div className="col-md-6">
                <h6 className="text-muted">Status</h6>

                <span
                  className={`badge ${selectedTicket.status === 'Open'
                    ? 'bg-success'
                    : selectedTicket.status === 'In Progress'
                      ? 'bg-warning text-dark'
                      : 'bg-danger'
                    }`}
                >
                  {selectedTicket.status}
                </span>
              </div>

              <div className="col-md-6">
                <h6 className="text-muted">Created</h6>
                <p>
                  {new Date(
                    selectedTicket.created_at
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDashboard