<script setup></script>

<template>
  <div class="page">
    <router-view />
  </div>
</template>

<style>
:root {
  --standard-spacing: 10px;
  --standard-radius: 8px;
}

html,
body {
  margin: 0;
  padding: 0;

  font-family: 'Inter', sans-serif;
  color: #333;
}
</style>
