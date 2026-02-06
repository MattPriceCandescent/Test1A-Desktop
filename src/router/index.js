import { createRouter, createWebHistory } from 'vue-router'
import { isValidStepPage } from '../data/onboardingConfig'

const router = createRouter({
  history: createWebHistory('/Test1A-Desktop/'),
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: () => import('../views/Overview.vue')
    },
    {
      path: '/step/:stepId/page/:pageId',
      name: 'StepPage',
      component: () => import('../views/StepPage.vue'),
      beforeEnter: (to, _from, next) => {
        const stepId = to.params.stepId
        const pageId = to.params.pageId
        if (isValidStepPage(stepId, pageId)) {
          next()
        } else {
          next({ name: 'Overview' })
        }
      }
    }
  ]
})

export default router
