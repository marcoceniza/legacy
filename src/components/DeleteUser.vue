<template>
    <div class="view_wrap bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%] fixed top-0 left-0 z-[999]">
        <div class="container translate-y-[-35%] absolute left-0 right-0 top-[35%] custom-bg">
            <form class="max-w-[600px] mx-auto rounded-[12px] p-[25px] bg-[#047eb4]">
                <p class="text-center text-[20px] font-bold d-block text-[#fff]">Are you sure you want to delete?</p>
                <div class="flex justify-center gap-2">
                    <button @click="deleteUser = false" class="d-block p-2 bg-[#d82626] hover:bg-[#b33f3f] text-center text-[#fff] mt-4 rounded-lg px-4">Delete</button>
                    <button @click="deleteUser = false" class="d-block p-2 bg-[#0a4a7d] hover:bg-[#1d67a2] text-center text-[#fff] mt-4 rounded-lg px-4">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/24/solid';

</script>