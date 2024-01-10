<template>
    <div class="sticky top-0 z-40">
        <div class="w-full h-20 px-6 border-b flex items-center justify-between bg-[#0a4a7d]">
            <!-- left navbar -->
            <div class="flex">
                <!-- mobile hamburger -->
                <div class="lg:hidden flex items-center mr-4">
                    <button @click="$emit('showSidebar')" class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger">
                        <svg class="h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
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
        <div v-show="toggleMenu" class="absolute bg-gray-100 border border-t-0 text-center shadow-xl text-gray-700 rounded-b-lg w-44 top-20 right-0 mr-6">
            <a @click="$router.push('/admin/profile')" class="relative cursor-pointer block px-4 py-2 hover:bg-gray-200 no-underline text-[#555] border-b border-[#ddd]"><UserIcon class="h-5 w-5 text-gray-500 absolute top-3" /> Profile</a>
            <a href="#" class="relative block px-4 py-2 hover:bg-gray-200 no-underline text-[#555] border-b border-[#ddd]"><ArrowLeftStartOnRectangleIcon class="h-5 w-5 text-gray-500 absolute top-3" /> Logout</a>
        </div>
        <!-- dropdown menu end -->
    </div>
</template>

<script setup>
import { UserIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import { useProfileStore } from '../stores/profileStore';
import { useEmployeeStore } from '../stores/employeeStore';

const toggleMenu = ref(false);
const profileStore = useProfileStore();
const employeeStore = useEmployeeStore();

const toggleMenuHandler = () => {
    toggleMenu.value = !toggleMenu.value;
}

onMounted(() => {
    setTimeout(() => {
        employeeStore.fetchEmployeeHandler();
    }, 500);
});

</script>