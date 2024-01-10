import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginStore = defineStore('login', () => {
    const user = ref(null);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const fetchUserType = async () => {
        let userInfo;
  
        while (!userInfo) {
          userInfo = localStorage.getItem('user_info');
          await delay(100); // Wait for 100 milliseconds before trying again
        }
  
        user.value = userInfo ? JSON.parse(userInfo) : null;
      }

  return {
    // return variables
    user,

    // return functions 
    fetchUserType
  }
})