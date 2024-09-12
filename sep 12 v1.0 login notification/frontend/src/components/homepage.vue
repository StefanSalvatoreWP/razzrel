<template>
  <div class="homepage">
    <header :class="{ 'dark-mode': isDarkMode }">
      <div class="content-container header-content">
        <div class="logo-container">
          <img :src="logoPath" alt="Razz Rel Events Logo" class="logo" />
        </div>
        <nav>
          <router-link to="/">Home</router-link>
          <div class="dropdown">
            <button class="dropbtn" @click="toggleDropdown">Packages</button>
            <div class="dropdown-content" v-show="isDropdownOpen">
              <router-link to="/packages/wedding">Wedding</router-link>
              <router-link to="/packages/debut">Debut</router-link>
              <router-link to="/packages/kiddie-party">Kiddie Party</router-link>
              <router-link to="/packages/christening">Christening</router-link>
            </div>
          </div>
          <router-link to="/gallery">Gallery</router-link>
          <router-link to="/contact">Contact</router-link>
        </nav>
        <div class="user-actions">
          <span v-if="user" class="user-name-display">{{ user.fullName }}</span>
          <div class="user-dropdown">
            <div class="user-icon" @click="toggleUserDropdown">
              <span>👤</span>
            </div>
            <div class="user-dropdown-content" v-show="isUserDropdownOpen">
              <span class="user-name">{{ user ? user.fullName : 'Guest' }}</span>
              <template v-if="user">
                <button @click="openSettings" class="dropdown-item">Settings</button>
                <button @click="toggleDarkMode" class="dropdown-item mode-toggle">
                  {{ isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙" }}
                </button>
                <button @click="handleLogout" class="dropdown-item">Logout</button>
              </template>
              <template v-else>
                <button @click="openLoginModal" class="dropdown-item">Login</button>
                <button @click="openRegisterModal" class="dropdown-item">Register</button>
                <button @click="toggleDarkMode" class="dropdown-item mode-toggle">
                  {{ isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙" }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="hero">
        <button class="book-now" @click="handleBookNowClick">BOOK NOW</button>
      </div>
    </main>
    <AboutUS />

    <!-- Login Modal -->
    <Login
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      @close="closeModal"
      @login="handleLogin"
      @switchToRegister="switchToRegister"
    />

    <!-- Register Modal -->
    <Register
      v-if="isModalOpen && activeModal === 'register'"
      :isOpen="isModalOpen"
      @close="closeModal"
      @register="handleRegister"
      @switchToLogin="switchToLogin"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import logoImage from "@/assets/logo.png";
import backgroundImage from "@/assets/bck.png";
import AboutUS from "./aboutUS.vue"; // Import the new AboutUS component
import Login from "./login.vue";
import Register from "./register.vue";

const router = useRouter();
const isDarkMode = ref(false);
const isDropdownOpen = ref(false);
const isModalOpen = ref(false);
const activeModal = ref("login");
const user = ref(null);

const logoPath = ref(logoImage);
const backgroundImageUrl = ref(backgroundImage);

// Form data
const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark-mode", isDarkMode.value);
};

const handleBookNowClick = () => {
  isModalOpen.value = true;
  activeModal.value = "login";
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown when clicking outside
const closeDropdown = (event) => {
  if (!event.target.closest(".dropdown")) {
    isDropdownOpen.value = false;
  }
};

const toggleLoginModal = () => {
  isModalOpen.value = !isModalOpen.value;
  activeModal.value = "login";
};

const closeModal = () => {
  isModalOpen.value = false;
};

const switchToRegister = () => {
  activeModal.value = "register";
};

const switchToLogin = () => {
  activeModal.value = "login";
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const openLoginModal = () => {
  isModalOpen.value = true;
  activeModal.value = "login";
  isUserDropdownOpen.value = false;
};

const openRegisterModal = () => {
  isModalOpen.value = true;
  activeModal.value = "register";
  isUserDropdownOpen.value = false;
};

const closeUserDropdown = (event) => {
  if (!event.target.closest(".user-dropdown")) {
    isUserDropdownOpen.value = false;
  }
};

const handleLogout = () => {
  // Clear the token from localStorage
  localStorage.removeItem('token');
  // Clear user info
  user.value = null;
};

const handleRegister = async (userData) => {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Registration successful');
      // Switch to login modal or automatically log in the user
      switchToLogin();
    } else {
      console.error('Registration failed:', data.message);
      // Handle registration failure (e.g., show an error message)
    }
  } catch (error) {
    console.error('Error during registration:', error);
    // Handle error (e.g., show an error message)
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
  document.addEventListener("click", closeUserDropdown);
  // Check if user is already logged in
  const token = localStorage.getItem('token');
  if (token) {
    // Fetch user info using the token
    fetchUserInfo(token);
  }
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
  document.removeEventListener("click", closeUserDropdown);
});

const fetchUserInfo = async (token) => {
  try {
    const response = await fetch('http://localhost:3000/user/profile', {
      headers: {
        'Authorization': token,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      user.value = userData;
    } else {
      // Token might be invalid or expired
      localStorage.removeItem('token');
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

const isUserDropdownOpen = ref(false);

const openSettings = () => {
  // Implement your settings logic here
  console.log('Open settings');
};
</script>

<style scoped>
/* ... existing styles ... */

.user-dropdown {
  position: relative;
}

.user-icon {
  cursor: pointer;
  padding: 8px;
  font-size: 1.5em; /* Increase icon size */
}

.user-dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  min-width: 200px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
}

.dropdown-item {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  font-size: 14px;
}


.dropdown-item:hover {
  background-color: #444;
  color: white;
}

.mode-toggle {
  
  margin: 8px 0;
  border-radius: 4px;
}

.mode-toggle:hover {
  background-color: #555;
  color: white;
}

.user-name {
  padding: 12px 16px;
  display: block;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #444;
}

.dark-mode span{
 color: white;
}

.dark-mode .user-icon {
  filter: brightness(0) invert(1);
}

.dark-mode .user-dropdown-content {
  background-color: #333;
  color: white;
}

.dark-mode .dropdown-item {
  color: white;
}

.dark-mode .dropdown-item:hover {
  background-color: #444;
  
}

.dark-mode .user-name,
.dark-mode .dark-mode-toggle {
  border-color: #555;
}



/* ... rest of the existing styles ... */
</style>
