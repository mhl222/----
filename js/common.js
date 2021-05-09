const App = {
  data() {
    return {
      message: "Hello Element Plus",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");