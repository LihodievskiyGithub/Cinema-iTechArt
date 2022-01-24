import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './services/socketIo'
import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules";
import Notifications from "@kyvg/vue3-notification";
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});



createApp(App).use(store).use(router).use(Notifications).mount("#app");
