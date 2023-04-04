<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import com from './index.vue'

const el = ref()

const at = ref('99')

onMounted(() => {
  el.value.num = 50
  console.log(el.value.num)
  console.log(el.value, '---refs')
  console.log(el.value.attrs, '---attrs')
})
</script>

<template>
  <com ref="el" :tt="at" style="height:80px" />
  {{ el?.num }}
</template>
