<template>
    <div class="sticky top-0 z-40">
        <div class="w-full h-20 px-2 border-b flex items-center justify-between bg-[#0a4a7d]">
            <!-- left navbar -->
            <div class="flex">
                <figure class="hidden text-left pl-0 max-[1200px]:block py-4 pr-4 my-3 w-[200px]"><img class="p-3" src="../assets/images/main-logo.png" alt="main logo"></figure>
                <!-- mobile hamburger -->
                <div class="items-center mr-4 hidden max-[1200px]:flex">
                    <button @click="$emit('showSidebar')">
                        <Bars3Icon class="h-7 w-7 text-white" />
                    </button>
                </div>
            </div>
            <!-- right navbar -->
            <div class="flex items-center relative">
                <img @click="toggleMenuHandler" v-if="employeeStore.updatedPicture" class="w-12 h-12 rounded-full shadow-lg cursor-pointer" :src="profileStore.apiUrl + `uploads/${employeeStore.updatedPicture}`" alt="user">
                <img @click="toggleMenuHandler" v-else class="w-12 h-12 rounded-full shadow-lg cursor-pointer" :src="profileStore.apiUrl + 'uploads/default_photo.jpg'" alt="user">
            </div>
        </div>
        <!-- dropdown menu -->
        <div v-show="toggleMenu" class="absolute bg-[#666] border border-t-0 text-center shadow-xl text-white rounded-b-lg w-44 top-20 right-0 mr-6">
            <a v-if="employeeStore.user.user_type == 1" @click="$router.push('/admin/profile')" class="relative cursor-pointer block px-4 py-2 hover:bg-[#888] no-underline text-white border-b border-[#fff]"><UserIcon class="h-5 w-5 text-white absolute top-3" /> Profile</a>
            <a v-else @click="$router.push('/employee/profile')" class="relative cursor-pointer block px-4 py-2 hover:bg-[#888] no-underline text-white border-b border-[#fff]"><UserIcon class="h-5 w-5 text-white absolute top-3" /> Profile</a>
            <a @click="logOut" class="relative cursor-pointer block px-4 py-2 hover:bg-[#888] no-underline text-white border-b border-[#ddd]"><ArrowLeftStartOnRectangleIcon class="h-5 w-5 text-white absolute top-3" /> Logout</a>
        </div>
        <!-- dropdown menu end -->
    </div>
</template>

<script setup>
import { UserIcon, ArrowLeftStartOnRectangleIcon, Bars3Icon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import { useProfileStore } from '../stores/profileStore';
import { useEmployeeStore } from '../stores/employeeStore';
import { useRouter } from 'vue-router';
import { vueToast } from '../functions'

const toggleMenu = ref(false);
const profileStore = useProfileStore();
const employeeStore = useEmployeeStore();
const router = useRouter();

const toggleMenuHandler = () => {
    toggleMenu.value = !toggleMenu.value;
}

const logOut = () => {
    localStorage.clear();
    router.push('/');
    vueToast('Logout Successfully.', 'success')
    setTimeout(() => { window.location.reload(); }, 1000);
}

onMounted(() => {
    setTimeout(() => {
        employeeStore.fetchEmployeeHandler();
    }, 500);
});

</script>