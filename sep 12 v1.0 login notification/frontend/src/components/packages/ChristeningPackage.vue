<template>
  <div class="christening-package">
    <div class="package-header">
      <h1>Christening Package</h1>
      <p class="subtitle">Welcome your new family member with our beautiful christening package.</p>
    </div>
    <div class="package-content">
      <div class="package-details">
        <h2>Package Includes:</h2>
        <ul>
          <li><i class="fas fa-church"></i> Church ceremony coordination</li>
          <li><i class="fas fa-glass-cheers"></i> Reception venue setup</li>
          <li><i class="fas fa-utensils"></i> Catering for up to 30 guests</li>
          <li><i class="fas fa-camera"></i> Professional photography</li>
          <li><i class="fas fa-birthday-cake"></i> Customized christening cake</li>
          <li><i class="fas fa-pray"></i> Baptismal candle and accessories</li>
        </ul>
      </div>
      <div class="package-pricing">
        <h2>Pricing</h2>
        <p class="price">Starting from <span>$1,500</span></p>
        <button @click="bookNow" class="book-now-btn">Book Now</button>
      </div>
    </div>
    <!-- <div class="package-image">
      <img src="@/assets/christening-image.jpg" alt="Christening Ceremony" />
    </div> -->
  </div>
</template>

<script setup>
const bookNow = () => {
  console.log('Booking for Christening Package');
  // Implement booking logic here
};
</script>

<style scoped>
.christening-package {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.package-header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: #ff6347;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

.package-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.package-details, .package-pricing {
  flex: 1;
  padding: 1rem;
}

h2 {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

li i {
  margin-right: 10px;
  color: #ff6347;
}

.price {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.price span {
  font-weight: bold;
  color: #ff6347;
}

.book-now-btn {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 5px;
}

.book-now-btn:hover {
  background-color: #ff4500;
  transform: translateY(-2px);
}

.package-image {
  margin-top: 2rem;
  text-align: center;
}

.package-image img {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .package-content {
    flex-direction: column;
  }
  
  .package-details, .package-pricing {
    margin-bottom: 2rem;
  }
}
</style>
