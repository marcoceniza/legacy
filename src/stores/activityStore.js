import { defineStore } from 'pinia';
import { ref } from 'vue';
import { vueToast } from '../functions';
import { decrypt } from '../functions';
import axios from 'axios';
import { useProfileStore } from './profileStore';

export const useActivityStore = defineStore('activity', () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const user = ref(JSON.parse(decrypt(localStorage.getItem('user_info'))));
  const activityData = ref([]);
  const formText = ref([]);
  const formList = ref([]);
  const isShowActivityModal = ref(false);
  const profileStore = useProfileStore();
  const isSubmit = ref(false);

  const fetchFormNames = async () => {
    try {
      const res = await axios.get(apiUrl + 'fetchForms');
      res.data.result.forEach(el => {
        formText.value.push(el.form_text);
      });
      if(res.data.status == 'error') {
        vueToast(res.data.message, 'danger');
        return;
      }

    }catch(error) {
      console.log('Something went wrong', error);
    }
  }

  fetchFormNames();

  const fetchActivityData = async () => {
    try {
      const formData = new FormData();
      formData.append('loginID', user.value.login_id);

      const res = await axios.post(apiUrl + 'fetchActivity', formData);
      formList.value = res.data.result;
      res.data.result.forEach(el => {
        activityData.value.push(el.form_name);
      });
      if(res.data.status == 'error') {
        vueToast(res.data.message, 'danger');
        return;
      }

    }catch(error) {
      console.log('Something went wrong', error);
    }
  }

  fetchActivityData();

  const submitForm = async () => {
    try {
      isSubmit.value = true;
      const formData = new FormData();
      formData.append('formName', localStorage.getItem('form_name'));
      formData.append('firstName', profileStore.profileData.employee_firstname);
      formData.append('lastName', profileStore.profileData.employee_lastname);
      formData.append('email', user.value.email);
      formData.append('loginID', user.value.login_id);

      const res = await axios.post(apiUrl + 'submitActivityLog', formData);
      isSubmit.value = false;
      if(res.data.status == 'error') {
        vueToast(res.data.message, 'danger');
        return
      }
      vueToast(res.data.message, 'success');

    }catch(error) {
      console.log('Something went wrong', error);
    }
  }

  const resetActivityData = async () => {
    try {
      const res = await axios.get(apiUrl + 'resetActivity');
      if(res.data.status == 'error') return vueToast(res.data.message, 'danger');
      vueToast(res.data.message, 'success');
    }catch(error) {
      console.log('Something went wrong', error);
    }
  }

  return {
    apiUrl, submitForm, fetchActivityData,
    activityData, user, fetchFormNames, formText, formList,
    isShowActivityModal, isSubmit, resetActivityData
  }
})