import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { initializeAnalytics } from "./composables/analytics";

initializeAnalytics();
createApp(App).mount("#app");
