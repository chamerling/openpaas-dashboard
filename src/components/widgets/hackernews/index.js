import Feed from "../rss/components/Feed.vue";

const components = {
  main: { component: Feed }
};

const settings = {
  data: {
    url: "https://news.ycombinator.com/rss",
    limit: 8,
    proxy: true
  }
};

export default {
  title: "Hacker News",
  type: "hackernews",
  icon: "rss_feed",
  description: "Display latest from Hacker News",
  categories: ["news"],
  components,
  settings
};
