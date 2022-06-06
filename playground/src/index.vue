<script setup lang="ts" name="Count">
import { ref } from 'vue'
const num = ref(0)
</script>

<template>
  count: {{ num }} <button @click="num++">
    add
  </button>
</template>
