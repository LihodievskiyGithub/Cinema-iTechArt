import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules";
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});



createApp(App).use(store).use(router).mount("#app");
