// main.js
document.addEventListener('DOMContentLoaded', () => {
  const reviewForm = document.getElementById('review-form');
  const reviewsContainer = document.getElementById('reviews-container');

  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = document.getElementById('user').value;
    const rating = document.getElementById('rating').value;
    const text = document.getElementById('text').value;

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, rating, text }),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        fetchAndDisplayReviews();
      } else {
        alert('Error submitting review. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  });

  // Fetch and display reviews on page load
  fetchAndDisplayReviews();
});

async function fetchAndDisplayReviews() {
  try {
    const response = await fetch('/api/reviews');
    const reviews = await response.json();

    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = '';

    reviews.forEach((review) => {
      const reviewElement = document.createElement('div');
      reviewElement.innerHTML = `
        <strong>${review.user}</strong>
        <p>Rating: ${review.rating}</p>
        <p>${review.text}</p>
        <hr>
      `;
      reviewsContainer.appendChild(reviewElement);
    });
  } catch (error) {
    console.error(error);
  }
}
