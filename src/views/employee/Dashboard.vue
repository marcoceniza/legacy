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
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Document'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Document Control and Training</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Annual'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Annual Review Documentation</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Training'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Training Form</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Facility'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Facility Licensing</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('FDA'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">FDA Reporting Job Aid</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Personnel'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Personnel Management</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Security'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Security</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Housekeeping'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Housekeeping</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Trade'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Trade Partner Authentication</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Transaction'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Transaction Data</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Receiving'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Receiving and Putaway Form</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Suspect'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Suspect Product Form</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Illegitamate'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Illegitamate Product Process Form</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Environment'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Environment Controls Form</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Inventory'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Inventory Control Form</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Order'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Order Management and Shipping</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Recalls'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Recalls and Market Withdrawals</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Quarantine'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Quarantine Process</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Returns'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Returns and Destructions</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Records'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Records</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Crisis'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Crisis Operations</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Investigations'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Investigations and Reporting</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Quality'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Quality Management</a></li>
                            <li class="w-[31%] max-[1200px]:w-[46%] max-[700px]:w-[100%] text-center border-1 border-gray-300 h-[60px] leading-[60px] mb-2 mx-2"><a @click="formStore.showForm('Incident'); $router.push('/employee/form')" class="block w-full hover:bg-[#b9b9b9] cursor-pointer">Incident Report</a></li>
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

const sidebar = ref(false);
const profileStore = useProfileStore();
const formStore = useFormStore();

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