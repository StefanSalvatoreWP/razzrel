<template>
  <div class="gallery-page" :class="{ 'dark-mode': isDarkMode }">
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
              <router-link to="/packages/kiddie-party"
                >Kiddie Party</router-link
              >
              <router-link to="/packages/christening">Christening</router-link>
            </div>
          </div>
          <router-link to="/gallery">Gallery</router-link>
          <router-link to="/contact">Contact</router-link>
        </nav>
        <div class="user-actions">
          <button @click="toggleDarkMode" class="dark-mode-toggle">
            {{ isDarkMode ? "☀️" : "🌙" }}
          </button>
          <div class="user-icon" @click="toggleLoginModal">
            <span>👤</span>
          </div>
        </div>
      </div>
    </header>

    <div class="gallery">
      <h1>Gallery</h1>
      <div class="posts-container">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <div class="author-avatar">👤</div>
            <div class="post-info">
              <h3 class="author-name">{{ post.authorName }}</h3>
              <p class="post-date">{{ post.date }}</p>
            </div>
          </div>
          <p class="post-content">{{ post.content }}</p>
          <img :src="post.image" :alt="post.content" class="post-image" />
        </div>
      </div>
    </div>

    <!-- Add these lines at the end of the template -->
    <Login
      v-if="isModalOpen && activeModal === 'login'"
      :isOpen="isModalOpen"
      @close="closeModal"
      @login="handleLogin"
      @switchToRegister="switchToRegister"
    />
    <Register
      v-if="isModalOpen && activeModal === 'register'"
      :isOpen="isModalOpen"
      @close="closeModal"
      @register="handleRegister"
      @switchToLogin="switchToLogin"
    />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import g1Image from "../assets/gallery/g1.jpg";
import g2Image from "../assets/gallery/g2.jpg";
import logoImage from "../assets/logo.png";
import Login from "./login.vue";
import Register from "./register.vue";

export default {
  name: "Gallery",
  components: {
    Login,
    Register
  },
  setup() {
    const isDarkMode = ref(false);
    const isDropdownOpen = ref(false);
    const logoPath = ref(logoImage);
    const isModalOpen = ref(false);
    const activeModal = ref("login");

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.body.classList.toggle("dark-mode", isDarkMode.value);
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

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

    const handleLogin = (credentials) => {
      console.log("Login credentials received:", credentials);
      closeModal();
    };

    const handleRegister = (userData) => {
      console.log("Registration data received:", userData);
      closeModal();
    };

    onMounted(() => {
      document.addEventListener("click", closeDropdown);
    });

    onUnmounted(() => {
      document.removeEventListener("click", closeDropdown);
    });

    return {
      isDarkMode,
      isDropdownOpen,
      logoPath,
      isModalOpen,
      activeModal,
      toggleDarkMode,
      toggleDropdown,
      toggleLoginModal,
      closeModal,
      switchToRegister,
      switchToLogin,
      handleLogin,
      handleRegister
    };
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          authorName: "John Doe",
          date: "September 6, 2024",
          content: "Check out this amazing event we organized!",
          image: g1Image,
        },
        {
          id: 2,
          authorName: "Jane Smith",
          date: "September 5, 2024",
          content: "Beautiful wedding setup from last weekend.",
          image: g2Image,
        },
        // Add more posts as needed
      ],
    };
  },
};
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  transition: background-color 0.3s;
}

.gallery-page.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.gallery-page.dark-mode h1 {
  color: #ffffff;
}

/* Your existing gallery styles */
.gallery {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.posts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-card {
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  background-color: #ffffff;
  color: #000000;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 24px;
}

.post-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: bold;
  margin: 0;
}

.post-date {
  font-size: 0.8em;
  color: #666;
  margin: 0;
}

.post-content {
  margin-bottom: 15px;
}

.post-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

/* Ensure header text is visible in dark mode */
.gallery-page.dark-mode .logo,
.gallery-page.dark-mode nav a,
.gallery-page.dark-mode .user-actions {
  color: #ffffff;
}

/* Keep dropdown text dark */
.gallery-page.dark-mode .dropdown-content a {
  color: #000000;
}
</style>
