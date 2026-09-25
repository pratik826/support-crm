function TicketList({
  search,
  setSearch,
  status,
  setStatus,
  tickets,
  viewTicket,
  currentPage,
  totalPages,
  totalTickets,
  setCurrentPage,
}) {
  return (
    <div className="ticket-list">

      {/* Search + Filter */}
      <div className="ticket-toolbar">

        <div className="ticket-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search by ID, name, email, subject or description..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          className="ticket-filter"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

      </div>


      {/* Result Count */}
      <div className="ticket-result-count">
        Showing{' '}
        {totalTickets === 0
          ? 0
          : (currentPage - 1) * 10 + 1}
        –
        {Math.min(currentPage * 10, totalTickets)}{' '}
        of {totalTickets} tickets
      </div>


      {/* Ticket Table */}

      {tickets.length > 0 ? (

        <div className="table-responsive">

          <table className="table ticket-table">

            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Created Date</th>
              </tr>
            </thead>

            <tbody>

              {tickets.map((ticket) => (

                <tr key={ticket.ticket_id}>

                  <td>
                    <button
                      className="ticket-id-button"
                      onClick={() => viewTicket(ticket.ticket_id)}
                    >
                      {ticket.ticket_id}
                    </button>
                  </td>

                  <td>
                    {ticket.customer_name}
                  </td>

                  <td>
                    <span className="ticket-subject">
                      {ticket.subject}
                    </span>
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

          {totalPages > 1 && (
            <div className="ticket-pagination">

              <button
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ← Previous
              </button>

              <div className="pagination-pages">

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (

                  <button
                    key={page}
                    className={`pagination-page ${currentPage === page ? 'active' : ''
                      }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>

                ))}

              </div>

              <button
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next →
              </button>

            </div>
          )}

        </div>

      ) : (

        <div className="ticket-empty-state">

          <div className="empty-icon">
            🎫
          </div>

          <h5>No tickets found</h5>

          <p>
            Try changing your search or status filter.
          </p>

        </div>

      )}

    </div>
  )
}

export default TicketList