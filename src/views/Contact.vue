<template>
  <div class="Profile">
    <button v-on:click="component = 'Signup'">Signup</button>
    <button v-on:click="component = 'Lignin'">Lignin</button>
    <keep-alive>
      <component :is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import Signup from "../components/Signup.vue";
import Lignin from "../components/Lignin.vue";
export default {
  name: "contact-us",
  data() {
    return {
      component: "Signup",
    };
  },
  components: {
    Signup,
    Lignin,
  },
};
</script>
