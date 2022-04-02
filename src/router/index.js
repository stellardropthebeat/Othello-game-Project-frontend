import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/game",
    name: "Game",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/GameView.vue"),
  },
  {
    path: "/waiting",
    name: "Waiting",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/WaitingView"),
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => import("../views/SigninView"),
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: () => import("../views/LeaderboardView"),
  },
  {
    path: "/credit",
    name: "Credit",
    component: () => import("../views/CreditView"),
  },
];

const router = new VueRouter({
  routes,
});

// setup beforeEach hook to check the logged in sync the loggin states with backend
router.beforeEach(async (to, from, next) => {
  //get login state from using whoami
  let response = await Vue.axios.get("/api/whoami");

  // response.data is our payload
  await store.dispatch("setLoggedInUser", response.data);
  let isLoggedIn = store.state.isLoggedIn;

  // make sure the user is logged, you will not see the login page
  if (to.name === "Login" && isLoggedIn){
    next({ name: "Home" });
  }

  // if the name of the router is not Login, it needs authorization
  if (to.name !== "Login" && to.name !== "SignIn" && !isLoggedIn) {

    // redirect to login page
    next({ name: "Login" });
  } else {

    //otherwise, let go
    next();
  }
});

export default router;
