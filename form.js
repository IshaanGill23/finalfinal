// Modal and Authentication https://youtu.be/-QQlXw9B9Hs all done thanks to this video

// Get elements for modal buttons and form
const modal = document.getElementById("authModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const logoutBtn = document.getElementById("logoutBtn");
const loginForm = document.getElementById("loginForm");
const formContainer = document.getElementById("formContainer");
const loggedInMessage = document.getElementById("loggedInMessage");

// Open modal when login button is clicked
if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    // Check if user is logged in (using localStorage) and display appropriate content
    if (localStorage.getItem("loggedIn") === "true") {
      formContainer.style.display = "none";
      loggedInMessage.style.display = "block";
    } else {
      formContainer.style.display = "block";
      loggedInMessage.style.display = "none";
    }
  });
}

// Login form submission
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username && password) {
      // Store login status in localStorage
      localStorage.setItem("loggedIn", "true");
      formContainer.style.display = "none";
      loggedInMessage.style.display = "block";
      modal.style.display = "none"; // Close modal after login
    } else {
      alert("Please fill out both fields.");
    }
  });
}

// Close modal button functionality
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Logout functionality
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    if (loginForm) loginForm.reset();
    if (loggedInMessage) loggedInMessage.style.display = "none";
    if (formContainer) formContainer.style.display = "block";
  });
}

// Music Player Functionality https://youtu.be/JtrFzoL1joI all done thanks to this video

// Get all song elements and set up the mini player
const songs = document.querySelectorAll(".song");
const miniPlayer = document.getElementById("miniPlayer");
const miniTitle = document.getElementById("miniTitle");
const playerContainer = document.getElementById("playerContainer");
const closePlayerBtn = document.getElementById("closePlayerBtn");

// Play the selected song in the mini player
if (songs.length > 0) {
  songs.forEach((song) => {
    song.addEventListener("click", () => {
      const videoId = song.getAttribute("data-video");
      const title = song.querySelector("span")?.textContent || "Unknown Title";
      if (videoId && playerContainer) {
        playerContainer.innerHTML = `
          <iframe width="100%" height="100%"  
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"  
            frameborder="0"  
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  
            allowfullscreen> 
          </iframe>`;
        if (miniTitle) miniTitle.textContent = title;
        if (miniPlayer) miniPlayer.style.display = "flex";
      }
    });
  });
}

// Close the mini player
if (closePlayerBtn) {
  closePlayerBtn.addEventListener("click", closeMiniPlayer);
}

function closeMiniPlayer() {
  if (miniPlayer) miniPlayer.style.display = "none";
  if (playerContainer) playerContainer.innerHTML = "";
  if (miniTitle) miniTitle.textContent = "";
}

// Horizontal Scrolling for Song Lines https://youtu.be/3yfswsnD2sw all done thanks to this video

// Function to scroll the song lines left or right
function scrollLine(direction, lineIndex) {
  const lines = document.querySelectorAll(".song-line");
  if (lineIndex >= 0 && lineIndex < lines.length) {
    const scrollAmount = 300;
    lines[lineIndex].scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
}

// Event listeners for left and right scroll buttons
document.querySelectorAll(".scroll-btn-left").forEach((button, index) => {
  button.addEventListener("click", () => scrollLine(-1, index));
});

document.querySelectorAll(".scroll-btn-right").forEach((button, index) => {
  button.addEventListener("click", () => scrollLine(1, index));
});

// Search Functionality https://youtu.be/TlP5WIxVirU all done thanks to this video

// Implementing the search functionality
const searchForm = document.querySelector(".search-form");
if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return;
    const songs = document.querySelectorAll(".song");
    let songFound = false;
    songs.forEach((song) => {
      const songTitle =
        song.querySelector("span")?.textContent.toLowerCase() || "";
      if (songTitle.includes(searchTerm)) {
        const videoId = song.getAttribute("data-video");
        const title =
          song.querySelector("span")?.textContent || "Unknown Title";
        if (videoId && playerContainer) {
          playerContainer.innerHTML = `
            <iframe width="100%" height="100%"  
              src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"  
              frameborder="0"  
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  
              allowfullscreen> 
            </iframe>`;
          if (miniTitle) miniTitle.textContent = title;
          if (miniPlayer) miniPlayer.style.display = "flex";
          songFound = true;
        }
      }
    });
    if (!songFound) {
      alert("Song not found! Please try another search term.");
    }
  });
}

// Artist Bio Functions https://youtu.be/t_GuuhNNcNQ all done thanks to this video

// Display artist bio when clicked
function showBio(artist, bio) {
  const artistName = document.getElementById("artistName");
  const bioText = document.getElementById("bioText");
  const artistBio = document.getElementById("artistBio");
  if (artistName && bioText && artistBio) {
    artistName.innerText = artist;
    bioText.innerText = bio;
    artistBio.style.display = "block";
  }
}

// Close artist bio
function closeBio() {
  const artistBio = document.getElementById("artistBio");
  if (artistBio) artistBio.style.display = "none";
}

// Mood-based YouTube video switching https://youtu.be/XZzamQuo8Nk used this video as a reference
const moods = ["happy", "sad", "energetic", "calm", "romantic"];

document
  .querySelectorAll('input[type="radio"][name="mood"]')
  .forEach((radio) => {
    radio.addEventListener("change", () => {
      moods.forEach((mood) => {
        const iframe = document.querySelector(`.${mood}-embed`);
        if (!iframe) return; // Safety check

        if (radio.classList.contains(`mood-${mood}`)) {
          // Only reload if it's not already loaded
          const newSrc = iframe.dataset.src + "?autoplay=1";
          if (iframe.src !== newSrc) {
            iframe.src = newSrc;
          }
          iframe.style.display = "block";
        } else {
          iframe.src = "";
          iframe.style.display = "none";
        }
      });
    });
  });

// JavaScript to change full background gradients based on selected mood
const moodButtons = document.querySelectorAll('input[name="mood"]');
const body = document.body;

// Set up event listeners for each mood button
moodButtons.forEach((button) => {
  button.addEventListener("change", () => {
    if (button.classList.contains("mood-happy")) {
      body.style.background = "linear-gradient(135deg, #f8b400, #090909)";
    } else if (button.classList.contains("mood-sad")) {
      body.style.background = "linear-gradient(135deg, #396393,rgb(2, 3, 3))";
    } else if (button.classList.contains("mood-energetic")) {
      body.style.background = "linear-gradient(135deg, #bb610c, #ffc3a0)";
    } else if (button.classList.contains("mood-calm")) {
      body.style.background = "linear-gradient(135deg, #2f9fbe, #2e3c4e)";
    } else if (button.classList.contains("mood-romantic")) {
      body.style.background = "linear-gradient(135deg, #af1515, #fcd1e0)";
    }
  });
});

// Review Functionality

const reviewForm = document.getElementById("reviewForm");
const reviewInput = document.getElementById("reviewInput");
const reviewsList = document.getElementById("reviewsList");

// Fake reviews to display when page loads
const fakeReviews = [
  "Absolutely love this site! The layout is super clean and easy to use.",
  "I found the perfect playlist for my mood — 10/10.",
  "Couldn’t stop replaying my favorite song. Thank you!",
  "This review page is slick and responsive, great job!",
  "Music + Vibes = Perfection 🔥🔥🔥",
  "Impressed by the dark mode, feels premium!",
  "I actually use this daily now. Highly recommend it!",
];

// Display fake reviews on page load
window.addEventListener("DOMContentLoaded", () => {
  fakeReviews.forEach((text) => {
    addReview(text);
  });
});

// Add new user review
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const reviewText = reviewInput.value.trim();
  if (reviewText !== "") {
    addReview(reviewText);
    reviewInput.value = "";
  } else {
    alert("Please enter a review before submitting.");
  }
});

// Reusable function to add a review to the DOM
function addReview(text) {
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review");
  reviewDiv.textContent = text;
  reviewsList.prepend(reviewDiv);
}
