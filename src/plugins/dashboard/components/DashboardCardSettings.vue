<template>
  <v-card>
    <v-card-title>
      <span class="headline">Settings</span>
      <v-spacer/>
      <v-btn icon @click="close()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <component :is="view" :settings="settings" :card="card" @updated="updateSettings"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCardSettings",
  props: {
    dashboard: {
      type: Object,
      required: true
    },
    card: {
      type: Object,
      required: true
    },
    settings: {
      // the settings hash
      type: Object,
      required: true
    },
    view: {
      // The Vue component to display
      type: Object,
      required: true
    },
    width: {
      type: String,
      default: "400px"
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async updateSettings(settings) {
      try {
        await this.$store.dispatch("dashboard/updateCardSettings", {
          dashboard: this.dashboard,
          card: this.card,
          settings
        });
      } catch (err) {
        console.log("Error while editing settings", err);
      }
      this.close();
    }
  }
};
</script>
