<template>
  <div>
    <div v-for="item in apiItems" :key="item.id">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DashboardRestWidget",
  props: {
    url: {
      type: String,
      required: true
    },
    proxy: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    }
  },
  data: () => ({
    localItems: null
  }),
  computed: {
    apiItems() {
      return this.localItems || this.items;
    },
    endpoint() {
      return this.proxy ? `${this.proxyUrl}?proxy=${this.url}` : this.url;
    },
    ...mapGetters({ proxyUrl: "applicationConfiguration/getProxyServiceUrl" })
  },
  mounted() {
    this.$emit("loading", true);
    this.$http
      .get(this.endpoint)
      .then(response => {
        // if there is a listener to transform data, emit response, else consider that the response.data is an array
        if (this.$listeners["response"]) {
          this.$emit("response", response);
        } else {
          this.localItems = response.data;
        }
      })
      .catch(err => this.$emit("error", err))
      .finally(() => this.$emit("loading", false));
  }
};
</script>
