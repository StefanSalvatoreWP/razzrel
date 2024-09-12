<template>
  <div>
    <div class="login-modal" v-if="isOpen">
      <div class="login-content">
        <button class="close-button" @click="$emit('close')">&times;</button>
        <h2 class="login-title">Sign in to Razz Rel Events</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
        <div class="register-option">
          Do not have an account?
          <a href="#" @click.prevent="$emit('switchToRegister')">Sign Up</a>
        </div>
      </div>
    </div>

    <!-- Success Notification -->
    <Teleport to="body">
      <div v-if="showSuccessNotification" class="success-notification">
        <div class="success-content">
          <i class="fas fa-check-circle"></i>
          <p>Login Successful!</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["close", "login", "switchToRegister"]);

const email = ref("");
const password = ref("");
const showSuccessNotification = ref(false);

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await response.json();

    if (response.ok && data.auth) {
      localStorage.setItem('token', data.token);
      
      // Show success notification
      showSuccessNotification.value = true;
      
      // Set a timeout to close the modal and refresh the page after showing the notification
      setTimeout(() => {
        emit('close'); // Close the modal
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 500); // Small delay to ensure modal is closed before refresh
      }, 2000); // Show notification for 2 seconds before closing modal

      // Clear form fields
      email.value = "";
      password.value = "";
    } else {
      console.error('Login failed:', data.message);
      alert('Login failed: ' + (data.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again.');
  }
};
</script>

<style scoped>
.login-modal {
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

.login-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.login-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.form-actions {
  margin-top: 1rem;
}

button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background: #333;
}

.register-option {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.register-option a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

.register-option a:hover {
  text-decoration: underline;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #aaa;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-button:hover,
.close-button:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.success-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1100;
  animation: slideIn 0.5s ease-out;
}

.success-content {
  display: flex;
  align-items: center;
}

.success-content i {
  font-size: 24px;
  margin-right: 10px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* ... rest of the existing styles ... */
</style>
