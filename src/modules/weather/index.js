import Weather from "./components/Weather.vue";
import store from "./store";

const components = [{ component: Weather, color: "primary" }];

export default {
  name: "weather",
  components,
  store
};