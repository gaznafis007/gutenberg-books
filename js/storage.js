// Storage Service for localStorage operations

/**
 * Get all wishlist books from localStorage
 * @returns {Array} - Array of wishlist book IDs
 */
export const getWishlist = () => {
    const wishlistJSON = localStorage.getItem("gutenberg_wishlist")
    return wishlistJSON ? JSON.parse(wishlistJSON) : []
  }
  
  /**
   * Check if a book is in the wishlist
   * @param {number} bookId - The ID of the book to check
   * @returns {boolean} - True if book is in wishlist
   */
  export const isInWishlist = (bookId) => {
    const wishlist = getWishlist()
    return wishlist.some((item) => item.id === bookId)
  }
  
  /**
   * Add a book to the wishlist
   * @param {Object} book - The book object to add
   */
  export const addToWishlist = (book) => {
    const wishlist = getWishlist()
  
    // Only add if not already in wishlist
    if (!isInWishlist(book.id)) {
      // Create a simplified version of the book to save storage space
      const bookData = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        coverImage: book.formats && book.formats["image/jpeg"] ? book.formats["image/jpeg"] : null,
        subjects: book.subjects ? book.subjects.slice(0, 3) : [], // Store only first 3 subjects
      }
  
      wishlist.push(bookData)
      localStorage.setItem("gutenberg_wishlist", JSON.stringify(wishlist))
    }
  }
  
  /**
   * Remove a book from the wishlist
   * @param {number} bookId - The ID of the book to remove
   */
  export const removeFromWishlist = (bookId) => {
    let wishlist = getWishlist()
    wishlist = wishlist.filter((item) => item.id !== bookId)
    localStorage.setItem("gutenberg_wishlist", JSON.stringify(wishlist))
  }
  
  /**
   * Toggle a book's wishlist status
   * @param {Object} book - The book to toggle
   * @returns {boolean} - New wishlist status
   */
  export const toggleWishlist = (book) => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id)
      return false
    } else {
      addToWishlist(book)
      return true
    }
  }
  
  /**
   * Save search and filter settings
   * @param {Object} settings - Settings object
   */
  export const saveSettings = (settings) => {
    localStorage.setItem("gutenberg_settings", JSON.stringify(settings))
  }
  
  /**
   * Get search and filter settings
   * @returns {Object} - Settings object
   */
  export const getSettings = () => {
    const settingsJSON = localStorage.getItem("gutenberg_settings")
    return settingsJSON
      ? JSON.parse(settingsJSON)
      : {
          searchQuery: "",
          genre: "",
          currentPage: 1,
        }
  }
  