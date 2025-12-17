<script setup lang="ts"></script>

<template>
  <div>
    <div class="content">
      <div class="item" v-for="i in 4" :key="i">
        <p>Level {{ i }}</p>
        <small>Testing shadows</small>
      </div>
    </div>
  </div>
</template>
