import { defineStore } from 'pinia'
import { useRoute } from 'vue-router';

export const useCustomStore = defineStore('custom', () => {
  const route = useRoute();
  
  const isCurrentRoute = (path) => {
    return route.path === path;
  };

  return { isCurrentRoute }
})