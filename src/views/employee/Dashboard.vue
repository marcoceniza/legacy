<template>
  <div class="leading-normal tracking-normal" id="main-body">
      <div class="flex flex-wrap">
          <SidebarUser :class="{ 'max-[1200px]:hidden': !sidebar }" />
          <div class="w-full bg-gray-100 pl-64 max-[1200px]:pl-0 min-h-screen relative" id="main-content">
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
                          </div>
                      </div>
                      <div>
                        <ul class="flex justify-center flex-wrap p-0">
                            <li v-for="af in activityStore.formText" :key="af" class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm(af); $router.push('/employee/form')" :class="{ 'bg-[green]': af == activityStore.activityData ? true : false }" class="block w-full hover:no-underline cursor-pointer bg-[#ea1c1c] text-white">{{ af }}</a></li>
                        </ul>
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
import { useActivityStore } from '../../stores/activityStore';

const sidebar = ref(false);
const profileStore = useProfileStore();
const formStore = useFormStore();
const activityStore = useActivityStore();

const showSidebarHandler = () => {
    sidebar.value = !sidebar.value;
}

onMounted(() => {
  profileStore.fetchProfileHandler();
});

</script>

<style scoped>
#main-content::before{content: '';   width: 1px;   height: 100%;   background: #d9d9d9;   position: absolute;   top: 0;}
</style>