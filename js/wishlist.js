// Wishlist page
import { renderBooks } from "./ui.js"
import { getWishlist } from "./storage.js"

// DOM elements
const wishlistContainer = document.getElementById("wishlist-books")
const noWishlistMessage = document.querySelector(".no-books-message")

// Initialize the wishlist page
const initWishlistPage = () => {
  // Get wishlist books from localStorage
  const wishlistBooks = getWishlist()

  // Check if wishlist is empty
  if (wishlistBooks.length === 0) {
    noWishlistMessage.classList.remove("hidden")
    return
  }

  // Render wishlist books
  renderBooks(wishlistBooks, wishlistContainer)
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initWishlistPage)
