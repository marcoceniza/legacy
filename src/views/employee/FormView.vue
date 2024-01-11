<template>
    <div class="leading-normal tracking-normal" id="main-body">
        <div class="flex flex-wrap">
            <SidebarUser />
            <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen relative" id="main-content">
                <Navbar @show-sidebar="showSidebarHandler"/>
                    <div class="p-6 bg-gray-100 mb-20">
                        <div id="home">
                            <!-- breadcrumb -->
                            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
                                <ol class="list-none p-0 inline-flex">
                                    <li class="flex items-center text-blue-500">
                                        <a href="#" class="text-gray-700">Employee</a>
                                        <ChevronRightIcon class="h-4 w-4 text-gray-500 font-bold mx-1" />
                                    </li>
                                    <li class="flex items-center">
                                        <a href="#" class="text-gray-600">Dashboard</a>
                                    </li>
                                </ol>
                            </nav>
                            <!-- breadcrumb end -->
                            <div class="flex justify-between items-center mb-6">
                                <p class="text-2xl font-semibold mb-2 lg:mb-0">Hello, {{ profileStore.profileData.employee_firstname }}!</p>
                                <button @click="$router.push('/employee/dashboard')" class="mr-6 underline hover:no-underline text-gray-600">Back &raquo;</button>
                            </div>
                        </div>
                        <div class="text-center">
                            <iframe id="myIframe" class="w-full" :src="formStore.iframeSrc" loading="lazy"></iframe>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../../components/Navbar.vue';
import SidebarUser from '../../components/SidebarUser.vue';
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import { useProfileStore } from '../../stores/profileStore';
import { useFormStore } from '../../stores/formStore';

const sidebar = ref(false);
const profileStore = useProfileStore();
const formStore = useFormStore();
const myIframe = ref(null);

const showSidebarHandler = () => {
    sidebar.value = !sidebar.value;
}

onMounted(() => {
    profileStore.fetchProfileHandler();

    setTimeout(() => {
        // Ensure the iframe is rendered before attempting to access it
        myIframe.value = document.getElementById('myIframe');

        // Check if the iframe is available
        if (myIframe.value) {
            // Access the contentDocument of the iframe directly
            const iframeDocument = myIframe.value.contentDocument;

            // Access the body height of the iframe content
            const iframeHeight = iframeDocument.body.scrollHeight;

            // Set the height of the iframe
            myIframe.value.style.height = iframeHeight + 'px';
        } else {
            console.error('Iframe element is null or undefined.');
        }
    }, 3000)
});

</script>

<style scoped>
#main-content::before{content: '';   width: 1px;   height: 100%;   background: #d9d9d9;   position: absolute;   top: 0;}
</style>