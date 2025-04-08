// Book details page
import { fetchBookById } from "./api.js"
import { renderBookDetails, showLoading, showError } from "./ui.js"

// DOM elements
const bookDetailsContainer = document.getElementById("book-details")

// Initialize the book details page
const initBookPage = async () => {
  try {
    // Get book ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const bookId = urlParams.get("id")

    if (!bookId) {
      showError("No book ID provided. Please go back and select a book.", bookDetailsContainer)
      return
    }

    // Show loading state
    showLoading(bookDetailsContainer)

    // Fetch book details
    const book = await fetchBookById(bookId)

    // Update page title
    document.title = `${book.title} - Gutenberg Books Explorer`

    // Render book details
    renderBookDetails(book, bookDetailsContainer)
  } catch (error) {
    console.error("Error loading book details:", error)
    showError("Failed to load book details. Please try again later.", bookDetailsContainer)
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initBookPage)
