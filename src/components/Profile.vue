<template>
  <div class="">
    <p>{{ $route.params.id }}</p>
    <p>{{ id }}</p>
  </div>
</template>

<script>
export default { props: ["id"], name: "Profile-user" };
</script>

<style lang="scss" scoped></style>
