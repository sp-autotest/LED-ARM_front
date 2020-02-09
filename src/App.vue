<template>
  <v-app>
    <keep-alive>
      <component :is="layout">
        <router-view/>
      </component>
    </keep-alive>
  </v-app>
</template>

<script>
  const default_layout = "default_component";
  import default_component from '@/layouts/default';
  import base_component from '@/layouts/_base';
  export default {
    components: {
      default_component,
      base_component
    },
    computed: {
      layout() {
        return (this.$route.meta.layout || default_layout)
      }
    }
  }

</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import '../src/assets/CSS Fonts/fonts.css';
</style>
