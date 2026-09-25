function RoleSelection({ setUserRole }) {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-sm p-5 text-center"
        style={{ maxWidth: '500px', width: '100%' }}
      >
        <h1 className="fw-bold mb-2">
          Support CRM
        </h1>

        <p className="text-muted mb-4">
          Customer Support Ticketing System
        </p>

        <h5 className="mb-4">
          How would you like to continue?
        </h5>

        <div className="d-grid gap-3">

          <button
            className="btn btn-primary btn-lg"
            onClick={() => setUserRole('customer-login')}
          >
            Continue as Customer
          </button>

          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => setUserRole('employee')}
          >
            Continue as Employee
          </button>

        </div>
      </div>
    </div>
  )
}

export default RoleSelection