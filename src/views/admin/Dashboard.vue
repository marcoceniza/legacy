<template>
    <div class="leading-normal tracking-normal" id="main-body">
        <div class="flex flex-wrap">
        <SidebarAdmin :class="{ 'max-[1200px]:hidden': !sidebar }" />
            <div class="w-full bg-gray-100 pl-64 max-[1200px]:pl-0 min-h-screen relative" id="main-content">
                <Navbar @show-sidebar="showSidebarHandler"/>
                <div class="p-6 bg-gray-100 mb-20">
                    <div id="home">
                        <!-- breadcrumb -->
                        <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
                            <ol class="list-none p-0 inline-flex">
                                <li class="flex items-center text-blue-500">
                                    <a href="#" class="text-gray-700">Admin</a>
                                    <ChevronRightIcon class="h-4 w-4 text-gray-500 font-bold mx-1" />
                                </li>
                                <li class="flex items-center">
                                    <a href="#" class="text-gray-600">Dashboard</a>
                                </li>
                            </ol>
                        </nav>
                        <!-- breadcrumb end -->
                        <div class="flex justify-between items-center mb-6 max-[500px]:flex-col text-center">
                            <p class="text-2xl font-semibold mb-2 lg:mb-0">Hello, {{ profileStore.profileData.employee_firstname }}!</p>
                            <div>
                                <button @click="employeeStore.showAddModal = true" class="relative flex btn btn-primary w-[117px]"><UserPlusIcon class="h-5 w-5 text-white absolute top-[9px]" /> <span class="block text-right">Employee</span></button>
                                <button @click="employeeStore.showSendMessageModal = true" class="ml-2 relative flex btn btn-success w-[111px]"><ChatBubbleLeftIcon class="h-5 w-5 text-white absolute top-[9px]" /> <span class="block text-right">Message</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="w-full max-[1200px]:overflow-scroll">
                        <DataTable :data="employeeStore.employeeData" :columns="columns" class="table table-striped text-center" style="margin-top: 20px !important;">
                            <thead class="table-dark">
                                <tr>
                                    <th class="text-center">Employee ID</th>
                                    <th class="text-center">Employee Email</th>
                                    <th class="text-center">Employee Firstname</th>
                                    <th class="text-center">Employee Lastname</th>
                                    <th class="text-center">Employee Address</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>

                <!-- send message -->
                <SendMessage v-show="employeeStore.showSendMessageModal" />

                <!-- add user -->
                <AddEmployee v-show="employeeStore.showAddModal" />

                <!-- update user -->
                <UpdateEmployee v-show="employeeStore.showUpdateModal" />

                <!-- delete user -->
                <div v-show="employeeStore.showDeleteModal" class="view_wrap bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%] fixed top-0 left-0 z-[999]">
                    <div class="container translate-y-[-35%] absolute left-0 right-0 top-[35%] custom-bg">
                        <form class="max-w-[500px] mx-auto rounded-[12px] py-[40px] p-[25px] bg-[#047eb4]">
                            <p class="text-center text-[20px] font-bold d-block text-[#fff]">Are you sure you want to delete?</p>
                            <div class="flex justify-center gap-2">
                                <button :class="{ 'opacity-[0.5]': employeeStore.isLoading, 'pointer-events-none': employeeStore.isLoading }" @click.prevent="employeeStore.deleteEmployeeHandler(loginID, employeeID)" class="d-block p-2 bg-[#d82626] hover:bg-[#b33f3f] text-center text-[#fff] mt-4 rounded-lg px-4">{{ employeeStore.isLoading ? 'Deleting...' : 'Delete' }}</button>
                                <button @click.prevent="employeeStore.showDeleteModal = false" class="d-block p-2 bg-[#0a4a7d] hover:bg-[#1d67a2] text-center text-[#fff] mt-4 rounded-lg px-4">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { UserPlusIcon, ChatBubbleLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { ref, onMounted } from 'vue';
import Navbar from '../../components/Navbar.vue';
import SidebarAdmin from '../../components/SidebarAdmin.vue';
import SendMessage from '../../components/SendMessage.vue';
import AddEmployee from '../../components/AddEmployee.vue';
import UpdateEmployee from '../../components/UpdateEmployee.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import { useEmployeeStore } from '../../stores/employeeStore';
import { useProfileStore } from '../../stores/profileStore';

DataTable.use(DataTablesCore);

const employeeStore = useEmployeeStore();
const profileStore = useProfileStore();
const sidebar = ref(false);
const loginID = ref();
const employeeID = ref();

const columns = [
    { data: 'employee_id' },
    { data: 'email' },
    { data: 'employee_firstname' },
    { data: 'employee_lastname' },
    { data: 'employee_address' },
    // { data: 'employee_status' ,
    //     render: (data) => {
    //         return data == 1 ? 'Active' : 'Not Active'
    //     }
    // },
    { data: 'login_id',
        render: (data) => {
            return `
                <div style="display: flex; justify-content: center; gap: 5px;">
                    <button class="btn btn-warning btn-sm" data-action="edit" data-row="${data}">Edit</button>
                    <button class="btn btn-danger btn-sm" data-action="delete" data-row="${data}">Delete</button>
                </div>
            `
        }
    }
];

const showSidebarHandler = () => {
  sidebar.value = !sidebar.value;
}

onMounted(() => {
    employeeStore.fetchEmployeeHandler();
    profileStore.fetchProfileHandler();

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