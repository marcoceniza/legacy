<template>
    <div class="view_wrap bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%] fixed top-0 left-0 z-[999]">
        <div class="container translate-y-[-35%] absolute left-0 right-0 top-[35%] custom-bg">
            <form class="max-w-[500px] mx-auto rounded-[12px] p-[25px] bg-[#047eb4] relative">
                <p class="text-center text-[20px] font-bold d-block text-[#fff]">Update Password <span @click="profileStore.showUpdatePassModal = false" class="absolute right-3 text-xl cursor-pointer top-1">&times;</span></p>
                <label for="password-icon" class="block my-2 text-sm font-medium text-[#fff]">New Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><KeyIcon class="h-6 w-6 text-gray-500" /></div>
                    <input :type="customStore.showNewPass ? 'text' : 'password'" v-model="profileStore.password.newPassword" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="New Password">
                    <EyeIcon @click="customStore.toggleNewPass" v-show="!customStore.showNewPass && profileStore.password.newPassword.length > 0" class="h-5 w-5 text-gray-500 cursor-pointer absolute right-1 top-[13px]" />
                    <EyeSlashIcon @click="customStore.toggleNewPass" v-show="customStore.showNewPass && profileStore.password.newPassword.length > 0" class="h-5 w-5 text-gray-500 cursor-pointer absolute right-1 top-[13px]" />
                </div>
                <label for="password-icon" class="block my-2 text-sm font-medium text-[#fff]">Confirm Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><KeyIcon class="h-6 w-6 text-gray-500" /></div>
                    <input :type="customStore.showConfirmPass ? 'text' : 'password'" v-model="profileStore.password.confirmPassword" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Confirm Password">
                    <EyeIcon @click="customStore.toggleConfirmPass" v-show="!customStore.showConfirmPass && profileStore.password.confirmPassword.length > 0" class="h-5 w-5 text-gray-500 cursor-pointer absolute right-1 top-[13px]" />
                    <EyeSlashIcon @click="customStore.toggleConfirmPass" v-show="customStore.showConfirmPass && profileStore.password.confirmPassword.length > 0" class="h-5 w-5 text-gray-500 cursor-pointer absolute right-1 top-[13px]" />
                </div>
                <button @click.prevent="profileStore.updatePasswordHandler" class="d-block p-2 bg-[#0a4a7d] hover:bg-[#1d67a2] text-center text-[#fff] mt-4 rounded-lg px-4" :class="{ 'opacity-[0.5]': profileStore.isLoading, 'pointer-events-none': profileStore.isLoading }">{{ profileStore.isLoading ? 'Updating...' : 'Update' }}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { useProfileStore } from '../stores/profileStore';
import { useCustomStore } from '../stores/customStore';

const profileStore = useProfileStore();
const customStore = useCustomStore();

</script>