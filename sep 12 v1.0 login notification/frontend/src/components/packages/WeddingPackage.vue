<template>
  <div class="wedding-package-section">
    <h2 class="section-title">Premium Event Styling Packages</h2>
    <div class="packages-container">
      <div class="package-card">
        <img src="./img/package1.png" alt="Wedding Package Image" class="package-image" />
        <div class="package-details">
          <h3>Love Truly</h3>
         
          <p class="package-link" @click="openModal('loveTruly')">View Details</p>
         
        </div>
      </div>
      <div class="package-card">
        <img src="./img/package2.png" alt="Wedding Package Image" class="package-image" />
        <div class="package-details">
          <h3>Love Madly</h3>
     
          <p class="package-link" @click="openModal('loveMadly')">View Details</p>
       
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="activeModal === 'loveTruly'" class="modal">
      <div class="modal-content">
        <h3>Love Truly</h3>
        <p>Elegant Ceiling Treatment</p>
        <p>40x40 Trusses with 10 pcs Chandeliers</p>
        <p>Silk Leaves and Silk Flowers based on Motif</p>
        <p>Entrance Tunnel</p>
        <p>Stage Design, LED Wall Frame or Side Design</p>
        <p>VIP Centerpieces with Special Candelabras</p>
        <p>Local Floral Centerpiece for All Guests (100pax)</p>
        <p>Candice Chairs for VIP (20pax + 2 for the couple)</p>
        <h4>Add-ons:</h4>
        <p>Ceremony Setup with Paper Flower Background – 50k</p>
        <p>Candice Chair – 1k</p>
        <p>Mirror Table – 5k (Can fit 8-10pax)</p>
        <p>Gold Cutlery Set for VIP – 500 / head</p>
        <p>Elegant Plate Set for VIP – 1k / head</p>
        <button @click="closeModal" class="close-button">Close</button>
      </div>
    </div>

    <div v-if="activeModal === 'loveMadly'" class="modal">
      <div class="modal-content">
        <h3>Love Madly</h3>
        <p>Elegant Ceiling Treatment</p>
        <p>30x30 Trusses with 8 pcs Chandeliers</p>
        <p>Silk Leaves and Silk Flowers based on Motif</p>
        <p>Entrance Tunnel</p>
        <p>Stage Design, LED Wall Frame or Side Design</p>
        <p>VIP Centerpieces with Special Candelabras</p>
        <p>Local Floral Centerpiece for All Guests (80pax)</p>
        <p>Candice Chairs for VIP (15pax + 2 for the couple)</p>
        <h4>Add-ons:</h4>
        <p>Ceremony Setup with Paper Flower Background – 40k</p>
        <p>Candice Chair – 1k</p>
        <p>Mirror Table – 4k (Can fit 6-8pax)</p>
        <p>Gold Cutlery Set for VIP – 400 / head</p>
        <p>Elegant Plate Set for VIP – 800 / head</p>
        <button @click="closeModal" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeModal = ref(null);

const openModal = (modalName) => {
  activeModal.value = modalName;
};

const closeModal = () => {
  activeModal.value = null;
};

const bookNow = () => {
  console.log('Booking for Wedding Package');
  // Implement booking logic here
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

.wedding-package-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f0f0f0;
  min-height: 100vh;
  width: 100%;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15rem;
  text-align: center;
  color: #333;
}

.packages-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}

.package-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  max-width: 400px;
  width: 100%;
  padding: 1rem;
  position: relative;
  bottom: 12.6rem;
  transition: transform 0.3s ease;
}

.package-card:hover {
  transform: translateY(-5px);
}

.package-image {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
}

.package-details {
  padding: 1rem;
}

.package-details h3 {
  font-size: 1.8rem;
  margin: 1rem 0;
  font-weight: 500;
  color: #333;
}

.package-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6347;
  margin: 0.5rem 0;
}

.package-link {
  display: inline-block;
  background-color: #ff6347;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
  font-size: 1rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.package-link:hover {
  background-color: #ff1100;
  color: white;
}

.book-button {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.book-button:hover {
  background-color: #ff4500;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #ddd;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  text-align: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.modal-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
}

.modal-content h4 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1.5rem;
  color: #333;
}

.modal-body {
  text-align: left;
  margin-bottom: 1.5rem;
}

.package-details-list,
.package-addons-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.package-details-list li,
.package-addons-list li {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #555;
  line-height: 1.6;
}

.close-button {
  background-color: #333;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #555;
}
</style>
