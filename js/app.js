// Main application file
import { fetchBooks } from "./api.js"
import { renderBooks, renderPagination, populateGenreFilter, showLoading, showError } from "./ui.js"
import { getSettings, saveSettings } from "./storage.js"

// DOM elements
const booksGrid = document.getElementById("books-grid")
const searchInput = document.getElementById("search-input")
const genreFilter = document.getElementById("genre-filter")

// App state
let currentPage = 1
let currentSearchQuery = ""
let currentGenre = ""
const allGenres = new Set()

// Initialize the app
const initApp = async () => {
  try {
    // Load saved settings
    const settings = getSettings()
    currentPage = settings.currentPage || 1
    currentSearchQuery = settings.searchQuery || ""
    currentGenre = settings.genre || ""

    // Set input values from settings
    searchInput.value = currentSearchQuery

    // Load initial books
    await loadBooks()

    // Set up event listeners
    setupEventListeners()
  } catch (error) {
    console.error("Error initializing app:", error)
    showError("Failed to initialize the application. Please try again later.", booksGrid)
  }
}

// Load books with current filters
const loadBooks = async () => {
  try {
    showLoading(booksGrid)

    // Prepare query parameters
    const params = { page: currentPage }

    // Add search query if present
    if (currentSearchQuery) {
      params.search = currentSearchQuery
    }

    // Add topic/genre filter if present
    if (currentGenre) {
      params.topic = currentGenre
    }

    // Fetch books from API
    const data = await fetchBooks(params)

    // Render books
    renderBooks(data.results, booksGrid)

    // Populate genre filter if on first page and not already populated
    if (currentPage === 1 && genreFilter.options.length <= 1) {
      populateGenreFilter(data.results, genreFilter)

      // Set genre filter value from settings
      if (currentGenre) {
        // Find the option with the matching value
        const option = Array.from(genreFilter.options).find((opt) => opt.value === currentGenre)
        if (option) {
          genreFilter.value = currentGenre
        }
      }
    }

    // Render pagination
    renderPagination(
      {
        count: data.count,
        page: currentPage,
        hasNext: !!data.next,
        hasPrevious: !!data.previous,
      },
      handlePageChange,
    )

    // Save current settings
    saveSettings({
      searchQuery: currentSearchQuery,
      genre: currentGenre,
      currentPage: currentPage,
    })
  } catch (error) {
    console.error("Error loading books:", error)
    showError("Failed to load books. Please try again later.", booksGrid)
  }
}

// Set up event listeners
const setupEventListeners = () => {
  // Search input
  searchInput.addEventListener(
    "input",
    debounce(() => {
      currentSearchQuery = searchInput.value.trim()
      currentPage = 1 // Reset to first page on new search
      loadBooks()
    }, 500),
  )

  // Genre filter
  genreFilter.addEventListener("change", () => {
    currentGenre = genreFilter.value
    currentPage = 1 // Reset to first page on filter change
    loadBooks()
  })
}

// Handle page change
const handlePageChange = (newPage) => {
  currentPage = newPage
  loadBooks()

  // Scroll to top of the page
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Debounce function to limit how often a function can be called
const debounce = (func, delay) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp)
