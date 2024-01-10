import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { vueToast } from '../functions'
import { useEmployeeStore } from '../stores/employeeStore';

export const useMessageStore = defineStore('message', () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const isSending = ref(false);
  const isBulkSend = ref(false);
  const employeeStore = useEmployeeStore();
  const message = reactive({
    Email: [],
    Subject: '',
    Message: ''
  });

  const sendMessageHandler = async () => {
    try {
      isSending.value = true;
      const formData = new FormData();
      formData.append('email', isBulkSend ? employeeStore.emailList : message.Email);
      formData.append('subject', message.Subject);
      formData.append('message', message.Message);

      const res = await axios.post(apiUrl + 'sendMessage', formData);
      if(res.data.status == 'error') {
        vueToast(res.data.message, 'danger');
        return isSending.value = false;
      }
      vueToast(res.data.message, 'success');
      isSending.value = false;

      message.Email = [];
      message.Subject = '';
      message.Message = '';

    }catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const bulkSend = () => {
    isBulkSend.value = !isBulkSend.value;
  }

  return {
    apiUrl, message, sendMessageHandler, isSending,
    isBulkSend, bulkSend
  }
})