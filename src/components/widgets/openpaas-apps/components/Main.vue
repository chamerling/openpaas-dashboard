<template>
  <dashboard-apps-grid-widget
    :applications="apps"
    :default-icon-url="defaultIconUrl"
    icon-size="80px"
  />
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OpenPaaSApps",
  data: () => ({
    applications: [
      {
        name: "Inbox",
        url: "/#/unifiedinbox",
        icon: "/unifiedinbox/images/inbox-icon.svg"
      },
      {
        name: "Calendar",
        url: "/#/calendar",
        icon: "/calendar/images/calendar-icon.svg"
      },
      {
        name: "Contacts",
        url: "/#/contact",
        icon: "/contact/images/contacts-icon.svg"
      },
      {
        name: "Video Conference",
        url: "/videoconf/",
        icon: "/videoconference/images/videoconference.svg"
      }
    ]
  }),
  computed: {
    apps() {
      return this.applications.map(application =>
        Object.freeze({
          name: application.name,
          url: this.buildUrl(application.url),
          icon: this.buildUrl(application.icon)
        })
      );
    },
    defaultIconUrl() {
      return this.buildUrl("/images/application.png");
    },
    ...mapState("applicationConfiguration", {
      openpaasUrl: state => state.baseUrl
    })
  },
  methods: {
    buildUrl(url) {
      return new URL(url, this.openpaasUrl).toString();
    }
  }
};
</script>
