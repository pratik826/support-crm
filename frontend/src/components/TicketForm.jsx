function TicketForm({
  setShowCreateForm,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  subject,
  setSubject,
  description,
  setDescription,
  createTicket,
}) {
  return (
    <div className="card ticket-form-card ticket-form">
      <div className="card-body">

        <div className="ticket-form-section">
          <h5 className="ticket-form-section-title">
            Customer Information
          </h5>

          <div className="row g-3">

            {/* Customer Name */}
            <div className="col-md-6">
              <label className="ticket-form-label">
                Customer Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </div>

            {/* Customer Email */}
            <div className="col-md-6">
              <label className="ticket-form-label">
                Customer Email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter customer email"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
              />
            </div>

            {/* Subject */}
            <div className="col-md-12">
              <label className="ticket-form-label">
                Subject
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter issue subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
            </div>

            {/* Description */}
            <div className="col-md-12">
              <label className="ticket-form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="5"
                placeholder="Describe the customer's issue..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>

          </div>

          <div className="ticket-form-actions">
            <button
              className="btn btn-primary ticket-form-submit"
              onClick={createTicket}
            >
              Create Ticket
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TicketForm