<script setup>
import { onMounted, ref } from 'vue'
import com from './src/index.vue'

const msg = ref()

const at = ref('99')

onMounted(() => {
  msg.value.num = 50
  console.log(msg.value.num)
  console.log(msg.value, '---refs')
  console.log(msg.value.attrs, '---attrs')
})
</script>

<template>
  <com ref="msg" :tt="at" style="height:80px" />
</template>
