import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { vueToast } from '../functions'
import { decrypt } from '../functions';

export const useEmployeeStore = defineStore('employee', () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const isLoading = ref(false);
  const closeModal = ref(false);
  const showAddModal = ref(false);
  const showUpdateModal = ref(false);
  const showDeleteModal = ref(false);
  const showSendMessageModal = ref(false);
  const employeeData = ref([]);
  const employeeEmail = ref('');
  const employeePassword = ref('');
  const employeeFirstname = ref('');
  const employeeLastname = ref('');
  const employeeAddress = ref('');
  const updatedPicture = ref('');
  const emailList = ref([]);
  const user = ref(JSON.parse(decrypt(localStorage.getItem('user_info'))));
  const toUpdate = reactive({
    Firstname: '',
    Lastname: '',
    Address: '',
    Email: '',
    LoginID: '',
    EmployeeID: ''
  });

  const fetchEmployeeHandler = async () => {
    try {
      const res = await axios.get(apiUrl + 'fetchEmployee');
      employeeData.value = res.data.result;

      res.data.result.forEach(res => {
        if(res.login_id == user.value.login_id) updatedPicture.value = res.picture;
        emailList.value.push(res.email);
      });

    }catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const addEmployeeHandler = async () => {
    try {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('employeeEmail', employeeEmail.value);
      formData.append('employeePassword', employeePassword.value);
      formData.append('employeeFirstname', employeeFirstname.value);
      formData.append('employeeLastname', employeeLastname.value);
      formData.append('employeeAddress', employeeAddress.value);

      const res = await axios.post(apiUrl + 'addEmployee', formData);

      if(res.data.status == 'error') {
        isLoading.value = false;
        return vueToast(res.data.message, 'danger');
      }

      vueToast(res.data.message, 'success');
      isLoading.value = false;

      employeeEmail.value = '';
      employeePassword.value = '';
      employeeFirstname.value = '';
      employeeLastname.value = '';
      employeeAddress.value = '';

      showAddModal.value = false;
      fetchEmployeeHandler();
    }catch(error) {
      console.log('Error adding employee', error);
    }
  }

  const updateEmployeeHandler = async () => {
    try {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('loginID', toUpdate.LoginID);
      formData.append('toUpdateEmail', toUpdate.Email);
      formData.append('employeeID', toUpdate.EmployeeID);
      formData.append('toUpdateFirstname', toUpdate.Firstname);
      formData.append('toUpdateLastname', toUpdate.Lastname);
      formData.append('toUpdateAddress', toUpdate.Address);

      const res = await axios.post(apiUrl + 'updateEmployee', formData);
      if(!res) vueToast(res.data.message, 'danger');
      vueToast(res.data.message, 'success');
      isLoading.value = false;

      showUpdateModal.value = false;
      fetchEmployeeHandler();
    }catch(error) {
      console.log('Error updating employee', error);
    }
  }

  const deleteEmployeeHandler = async (loginID, employeeID) => {
    try {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('loginID', loginID);
      formData.append('employeeID', employeeID);

      const res = await axios.post(apiUrl + 'deleteEmployee', formData);
      if(!res) vueToast(res.data.message, 'danger');
      vueToast(res.data.message, 'danger');
      isLoading.value = false;

      showDeleteModal.value = false;
      fetchEmployeeHandler();
    }catch(error) {
      console.log('Error deleting employee', error);
    }
  }

  return {
    employeeData, fetchEmployeeHandler, addEmployeeHandler, apiUrl,
    isLoading, employeeFirstname, employeeLastname, employeeAddress, 
    employeeEmail, employeePassword, closeModal, showAddModal,
    showUpdateModal, updateEmployeeHandler, toUpdate, showDeleteModal,
    deleteEmployeeHandler, updatedPicture, showSendMessageModal, emailList,
    user
  }
})