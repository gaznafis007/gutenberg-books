// API Service
const API_BASE_URL = "https://gutendex.com/books"

/**
 * Fetch books from the Gutenberg API
 * @param {Object} params - Query parameters
 * @returns {Promise} - Promise with books data
 */
export const fetchBooks = async (params = {}) => {
  try {
    // Build query string from params
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&")

    const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching books:", error)
    throw error
  }
}

/**
 * Fetch a single book by ID
 * @param {number} bookId - The ID of the book to fetch
 * @returns {Promise} - Promise with book data
 */
export const fetchBookById = async (bookId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${bookId}`)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching book with ID ${bookId}:`, error)
    throw error
  }
}
