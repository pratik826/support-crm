const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
// const API_URL = 'http://127.0.0.1:8000/api'

export const getTickets = async (
  search = '',
  status = '',
  customerEmail = ''
) => {
  const params = new URLSearchParams()

  if (search) {
    params.append('search', search)
  }

  if (status) {
    params.append('status', status)
  }

  if (customerEmail) {
    params.append('customer_email', customerEmail)
  }

  const response = await fetch(
    `${API_URL}/tickets?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch tickets')
  }

  return response.json()
}


export const getTicket = async (ticketId, customerEmail = '') => {
  const params = new URLSearchParams()

  if (customerEmail) {
    params.append('customer_email', customerEmail)
  }

  const response = await fetch(
    `${API_URL}/tickets/${ticketId}?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch ticket')
  }

  return response.json()
}


export const createTicketRequest = async (ticketData) => {
  const response = await fetch(
    `${API_URL}/tickets`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to create ticket')
  }

  return response.json()
}


export const updateTicketRequest = async (ticketId, ticketData) => {
  const response = await fetch(
    `${API_URL}/tickets/${ticketId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to update ticket')
  }

  return response.json()
}