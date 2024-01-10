import axios from 'axios';

export async function fetchEmployee(){
    axios.get('Employee/fetchEmployee').then(res => {
        console.log(res.data.result);
    });

    // if(res.data == null || res.data.status == 'error'){
    //     vueToast(res.data.message, 'danger');
    //     return;
    // }

    // if(res) localStorage.setItem('user_info', JSON.stringify(res.data.result));
    // vueToast(res.data.message, 'success');
    
    // return res.data.result
}