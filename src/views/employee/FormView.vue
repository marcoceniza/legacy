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
                            <iframe id="myIframe" class="w-full" src="https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/DocumentControlandTraining.php" loading="lazy"></iframe>
                        </div>
                        <p v-show="showArrow" @click="scrollToTop" class="cursor-pointer fixed bottom-[30px] right-[30px] w-[45px] h-[45px] flex justify-center items-center rounded-[30px] bg-[#0a4a7d]"><ArrowUpIcon class="h-5 w-5 text-white font-bold mx-1" /></p>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '../../components/Navbar.vue';
import SidebarUser from '../../components/SidebarUser.vue';
import { ChevronRightIcon, ArrowUpIcon } from '@heroicons/vue/24/solid';
import { useProfileStore } from '../../stores/profileStore';
import { useFormStore } from '../../stores/formStore';

const sidebar = ref(false);
const profileStore = useProfileStore();
const formStore = useFormStore();
const myIframe = ref(null);
const showArrow = ref(false);

const showSidebarHandler = () => {
    sidebar.value = !sidebar.value;
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Use smooth scrolling if available
    });
}

const handleScroll = () => {
    showArrow.value = window.scrollY > 200;
};

onMounted(() => {
    profileStore.fetchProfileHandler();
    window.addEventListener('scroll', handleScroll);

    // Parent document
    window.addEventListener('message', function(event) {
        // Check the origin of the message to ensure it's from the same domain
        if (event.origin === 'https://www.legacyhealthus.com') {
            // Check the data sent from the iframe
            if (event.data === 'submitButtonClicked') scrollToTop();
        }
    });

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

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped>
#main-content::before{content: '';   width: 1px;   height: 100%;   background: #d9d9d9;   position: absolute;   top: 0;}
</style>