import Vue from 'vue'

export default () => {
  Vue.filter('stripHTML', function (value) {
    return (value || '').replace(/<\/?[^>]+>/gi, ' ')
  })
}
