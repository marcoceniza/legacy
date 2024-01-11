<template>
    <div class="container translate-y-[-35%] absolute left-0 right-0 top-[35%] custom-bg">
        <form class="max-w-[450px] mx-auto rounded-[12px] py-[15px] px-[10px]">
            <figure><img class="mx-auto d-block w-[250px] mb-3" src="../assets/images/main-logo.png" alt="main logo"></figure>
            <p class="text-center text-[20px] font-bold d-block text-[#fff]">Sign In</p>
            <p class="d-block text-center mb-[30px] text-[#fff]">Please Sign in to your account</p>
            <label for="email-address-icon" class="block my-2 text-sm font-medium text-[#fff]">Your Email</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><EnvelopeIcon class="h-6 w-6 text-gray-500" /></div>
                <input type="text" v-model="loginStore.loginInfo.email" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Email">
            </div>
            <label for="email-address-icon" class="block my-2 text-sm font-medium text-[#fff]">Your Password</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><KeyIcon class="h-6 w-6 text-gray-500" /></div>
                <input :type="customStore.showPass ? 'text' : 'password'" v-model="loginStore.loginInfo.password" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Password">
                <EyeIcon @click="customStore.togglePass" v-show="!customStore.showPass && loginStore.loginInfo.password.length > 0" class="h-5 w-5 text-gray-500 cursor-pointer absolute right-1 top-[13px]" />
                <EyeSlashIcon @click="customStore.togglePass" v-show="customStore.showPass && loginStore.loginInfo.password.length > 0" class="h-5 w-5 text-gray-500 cursor-pointer absolute right-1 top-[13px]" />
            </div>
            <a @click="$router.push('/forgot-password')" class="cursor-pointer no-underline hover:underline text-right d-block text-[14px] mt-3 text-[#fff]">Forgot Password?</a>
            <button @click.prevent="loginStore.login" class="cursor-pointer d-block p-2 bg-[#0a4a7d] hover:bg-[#1d67a2] text-center w-100 text-[#fff] mt-3 rounded-lg" :class="{ 'pointer-events-none': loginStore.isLoading, 'opacity-[0.5]': loginStore.isLoading }">{{ loginStore.isLoading ? 'Login...' : 'Login' }}</button>
        </form>
    </div>
</template>

<script setup>
import { EnvelopeIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { useLoginStore } from '../stores/loginStore';
import { useCustomStore } from '../stores/customStore';

const loginStore = useLoginStore();
const customStore = useCustomStore();

</script>

<style>
body {background: rgba(28, 137, 185, 0.3) !important;}
</style>