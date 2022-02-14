export default function ({ store, redirect }) {
  if (store.getters['authStore/getAuthentication']) {
    return redirect('/')
  }
}
