<template>
    <div class="view_wrap bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%] fixed top-0 left-0 z-[999]">
        <div class="container translate-y-[-35%] absolute left-0 right-0 top-[35%] custom-bg">
            <form class="max-w-[500px] mx-auto rounded-[12px] p-[25px] bg-[#047eb4] relative">
                <p class="text-center text-[20px] font-bold d-block text-[#fff]">Add Employee <span @click="employeeStore.showAddModal = false" class="absolute right-3 text-xl cursor-pointer top-1">&times;</span></p>
                <label for="fullname-icon" class="block my-2 text-sm font-medium text-[#fff]">Firstname</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><UserIcon class="h-6 w-6 text-gray-500" /></div>
                    <input type="text" v-model="employeeStore.employeeFirstname" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Firstname">
                </div>
                <label for="fullname-icon" class="block my-2 text-sm font-medium text-[#fff]">Lastname</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><UserIcon class="h-6 w-6 text-gray-500" /></div>
                    <input type="text" v-model="employeeStore.employeeLastname" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Lastname">
                </div>
                <label for="address-icon" class="block my-2 text-sm font-medium text-[#fff]">Address</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><MapIcon class="h-6 w-6 text-gray-500" /></div>
                    <input type="text" v-model="employeeStore.employeeAddress" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Address">
                </div>
                <label for="email-address-icon" class="block my-2 text-sm font-medium text-[#fff]">Email</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><EnvelopeIcon class="h-6 w-6 text-gray-500" /></div>
                    <input type="text" v-model="employeeStore.employeeEmail" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Email">
                </div>
                <label for="password-icon" class="block my-2 text-sm font-medium text-[#fff]">Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><KeyIcon class="h-6 w-6 text-gray-500" /></div>
                    <input type="password" v-model="employeeStore.employeePassword" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Password">
                </div>
                <button @click.prevent="employeeStore.addEmployeeHandler" class="d-block p-2 bg-[#0a4a7d] hover:bg-[#1d67a2] text-center text-[#fff] mt-4 rounded-lg px-4" :class="{ 'opacity-[0.5]': employeeStore.isLoading, 'pointer-events-none': employeeStore.isLoading }">{{ employeeStore.isLoading ? 'Adding...' : 'Add' }}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { EnvelopeIcon, KeyIcon, UserIcon, MapIcon } from '@heroicons/vue/24/solid';
import { useEmployeeStore } from '../stores/employeeStore';

const employeeStore = useEmployeeStore();

</script>