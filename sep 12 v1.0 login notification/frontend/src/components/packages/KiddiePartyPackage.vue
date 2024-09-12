<template>
  <div class="kiddie-party-package">
    <h1>Kiddie Party Package</h1>
    <p>Create magical memories for your little one with our kiddie party package.</p>
    <div class="package-details">
      <h2>Package Includes:</h2>
      <ul>
        <li>Themed decorations</li>
        <li>Fun games and activities</li>
        <li>Cake and snacks</li>
        <li>Party host</li>
        <li>Balloon art</li>
        <li>Face painting</li>
      </ul>
    </div>
    <div class="package-pricing">
      <h2>Pricing</h2>
      <p>Starting from $500</p>
      <button @click="bookNow" class="book-now-btn">Book Now</button>
    </div>
  </div>
</template>

<script setup>
const bookNow = () => {
  console.log('Booking for Kiddie Party Package');
  // Implement booking logic here
};
</script>

<style scoped>
.kiddie-party-package {
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
