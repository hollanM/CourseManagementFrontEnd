import { createRouter, createWebHistory } from "vue-router";
import CoursesList from "./views/CoursesList.vue";
import EditCourse from "./views/EditCourse.vue";
import AddCourse from "./views/AddCourse.vue";
import ViewCourse from "./views/ViewCourse.vue";
import HomeView from "./views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/courselist",
      name: "courses",
      component: CoursesList,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditCourse,
      props: true,
    },
    {
      path: "/add",
      name: "add",
      component: AddCourse,
    },
    {
      path: "/view/:id",
      name: "view",
      component: ViewCourse,
      props: true,
    },
  ],
});

export default router;
