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
                                    <a href="#" class="text-gray-600">Activity Log</a>
                                </li>
                            </ol>
                        </nav>
                        <!-- breadcrumb end -->
                        <div class="flex justify-between items-center mb-6 max-[500px]:flex-col text-center">
                            <p class="text-2xl font-semibold mb-2 lg:mb-0">Activity Log</p>
                        </div>
                    </div>
                    <div class="w-full max-[1200px]:overflow-scroll">
                        <DataTable :data="activityStore.formList" :columns="columns" class="table table-striped text-center" style="margin-top: 20px !important;">
                            <thead class="table-dark">
                                <tr>
                                    <th class="text-center">Activity ID</th>
                                    <th class="text-center">Form Name</th>
                                    <th class="text-center">Submitted Time</th>
                                    <th class="text-center">Submitted Date</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import { ref, onMounted } from 'vue';
import Navbar from '../../components/Navbar.vue';
import SidebarUser from '../../components/SidebarUser.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import { dateFormatV2 } from '../../functions';
import { useEmployeeStore } from '../../stores/employeeStore';
import { useActivityStore } from '../../stores/activityStore';

DataTable.use(DataTablesCore);

const employeeStore = useEmployeeStore();
const activityStore = useActivityStore();
const sidebar = ref(false);
const loginID = ref();
const employeeID = ref();

const columns = [
    { data: 'activity_id' },
    { data: 'form_name' },
    { data: 'submitted_date' ,
        render: (data) => {
            return dateFormatV2('%h:%I:%S %a', new Date(data).getTime());
        }
    },
    { data: 'submitted_date' ,
        render: (data) => {
            return dateFormatV2('%lm %d, %y', new Date(data).getTime());
        }
    }
];

const showSidebarHandler = () => {
  sidebar.value = !sidebar.value;
}

onMounted(() => {

    // addan og listener kay dili mo gana ang @click sa button
    document.addEventListener('click', function (event) {
    const action = event.target.dataset.action; // for data-action
    const row = event.target.dataset.row; // for data-row (getting specific/unique id)

        if (action === 'edit') {
            employeeStore.employeeData.forEach(res => {
                if(res.login_id === row) {
                    employeeStore.toUpdate.Firstname = res.employee_firstname;
                    employeeStore.toUpdate.Lastname = res.employee_lastname;
                    employeeStore.toUpdate.Address = res.employee_address;
                    employeeStore.toUpdate.Email = res.email;
                    employeeStore.toUpdate.LoginID = res.login_id;
                    employeeStore.toUpdate.EmployeeID = res.employee_id;
                }
            });

            employeeStore.showUpdateModal = true;
        } else if (action === 'delete') {
            employeeStore.employeeData.forEach(res => {
                if(res.login_id === row) {
                    loginID.value = res.login_id;
                    employeeID.value = res.employee_id;
                }
            });

            employeeStore.showDeleteModal = true;
        }
    });
});

</script>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
#main-content::before{content: ''; width: 1px; height: 100%; background: #d9d9d9; position: absolute; top: 0;}
</style>