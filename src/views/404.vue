<template>
    <main class="main">
        <div class="forgot-body">
            <div class="forgotform">
                <div class="text-center mb-3 mt-0">
                    <div class="text-center mb-5 mt-2 mx-5">
                        <img src="../assets/logo.svg" class="img-fluid" />
                    </div>
                    <h1 class="text-white fw-bolder">404 Page Not Found</h1>
                    <p class="text-white">The Page you trying to access not found</p>
                </div>
                <div class="container">
                    <form class="d-flex justify-content-center">
                        <button @click="Goback" class="btn btn-primary btn-lg col-3 mt-3 mx-1" type="button">Back</button>
                        <button @click="logout" class="btn btn-danger btn-lg col-3 mt-3 mx-1" type="button">Logout</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>
    
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const btnloader = ref(false)

function Goback(){
    if(btnloader.value) return;
    router.go(-1);
}

const logout = () => {
    localStorage.clear();
    window.location.href = '/';
}
</script>
    
<style scoped>
.main::before{content: ''; background: linear-gradient(to top, #0d6efd, white); width: 100%; height: 100%; position: absolute; left: 0; top: 0;}
img{width: 300px;max-width: 100%;}
.form-control{
    border-radius: 4px !important;
}
label{
    color: #626262;
}

.forgotform{
    position: absolute;
    top: 10%;
    bottom: 0;
    left: 0%;
    right: 0%;
}

.form-signin{
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

.shadow{
    background-color: #1c4a98 !important;
    border-radius: 4px !important;
    color: #fff;
}

.btn-link{
    color: #fff !important;
}

.card{
    padding: 15px 15px;
}

.card-width{
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}
.form-control{
    background-color: #f5f5f5;
}
</style>