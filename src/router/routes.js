import Ankete from "../views/Ankete.vue";
import Stats from "../views/Stats.vue";
import Test from "../views/Test.vue";


export const routes = [
  { path: "/", component: Ankete },
  { path: "/stats", component: Stats },
  { path: "/test", component: Test }
];
