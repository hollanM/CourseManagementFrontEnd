<template>
  <div v-if="show" class="modal">
    <h4>{{ course.title }}</h4>
    <p>{{ course.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    course: Object,
    show: Boolean
  }
}
</script>

<style>
.modal {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
</style>
