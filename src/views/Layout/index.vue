<template>
  <div
    id="layout"
    :class="isCollapse?'close':'open'"
  >
    <Header></Header>
    <Nav></Nav>
    <Main></Main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Nav from './components/Nav.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
export default {
  name: 'layout',
  computed: {
    ...mapGetters('app', ['isCollapse'])
  },
  components: {
    Nav,
    Header,
    Main,
  },
  setup: {},
}
</script>

<style lang="scss" scoped></style>
