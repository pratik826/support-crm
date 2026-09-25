function CustomerTicketForm({
    customerLoginEmail,
    setShowCreateForm,
    customerName,
    setCustomerName,
    subject,
    setSubject,
    description,
    setDescription,
    createTicket,
}) {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <div className="mb-4">
                    <h3 className="mb-1">Create New Ticket</h3>

                    <p className="text-muted mb-0">
                        Tell us about your issue
                    </p>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">
                            Customer Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={customerName}
                            disabled
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">
                            Customer Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={customerLoginEmail}
                            disabled
                        />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">
                            Subject
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="What is the issue about?"
                            value={subject}
                            onChange={(event) =>
                                setSubject(event.target.value)
                            }
                        />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Describe your issue..."
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        ></textarea>
                    </div>
                </div>

                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-primary"
                        onClick={createTicket}
                    >
                        Create Ticket
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowCreateForm(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerTicketForm