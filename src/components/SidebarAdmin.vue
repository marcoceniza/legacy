<template>
    <div class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen bg-gray-100 z-30 max-[1200px]:shadow-[0px_0px_12px_#b9b9b9;]">
        <div class="w-full h-20 border-b flex justify-center px-4 items-center mb-8 bg-[#0a4a7d]">
            <figure class="p-[30px] mt-3"><img src="../assets/images/main-logo.png" alt="main logo"></figure>
        </div>
        <div class="mb-4 px-4">
            <p class="pl-4 text-sm font-semibold mb-2">MAIN</p>
            <div @click="$router.push('/admin/dashboard')" :class="{ 'bg-gray-200': customStore.isCurrentRoute('/admin/dashboard') }" class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
                <UserGroupIcon class="h-5 w-5 text-[#0a4a7d] font-bold mx-1" />
                <span class="text-gray-700">Employee List</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { UserGroupIcon } from '@heroicons/vue/24/outline';
import { useCustomStore } from '../stores/customStore';

const customStore = useCustomStore();
</script>