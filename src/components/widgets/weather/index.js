import Weather from "./components/Weather.vue";
import store from "./store";

const components = {
  main: { component: Weather, color: "primary" }
};

export default {
  title: "Weather",
  type: "weather",
  icon: "cloud_queue",
  description: "Local weather forecast",
  categories: ["weather"],
  components,
  store,
  hooks: {
    onRemove: store => {
      store.dispatch("weather/resetWeatherState");
    }
  }
};
