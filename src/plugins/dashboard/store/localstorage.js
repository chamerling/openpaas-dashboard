import Vue from "vue";

const LOCALSTORAGE_CARDS_KEY = "op.dashboard.cards";
const LOCALSTORAGE_DASHBOARDS_KEY = "op.dashboard.dashboards";

const state = {
  cards: JSON.parse(localStorage.getItem(LOCALSTORAGE_CARDS_KEY) || "{}"),
  dashboards: JSON.parse(localStorage.getItem(LOCALSTORAGE_DASHBOARDS_KEY) || "[]")
};

const types = {
  ADD_CARD: "ADD_CARD",
  REMOVE_CARD: "REMOVE_CARD",
  ORDER_CARDS: "ORDER_CARDS",
  ADD_DASHBOARD: "ADD_DASHBOARD",
  REMOVE_DASHBOARD: "REMOVE_DASHBOARD",
  RENAME_DASHBOARD: "RENAME_DASHBOARD",
  ADD_CARD_TO_DASHBOARD: "ADD_CARD_TO_DASHBOARD",
  REMOVE_CARD_FROM_DASHBOARD: "REMOVE_CARD_FROM_DASHBOARD",
  UPDATE_CARD_SETTINGS: "UPDATE_CARD_SETTINGS"
};

const actions = {
  addCard({ commit }, { card, dashboard }) {
    commit(types.ADD_CARD, card);
    commit(types.ADD_CARD_TO_DASHBOARD, { card, dashboard });

    return Promise.resolve();
  },

  removeCard({ commit }, { card, dashboard }) {
    return new Promise(resolve => {
      commit(types.REMOVE_CARD, card);
      commit(types.REMOVE_CARD_FROM_DASHBOARD, { card, dashboard });
      resolve();
    });
  },

  setCardsOrder({ commit }, { cards, dashboard }) {
    return new Promise(resolve => {
      commit(types.ORDER_CARDS, { cards, dashboard });
      resolve();
    });
  },

  addDashboard({ commit }, dashboard) {
    if (!dashboard.widgets) {
      dashboard.widgets = [];
    }
    return new Promise(resolve => {
      commit(types.ADD_DASHBOARD, dashboard);
      resolve();
    });
  },

  removeDashboard({ commit }, dashboard) {
    return new Promise(resolve => {
      commit(types.REMOVE_DASHBOARD, dashboard);
      resolve();
    });
  },

  renameDashboard({ commit }, { dashboard, newname }) {
    return new Promise(resolve => {
      commit(types.RENAME_DASHBOARD, { dashboard, newname });
      resolve();
    });
  },

  updateCardSettings({ commit }, { card, settings }) {
    return new Promise(resolve => {
      commit(types.UPDATE_CARD_SETTINGS, { card, settings });
      resolve();
    });
  }
};

const mutations = {
  [types.ADD_CARD](state, card) {
    Vue.set(state.cards, card.id, card);

    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
  },

  [types.REMOVE_CARD](state, card) {
    delete state.cards[card.id];

    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
  },

  [types.ORDER_CARDS](state, { cards, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index < 0) {
      return;
    }

    state.dashboards[index].widgets.length = 0;
    state.dashboards[index].widgets = cards;

    localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
  },

  [types.UPDATE_CARD_SETTINGS](state, { card, settings }) {
    if (!state.cards[card.id]) {
      return;
    }

    Vue.set(state.cards[card.id], "settings", settings);
    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
  },

  [types.ADD_DASHBOARD](state, dashboard) {
    state.dashboards.push(dashboard);

    localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
  },

  [types.REMOVE_DASHBOARD](state, dashboard) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      Vue.delete(state.dashboards, index);
    }

    localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
  },

  [types.RENAME_DASHBOARD](state, { dashboard, newname }) {
    dashboard.name = newname;
    localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
  },

  [types.ADD_CARD_TO_DASHBOARD](state, { card, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      state.dashboards[index].widgets.push(card.id);
      localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
    }
  },

  [types.REMOVE_CARD_FROM_DASHBOARD](state, { card, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      const cardIndex = state.dashboards[index].widgets.findIndex(widget => widget === card.id);

      if (cardIndex > -1) {
        Vue.delete(state.dasboards[index].widgets, cardIndex);
        localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
      }
    }
  }
};

const getters = {
  getCards({ cards }) {
    return cards;
  },

  getWidgetsForDashboard: state => id => {
    const index = state.dashboards.findIndex(dashboard => dashboard.id === id);

    if (index < 0) {
      return [];
    }

    return (state.dashboards[index].widgets || []).map(id => state.cards[id]).filter(Boolean);
  },

  getDashboards: state => {
    return state.dashboards;
  },

  getDashboardFromId: state => id => {
    const index = state.dashboards.findIndex(dashboard => dashboard.id === id);

    return state.dashboards[index];
  },

  getSettingsForWidget: state => id => {
    if (!state.cards[id]) {
      return null;
    }

    return state.cards[id].settings || {};
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
