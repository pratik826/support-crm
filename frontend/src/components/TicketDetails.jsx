function TicketDetails({
  selectedTicket,
  setSelectedTicket,
  updateStatus,
  setUpdateStatus,
  newNote,
  setNewNote,
  updateTicket,
}) {
  return (
    <div className="card shadow-sm mt-4 ticket-details-card">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3 ticket-details-header">
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

        <div className="row g-3 ticket-details-grid">

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

          <div className="col-md-6">
            <h6 className="text-muted">Status</h6>

            <select
              className="form-select"
              value={updateStatus || selectedTicket.status}
              onChange={(event) => setUpdateStatus(event.target.value)}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
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

        <hr />

        <h5 className="mb-3">Notes</h5>

        {selectedTicket.notes.length === 0 ? (
          <p className="text-muted">
            No notes added yet.
          </p>
        ) : (
          selectedTicket.notes.map((note) => (
            <div
              key={note.id}
              className="border rounded p-3 mb-2"
            >
              <p className="mb-1">
                {note.note_text}
              </p>

              <small className="text-muted">
                {new Date(
                  note.created_at
                ).toLocaleString()}
              </small>
            </div>
          ))
        )}

        <div className="mt-4">
          <h6>Add Note</h6>

          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Write a note about this ticket..."
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={updateTicket}
          >
            Update Ticket
          </button>
        </div>

      </div>
    </div>
  )
}

export default TicketDetails