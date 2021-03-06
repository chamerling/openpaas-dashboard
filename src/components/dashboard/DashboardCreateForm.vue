<template>
  <div>
    <v-list-tile data-test="dashboard-create-item" @click="openDialog()">
      {{$t("Create a new dashboard")}}
    </v-list-tile>
    <v-dialog v-model="dashboardDialog" scrollable max-width="500px">
      <v-card color="grey lighten-4" data-test="dashboard-create-dialog">
        <v-card-title>
        <span class="headline">{{ $t('Create a new dashboard') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" @submit.prevent="create" data-test="dashboard-create-form">
            <v-text-field
              v-if="dashboardDialog"
              name="name"
              v-model="newDashboardName"
              :rules="dashboardNameRules"
              :label="$t('Name')"
              required
              ref="name"
              autofocus
            >
            </v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                data-test="dashboard-create-dialog-cancel"
                color="primary"
                flat
                @click="cancel()"
              >{{$t("Cancel")}}</v-btn>
              <v-btn
                flat
                color="primary"
                :disabled="!newDashboardName || !valid"
                data-test="dashboard-create-form-button"
                @click="create">{{ $t('Create') }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { routeNames } from "@/router";
import { dashboardNameRulesAll } from "@/utils/rules";
export default {
  name: "DashboardCreateForm",
  data: () => ({
    valid: false,
    dashboardDialog: false,
    newDashboardName: "",
    dashboardNameRules: dashboardNameRulesAll
  }),
  methods: {
    openDialog() {
      setTimeout(() => {
        this.dashboardDialog = true;
        this.$refs["name"] && this.$refs["name"].focus();
      });
    },
    cancel() {
      this.dashboardDialog = false;
      this.newDashboardName = "";
    },
    async create() {
      if (!this.valid) {
        return;
      }

      try {
        const newDashboard = await this.$store.dispatch("dashboard/addDashboard", {
          name: this.newDashboardName,
          widgets: []
        });

        this.$store.dispatch(
          "ui/displaySnackbarMessage",
          this.$t("Dashboard {name} has been created", { name: newDashboard.name })
        );

        this.dashboardDialog = false;
        this.newDashboardName = "";
        this.$router.push({ name: routeNames.DASHBOARD, params: { id: newDashboard.id } });
      } catch (err) {
        console.log("Error while creating dashboard", err);
        this.$store.dispatch("ui/displaySnackbarMessage", this.$t("Error while creating dashboard, please try again"));
      }
    }
  }
};
</script>
