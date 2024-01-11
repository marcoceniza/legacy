import { defineStore } from 'pinia'
import { useRoute } from 'vue-router';
import { ref } from 'vue';

export const useCustomStore = defineStore('custom', () => {
  const route = useRoute();
  const showPass = ref(false);
  const showNewPass = ref(false);
  const showConfirmPass = ref(false);
  
  const isCurrentRoute = (path) => {
    return route.path === path;
  };

  const togglePass = () => {
    showPass.value = !showPass.value;
  }

  const toggleNewPass = () => {
    showNewPass.value = !showNewPass.value;
  }

  const toggleConfirmPass = () => {
    showConfirmPass.value = !showConfirmPass.value;
  }

  return {
    isCurrentRoute, toggleNewPass, toggleConfirmPass, showNewPass,
    showConfirmPass, togglePass, showPass
  }
})