import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { vueToast } from '../functions'

export const useProfileStore = defineStore('profile', () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const isLoading = ref(false);
    const profileData = ref([]);
    const showUpdatePassModal = ref(false);
    const toUpdate = reactive({
        Firstname: '',
        Lastname: '',
        Address: '',
        Email: '',
        Password: '',
        LoginID: '',
        EmployeeID: ''
    });
    const password = reactive({
        newPassword: '',
        confirmPassword: ''
    });
    const user = ref(JSON.parse(localStorage.getItem('user_info')));
    const file = ref('');
  
    const fetchProfileHandler = async () => {
        try {
            isLoading.value = true;
            const res = await axios.get(apiUrl + 'fetchProfile');
            res.data.result.forEach(res => {
                if(res.login_id == user.value.login_id) {
                    profileData.value = res;
                    toUpdate.Firstname = res.employee_firstname;
                    toUpdate.Lastname = res.employee_lastname;
                    toUpdate.Address = res.employee_address;
                    toUpdate.Email = res.email;
                    toUpdate.Password = res.password;
                    toUpdate.LoginID = res.login_id;
                    toUpdate.EmployeeID = res.employee_id;
                }
            });
            isLoading.value = false;

        }catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const updateProfileHandler = async () => {
        try {
          isLoading.value = true;
          const formData = new FormData();
          formData.append('loginID', toUpdate.LoginID);
          formData.append('toUpdateEmail', toUpdate.Email);
          formData.append('employeeID', toUpdate.EmployeeID);
          formData.append('toUpdateFirstname', toUpdate.Firstname);
          formData.append('toUpdateLastname', toUpdate.Lastname);
          formData.append('toUpdateAddress', toUpdate.Address);
    
          const res = await axios.post(apiUrl + 'updateProfile', formData);
          if(!res) vueToast(res.data.message, 'danger');
          vueToast(res.data.message, 'success');
          isLoading.value = false;
    
          fetchProfileHandler();
        }catch(error) {
          console.log('Error updating profile', error);
        }
    }

    const updatePasswordHandler = async () => {
        try {
            isLoading.value = true;
            const formData = new FormData();
            formData.append('loginID', user.value.login_id);
            formData.append('newPassword', password.newPassword);

            const res = await axios.post(apiUrl + 'updatePassword', formData);
            if(res.data.status == 'error') {
                vueToast(res.data.message, 'danger');
                return isLoading.value = false;
            }
            vueToast(res.data.message, 'success');
            isLoading.value = false;

            password.newPassword = '';
            password.confirmPassword = '';
            showUpdatePassModal.value = false;
            fetchProfileHandler();
        }catch(error) {
            console.log('Error updating password', error);
        }
    }

    const updateProfilePicture = async () => {
        try {
            isLoading.value = true;
            const formData = new FormData();
            formData.append('loginID', toUpdate.LoginID);
            formData.append('picture', file.value);

            const res = await axios.post(apiUrl + 'updatePicture', formData);
            if(!res) vueToast(res.data.message, 'danger');
            vueToast(res.data.message, 'success');
            isLoading.value = false;

            fetchProfileHandler();
        }catch(error) {
            console.log('Error updating picture', error);
        }
    }

    return {
        apiUrl, isLoading, profileData, toUpdate,
        fetchProfileHandler, updateProfileHandler, updatePasswordHandler,
        updateProfilePicture, file, user, showUpdatePassModal,
        password
    }
})