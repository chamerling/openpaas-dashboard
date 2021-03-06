import store from "./store";
import Contact from "./components/Contact";

const components = {
  main: { component: Contact, title: "Contacts" }
};

export default {
  title: "Contact",
  type: "contact",
  icon: "account_circle",
  description: "Search contacts",
  categories: ["contact", "openpaas"],
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("contact/resetContactState");
    }
  }
};
