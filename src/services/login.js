import { axios, vueToast } from '@/functions';

export async function login(email, password){
    const res = await axios.post('Login/userLogin',null,{
        email: email,
        password: password
    })

    if(res.data == null || res.data.status == 'error'){
        vueToast(res.data.message, 'danger');
        return;
    }

    if(res) localStorage.setItem('user_info', JSON.stringify(res.data.result));
    vueToast(res.data.message, 'success');
    
    return res.data.result
}