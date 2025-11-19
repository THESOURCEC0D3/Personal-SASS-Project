document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup
  const counters = document.querySelectorAll(".counter");
  const speed = 20; // Number of steps for the animation (lower = faster)

  // Optional: Use an Intersection Observer to start the count only when visible
  const observerOptions = {
    threshold: 0.5, // Start when 50% of the #stats element is visible
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If the element is visible, start the count for all counters
        counters.forEach(startCount);
        // Stop observing once the count has started
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target the #stats container to trigger the observer
  const statsSection = document.getElementById("stats");
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // 2. The Counting Logic
  function startCount(counter) {
    // Function to handle the individual counter update loop
    const updateCount = () => {
      // Get the target (e.g., 100 or 15) and convert it to a number
      const target = +counter.getAttribute("data-target");
      // Get the current number displayed
      const count = +counter.innerText;

      // Calculate the step size (guarantees a consistent animation time)
      const increment = target / speed;

      // Check if the current count is less than the target
      if (count < target) {
        // Update the inner text: increase the count and round up to an integer
        counter.innerText = Math.ceil(count + increment);

        // Schedule the next update to run in 50 milliseconds
        setTimeout(updateCount, 50);
      } else {
        // Once done, ensure the number is set exactly to the target
        counter.innerText = target;
      }
    };

    // Start the process for this counter element
    updateCount();
  }
});
