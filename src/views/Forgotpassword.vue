<template>
    <div class="container translate-y-[-35%] absolute left-0 right-0 top-[35%] custom-bg">
        <form class="max-w-[450px] mx-auto rounded-[12px] py-[35px] px-[20px]">
            <figure><img class="mx-auto d-block w-[250px] mb-3" src="../assets/images/main-logo.png" alt="main logo"></figure>
            <p class="text-center text-[20px] font-bold d-block text-[#fff]">Password Reset</p>
            <p class="d-block text-center mb-[30px] text-[#fff]">Enter your email to receive instruction on how to reset your password</p>
            <label for="email-address-icon" class="block my-2 text-sm font-medium text-[#fff]">Your Email</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><EnvelopeIcon class="h-6 w-6 text-gray-500" /></div>
                <input type="text" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Email">
            </div>
            <button class="d-block mt-4 p-2 bg-[#0a4a7d] hover:bg-[#1d67a2] text-center w-100 text-[#fff] rounded-lg">Reset Password</button>
            <button @click="$router.push('/')" class="d-block p-2 border border-[#fff] hover:bg-[#1d67a2] text-center w-100 text-[#fff] mt-2 rounded-lg">Back</button>
        </form>
    </div>
</template>

<script setup>
import { EnvelopeIcon } from '@heroicons/vue/24/solid';

</script>

<style>
body {background: #047eb4 !important;}
</style>