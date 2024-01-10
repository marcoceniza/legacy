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
                                      <a href="#" class="text-gray-700">User</a>
                                      <ChevronRightIcon class="h-4 w-4 text-gray-500 font-bold mx-1" />
                                  </li>
                                  <li class="flex items-center">
                                      <a href="#" class="text-gray-600">Dashboard</a>
                                  </li>
                              </ol>
                          </nav>
                          <!-- breadcrumb end -->
                          <div class="flex justify-between items-center mb-6">
                              <p class="text-2xl font-semibold mb-2 lg:mb-0">Hello, User!</p>
                          </div>
                      </div>
                      <DataTable :data="data" :columns="columns" class="table table-striped text-center" style="margin-top: 20px !important;">
                          <thead class="table-dark">
                              <tr>
                                  <th class="text-center">Form Name</th>
                                  <th class="text-center">Action</th>
                              </tr>
                          </thead>
                      </DataTable>
                  </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../../components/Navbar.vue';
import SidebarUser from '../../components/SidebarUser.vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

const sidebar = ref(false);

const data = [
{name: 'Form 1'},
{name: 'Form 2'},
{name: 'Form 3'},
];

const columns = [
  { data: 'name' },
  { data: 'id',
      render: (data) => {
          return `
              <div style="display: flex; justify-content: center; gap: 5px;">
                  <button class="btn btn-primary btn-sm" data-action="view" data-row="${data}">Take Form</button>
              </div>
          `
      }
  }
];

const showSidebarHandler = () => {
sidebar.value = !sidebar.value;
}

onMounted(() => {
  // // addan og listener kay dili mo gana ang @click sa button
  // document.addEventListener('click', function (event) {
  // const action = event.target.dataset.action; // for data-action
  // const row = event.target.dataset.row; // for data-row (getting specific/unique id)

  //     if (action === 'view') {
  //         datas.value.forEach(res => {
  //             if(res.attempt_id === row) viewMoreData.value = res;
  //         });
  //     } else if (action === 'edit') {
  //         console.log('edit');
  //     } else if (action === 'delete') {
  //         console.log('delete');
  //     }
  // });
});

</script>

<style scoped>
#main-content::before{content: '';   width: 1px;   height: 100%;   background: #d9d9d9;   position: absolute;   top: 0;}
</style>