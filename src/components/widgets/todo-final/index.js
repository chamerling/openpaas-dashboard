import Main from "./components/Main.vue";
import store from "./store";

const components = {
  main: { component: Main, title: "Todo", columns: 2 }
};

const settings = {};

export default {
  title: "Todo Final",
  type: "linagora.esn.todo-final",
  icon: "check_box",
  description: "A simple Todo app",
  categories: ["todo", "openpaas"],
  store,
  components,
  settings
};
