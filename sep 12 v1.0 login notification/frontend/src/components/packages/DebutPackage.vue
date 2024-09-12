<template>
  <div class="debut-package">
    <h1>Debut Package</h1>
    <p>Celebrate your coming of age in style with our debut package.</p>
    <div class="package-details">
      <h2>Package Includes:</h2>
      <ul>
        <li>Venue styling</li>
        <li>Catering for up to 50 guests</li>
        <li>Professional DJ</li>
        <li>Photo booth</li>
        <li>Customized debut cake</li>
        <li>Professional makeup and hairstyling</li>
      </ul>
    </div>
    <div class="package-pricing">
      <h2>Pricing</h2>
      <p>Starting from $3,000</p>
      <button @click="bookNow" class="book-now-btn">Book Now</button>
    </div>
  </div>
</template>

<script setup>
const bookNow = () => {
  console.log('Booking for Debut Package');
  // Implement booking logic here
};
</script>

<style scoped>
.debut-package {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #ff6347;
  text-align: center;
}

.package-details, .package-pricing {
  margin-top: 2rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.5rem;
}

.book-now-btn {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.book-now-btn:hover {
  background-color: #ff4500;
}
</style>
