import { getTickets } from '../services/ticketApi'
function CustomerLogin({
  customerName,
  setCustomerName,
  customerLoginEmail,
  setCustomerLoginEmail,
  setUserRole,
}) {
  const handleLogin = () => {
    if (!customerName.trim() || !customerLoginEmail.trim()) {
      alert('Please enter your name and email address.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(customerLoginEmail.trim())) {
      alert('Please enter a valid email address.')
      return
    }

    getTickets('', '', customerLoginEmail.trim())
      .then((data) => {
        if (data.length > 0) {
          // Existing customer
          setCustomerName(data[0].customer_name)
        }

        setUserRole('customer')
      })
      .catch((error) => {
        console.error('Error finding customer:', error)
        alert('Unable to continue. Please try again.')
      })
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-sm p-5"
        style={{ maxWidth: '500px', width: '100%' }}
      >
        <h2 className="fw-bold mb-2">
          Customer Access
        </h2>

        <p className="text-muted mb-4">
          Enter your name and email to continue.
        </p>

        <label className="form-label">
          Full Name
        </label>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Enter your full name"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
        />

        <label className="form-label">
          Email Address
        </label>

        <input
          type="email"
          className="form-control mb-4"
          placeholder="Enter your email"
          value={customerLoginEmail}
          onChange={(event) =>
            setCustomerLoginEmail(event.target.value)
          }
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Continue
        </button>

        <button
          className="btn btn-link mt-2"
          onClick={() => setUserRole(null)}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default CustomerLogin