import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import ContactUs from "../components/ContactUs.vue";
import Gallery from "../components/Gallery.vue";
import Packages from "../components/packages.vue";
import WeddingPackage from "../components/packages/WeddingPackage.vue";
import DebutPackage from "../components/packages/DebutPackage.vue";
import KiddiePartyPackage from "../components/packages/KiddiePartyPackage.vue";
import ChristeningPackage from "../components/packages/ChristeningPackage.vue";
import Login from '../components/login.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactUs,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
  },
  {
    path: "/packages",
    component: Packages,
    children: [
      {
        path: "wedding",
        name: "WeddingPackage",
        component: WeddingPackage,
      },
      {
        path: "debut",
        name: "DebutPackage",
        component: DebutPackage,
      },
      {
        path: "kiddie-party",
        name: "KiddiePartyPackage",
        component: KiddiePartyPackage,
      },
      {
        path: "christening",
        name: "ChristeningPackage",
        component: ChristeningPackage,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
