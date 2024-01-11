<template>
    <div class="leading-normal tracking-normal" id="main-body">
        <div class="flex flex-wrap">
            <SidebarUser />
            <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen relative" id="main-content">
                <Navbar @show-sidebar="showSidebarHandler"/>
                <div class="p-6 bg-gray-100">
                    <div id="profile">
                        <!-- breadcrumb -->
                        <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
                            <ol class="list-none p-0 inline-flex">
                                <li class="flex items-center text-blue-500">
                                    <a href="#" class="text-gray-700">Admin</a>
                                    <ChevronRightIcon class="h-4 w-4 text-gray-500 font-bold mx-1" />
                                </li>
                                <li class="flex items-center">
                                    <a href="#" class="text-gray-600">Profile</a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <!-- breadcrumb end -->
                    <div class="flex justify-between items-center">
                        <p class="text-2xl font-semibold mb-2">Employee, Profile!</p>
                    </div>
                </div>

                <div class="p-6 flex flex-wrap justify-between">
                    <section class="w-[60%] shadow-2xl p-6 max-[1300px]:w-[100%]">
                        <div class="flex justify-between">
                            <h4 class="mt-4">Personal Information</h4>
                            <button @click="profileStore.showUpdatePassModal = true" class="mt-4 ml-2 relative btn btn-success w-[117px] h-[40px]"><LockClosedIcon class="h-5 w-5 text-white absolute top-[9px]" /> <span class="block text-right">Password</span></button>
                        </div>
                        <form class="mx-auto rounded-[12px] p-[25px] relative">
                            <div class="flex flex-wrap justify-between">
                                <div class="relative w-[48%]">
                                    <label for="first-name-icon" class="block my-2 text-sm font-medium">Firstname</label>
                                    <div class="absolute mt-[11px] ml-[10px]"><UserIcon class="h-6 w-6 text-gray-500" /></div>
                                    <input type="text" v-model="profileStore.toUpdate.Firstname" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Firstname">
                                </div>
                                <div class="relative w-[48%]">
                                    <label for="last-name-icon" class="block my-2 text-sm font-medium">Lastname</label>
                                    <div class="absolute mt-[11px] ml-[10px]"><UserIcon class="h-6 w-6 text-gray-500" /></div>
                                    <input type="text" v-model="profileStore.toUpdate.Lastname" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Lastname">
                                </div>
                            </div>
                            <div class="flex flex-wrap justify-between mt-2">
                                <div class="relative w-[48%]">
                                    <label for="address-icon" class="block my-2 text-sm font-medium">Address</label>
                                    <div class="absolute mt-[11px] ml-[10px]"><MapIcon class="h-6 w-6 text-gray-500" /></div>
                                    <input type="text" v-model="profileStore.toUpdate.Address" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Address">
                                </div>
                                <div class="relative w-[48%]">
                                    <label for="email-address-icon" class="block my-2 text-sm font-medium">Email</label>
                                    <div class="absolute mt-[11px] ml-[10px]"><EnvelopeIcon class="h-6 w-6 text-gray-500" /></div>
                                    <input type="text" v-model="profileStore.toUpdate.Email" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Email">
                                </div>
                            </div>
                            <button @click.prevent="profileStore.updateProfileHandler" class="d-block p-2 bg-[#198754] hover:bg-[#177549] text-center text-[#fff] mt-5 rounded-lg px-4">Update</button>
                        </form>
                    </section>
                    <section class="w-[39%] max-[1300px]:w-[100%]">
                        <div class="mb-2 shadow-2xl p-12 text-center">
                            <div v-if="profileStore.isLoading">
                                <div class="animate-pulse text-center">
                                    <div class="flex mx-auto items-center justify-center w-[200px] h-[200px] bg-gray-300 rounded-[50%] dark:bg-gray-700">
                                        <ClipboardDocumentIcon class="h-10 w-10 text-gray-500" />
                                    </div>
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mt-4 mx-auto"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5 mx-auto"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mx-auto"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5 mx-auto"></div>
                                </div>
                            </div>
                            <div v-else>
                                <img v-if="newPicture" class="object-cover w-[200px] h-[200px] max-w-[100%] block rounded-[50%] mx-auto" :src="profileStore.apiUrl + `uploads/${newPicture}`" alt="user">
                                <img v-else class="object-cover w-[200px] max-w-[100%] h-[200px] block rounded-[50%] mx-auto" :src="profileStore.apiUrl + 'uploads/default_photo.jpg'" alt="user">
                                <h2 class="mt-3">{{ profileStore.profileData.employee_firstname }} {{ profileStore.profileData.employee_lastname }}</h2>
                                <p>{{ profileStore.profileData.email }}</p>
                                <p>{{ profileStore.profileData.employee_address }}</p>
                            </div>
                        </div>
                        <div class="shadow-2xl p-12">
                            <h4 class="mb-[20px] text-[18px]"><PaperClipIcon class="absolute h-5 w-5 text-gray-500" /> <p class="pl-6">Select profile photo</p></h4>
                            <input type="file" @change="handleFileChange">
                        </div>
                    </section>
                </div>

                <!-- update password -->
                <UpdatePassword v-show="profileStore.showUpdatePassModal" />
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { EnvelopeIcon, UserIcon, MapIcon, ClipboardDocumentIcon, PaperClipIcon, LockClosedIcon } from '@heroicons/vue/24/solid';
import { ref, onMounted, watch, computed } from 'vue';
import Navbar from '../../components/Navbar.vue';
import SidebarUser from '../../components/SidebarUser.vue';
import UpdatePassword from '../../components/UpdatePassword.vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { useProfileStore } from '../../stores/profileStore';
import { useEmployeeStore } from '../../stores/employeeStore';

const sidebar = ref(false);
const profileStore = useProfileStore();
const employeeStore = useEmployeeStore();

const showSidebarHandler = () => {
  sidebar.value = !sidebar.value;
}

const handleFileChange = (event) => {
    profileStore.file = event.target.files[0]; 
}

watch(() => profileStore.file, async (newVal) => {
    if (newVal) {
        await profileStore.updateProfilePicture();
        profileStore.file = null;
    }
});

const newPicture = computed(() => { return employeeStore.updatedPicture })

onMounted(() => {
    profileStore.fetchProfileHandler();
});

</script>

<style>
#main-content::before{content: ''; width: 1px; height: 100%; background: #d9d9d9; position: absolute; top: 0;}
</style>