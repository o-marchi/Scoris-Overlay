<script setup lang="ts">
import { computed } from 'vue';
import VueMarkdown from 'vue-markdown-render';
</script>

<template>
  <div class="home">
    <div class="content">
      <div class="item" v-for="i in 4" :key="i">
        <p>Level {{ i }}</p>
        <small>Testing shadows</small>
      </div>
    </div>
  </div>
</template>
