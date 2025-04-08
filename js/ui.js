// UI Service for rendering components

import { isInWishlist, toggleWishlist } from "./storage.js"

/**
 * Create a book card element
 * @param {Object} book - Book data
 * @returns {HTMLElement} - Book card element
 */
export const createBookCard = (book) => {
  const bookCard = document.createElement("div")
  bookCard.className = "book-card"

  // Get cover image or use placeholder
  const coverImage =
    book.formats && book.formats["image/jpeg"]
      ? book.formats["image/jpeg"]
      : "https://via.placeholder.com/400x600?text=No+Cover+Available"

  // Get first author or default text
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0].name : "Unknown Author"

  // Get first 2 subjects (genres) or default
  const genres = book.subjects && book.subjects.length > 0 ? book.subjects.slice(0, 2) : ["Uncategorized"]

  // Check if book is in wishlist
  const isWishlisted = isInWishlist(book.id)

  bookCard.innerHTML = `
        <div class="book-cover">
            <img src="${coverImage}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/400x600?text=No+Cover+Available'">
        </div>
        <button class="wishlist-btn ${isWishlisted ? "active" : ""}">
            <i class="fas fa-heart"></i>
        </button>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${authorName}</p>
            <div class="book-genres">
                ${genres.map((genre) => `<span class="book-genre">${genre.split("--")[0].trim()}</span>`).join("")}
            </div>
            <a href="book.html?id=${book.id}" class="view-details">View Details</a>
        </div>
    `

  // Add event listener to wishlist button
  const wishlistBtn = bookCard.querySelector(".wishlist-btn")
  wishlistBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const heartIcon = wishlistBtn.querySelector("i")

    // Toggle wishlist state
    const newState = toggleWishlist(book)

    // Update UI
    if (newState) {
      wishlistBtn.classList.add("active")
      heartIcon.classList.add("heartbeat")
      // Remove animation class after animation completes
      setTimeout(() => {
        heartIcon.classList.remove("heartbeat")
      }, 1300)
    } else {
      wishlistBtn.classList.remove("active")
    }
  })

  return bookCard
}

/**
 * Render books to container
 * @param {Array} books - Array of book objects
 * @param {HTMLElement} container - Container element
 */
export const renderBooks = (books, container) => {
  // Clear container first
  container.innerHTML = ""

  if (books.length === 0) {
    const noBooks = document.createElement("div")
    noBooks.className = "no-books-message"
    noBooks.textContent = "No books found matching your criteria."
    container.appendChild(noBooks)
    return
  }

  // Create and append book cards
  books.forEach((book) => {
    const bookCard = createBookCard(book)
    container.appendChild(bookCard)
  })
}

/**
 * Render pagination controls
 * @param {Object} pagination - Pagination data
 * @param {Function} onPageChange - Callback for page change
 */
export const renderPagination = (pagination, onPageChange) => {
  const { count, page, hasNext, hasPrevious } = pagination
  const pageSize = 32 // Default API page size

  const prevButton = document.getElementById("prev-page")
  const nextButton = document.getElementById("next-page")
  const pageNumbers = document.getElementById("page-numbers")

  // Update previous/next buttons
  prevButton.disabled = !hasPrevious
  nextButton.disabled = !hasNext

  // Remove event listeners before adding new ones
  const prevClone = prevButton.cloneNode(true)
  const nextClone = nextButton.cloneNode(true)

  prevButton.parentNode.replaceChild(prevClone, prevButton)
  nextButton.parentNode.replaceChild(nextClone, nextButton)

  // Add new event listeners
  prevClone.addEventListener("click", () => onPageChange(page - 1))
  nextClone.addEventListener("click", () => onPageChange(page + 1))

  // Calculate total pages
  const totalPages = Math.ceil(count / pageSize)

  // Clear page numbers
  pageNumbers.innerHTML = ""

  // Determine which page numbers to show
  let startPage = Math.max(1, page - 2)
  const endPage = Math.min(totalPages, startPage + 4)

  // Adjust if we're at the end
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4)
  }

  // Add page numbers
  for (let i = startPage; i <= endPage; i++) {
    const pageNumber = document.createElement("div")
    pageNumber.className = `page-number ${i === page ? "active" : ""}`
    pageNumber.textContent = i
    pageNumber.addEventListener("click", () => {
      if (i !== page) {
        onPageChange(i)
      }
    })
    pageNumbers.appendChild(pageNumber)
  }
}

/**
 * Populate genre filter dropdown
 * @param {Array} books - Array of book objects
 * @param {HTMLElement} selectElement - Select element to populate
 */
export const populateGenreFilter = (books, selectElement) => {
  // Extract all subjects from books
  const allSubjects = new Set()

  books.forEach((book) => {
    if (book.subjects && book.subjects.length > 0) {
      book.subjects.forEach((subject) => {
        // Get main category before any '--' separator
        const mainCategory = subject.split("--")[0].trim()
        if (mainCategory) {
          allSubjects.add(mainCategory)
        }
      })
    }
  })

  // Convert to array and sort alphabetically
  const sortedSubjects = [...allSubjects].sort()

  // Keep the first option
  const firstOption = selectElement.options[0]
  selectElement.innerHTML = ""
  selectElement.appendChild(firstOption)

  // Add subject options
  sortedSubjects.forEach((subject) => {
    const option = document.createElement("option")
    option.value = subject
    option.textContent = subject
    selectElement.appendChild(option)
  })
}

// Update the showLoading function to use a more modern loading indicator
export const showLoading = (container) => {
  container.innerHTML = `
    <div class="loading">
      <span>Loading books...</span>
    </div>
  `
}

/**
 * Render detailed book view
 * @param {Object} book - Book data
 * @param {HTMLElement} container - Container element
 */
export const renderBookDetails = (book, container) => {
  // Get cover image or use placeholder
  const coverImage =
    book.formats && book.formats["image/jpeg"]
      ? book.formats["image/jpeg"]
      : "https://via.placeholder.com/400x600?text=No+Cover+Available"

  // Get authors or default text
  const authors =
    book.authors && book.authors.length > 0 ? book.authors.map((author) => author.name).join(", ") : "Unknown Author"

  // Check if book is in wishlist
  const isWishlisted = isInWishlist(book.id)

  // Get summary if available
  const summary = book.summaries && book.summaries.length > 0 ? book.summaries[0] : "No summary available."

  container.innerHTML = `
        <div class="book-details">
            <div class="book-details-image">
                <img src="${coverImage}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/400x600?text=No+Cover+Available'">
            </div>
            <div class="book-details-info">
                <h2>${book.title}</h2>
                <p><strong>Author:</strong> ${authors}</p>
                ${
                  book.translators && book.translators.length > 0
                    ? `<p><strong>Translators:</strong> ${book.translators.map((t) => t.name).join(", ")}</p>`
                    : ""
                }
                <p><strong>Download Count:</strong> ${book.download_count.toLocaleString()}</p>
                
                <div class="book-genres-container">
                    <p><strong>Genres:</strong></p>
                    <div class="book-genres">
                        ${
                          book.subjects && book.subjects.length > 0
                            ? book.subjects
                                .map((subject) => `<span class="book-genre">${subject.split("--")[0].trim()}</span>`)
                                .join("")
                            : '<span class="book-genre">Uncategorized</span>'
                        }
                    </div>
                </div>
                
                <div class="book-summary">
                    <h3>Summary</h3>
                    <p>${summary}</p>
                </div>
                
                <div class="book-details-actions">
                    <button id="toggle-wishlist" class="wishlist-btn ${isWishlisted ? "active" : ""}">
                        <i class="fas fa-heart"></i>
                        ${isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </button>
                    
                    ${
                      book.formats && book.formats["text/html"]
                        ? `<a href="${book.formats["text/html"]}" target="_blank" class="view-online">
                            <i class="fas fa-book-open"></i> Read Online
                        </a>`
                        : ""
                    }
                    
                    ${
                      book.formats && book.formats["application/epub+zip"]
                        ? `<a href="${book.formats["application/epub+zip"]}" class="download-link">
                            <i class="fas fa-download"></i> Download EPUB
                        </a>`
                        : ""
                    }
                </div>
            </div>
        </div>
        <a href="javascript:history.back()" class="back-button">
            <i class="fas fa-arrow-left"></i> Back to Books
        </a>
    `

  // Add event listener to wishlist button
  const wishlistBtn = container.querySelector("#toggle-wishlist")
  wishlistBtn.addEventListener("click", () => {
    const heartIcon = wishlistBtn.querySelector("i")

    // Toggle wishlist state
    const newState = toggleWishlist(book)

    // Update UI
    if (newState) {
      wishlistBtn.classList.add("active")
      wishlistBtn.querySelector("i").classList.add("heartbeat")
      wishlistBtn.textContent = " Remove from Wishlist"
      wishlistBtn.prepend(heartIcon)

      // Remove animation class after animation completes
      setTimeout(() => {
        heartIcon.classList.remove("heartbeat")
      }, 1300)
    } else {
      wishlistBtn.classList.remove("active")
      wishlistBtn.textContent = " Add to Wishlist"
      wishlistBtn.prepend(heartIcon)
    }
  })
}

/**
 * Display error message
 * @param {string} message - Error message
 * @param {HTMLElement} container - Container element
 */
export const showError = (message, container) => {
  container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <button id="retry-button">Retry</button>
        </div>
    `

  const retryButton = container.querySelector("#retry-button")
  retryButton.addEventListener("click", () => {
    window.location.reload()
  })
}
