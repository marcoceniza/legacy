import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { vueToast } from '../functions';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { decrypt } from '../functions';
import { lStore } from '../controller';
// import { useEmployeeStore } from '../stores/employeeStore';

export const useLoginStore = defineStore('login', () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const isLoading = ref(false);
  const router = useRouter();
  const email = ref('');
  // const employeeStore = useEmployeeStore();
  const loginInfo = reactive({
    email: '',
    password: ''
  })

  const login = async () => {
    try {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('email', loginInfo.email);
      formData.append('password', loginInfo.password);

      const res = await axios.post(apiUrl + 'userLogin', formData);
      if(res.data.status == 'error') {
        vueToast(res.data.message, 'danger');
        return isLoading.value = false;
      }

      lStore.setObject('user_info', res.data.result);

      setTimeout(() => {
        isLoading.value = false;
        let user = JSON.parse(decrypt(localStorage.getItem('user_info')));

        if (user.user_type == 1) router.push('/admin/dashboard');
        else router.push('/employee/dashboard');
        vueToast(res.data.message, 'success');
        
        // employeeStore.fetchEmployeeHandler();
      }, 500);

    }catch(error) {
      console.log('Something went wrong', error);
    }
  }

  const forgotPassword = async () => {
    try {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('email', email.value);

      const res = await axios.post(apiUrl + 'forgotPassword', formData);
      if(res.data.status == 'error') {
        vueToast(res.data.message, 'danger');
        return isLoading.value = false;
      }

      vueToast(res.data.message, 'success');
      isLoading.value = false;
      email.value = '';

    }catch(error) {
      console.log('Something went wrong', error);
    }
  }

  return {
    login, loginInfo, isLoading, forgotPassword,
    email
  }
})