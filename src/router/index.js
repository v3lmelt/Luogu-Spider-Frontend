import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import ExerciseView from '../views/ExerciseView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/list',
      children: [
        {
          path: 'list',
          name: 'ExerciseList',
          component: ListView,
        },
        {
          path: 'exercise/:pid',
          name: 'ExerciseContent',
          component: ExerciseView, 
        }
      ]
    },
  ]
})

export default router
