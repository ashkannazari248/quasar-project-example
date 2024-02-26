import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'
import { RouteLocationNormalized } from 'vue-router';

export default boot(async ({ router }) => {
  const getToken = () => LocalStorage.getItem('token') ?? null
  function getMeta(to:RouteLocationNormalized,key:string){
    return to.matched.some(record => Object.prototype.hasOwnProperty.call(record.meta, key))
  }
  router.beforeEach((to, from, next) => {
    const requireAuth= getMeta(to,'auth')
    if(getToken() && ['login'].includes(to?.name?.toString()||'nameless'))
      next({
        name: from?.name||'home',
      })
    if (!requireAuth) next()
    else {
      if (!getToken() && to.name !== 'login') {
        next({
          name: 'login',
          query: { next: to.fullPath }
        })
      }
      else {
        next()
      }
    }
  })
})
