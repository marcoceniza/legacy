<template>
    <div id="view_wrap" class="view_wrap bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%] fixed top-0 left-0 z-[999] overflow-y-scroll">
        <div id="container" class="container translate-y-[-35%] absolute left-0 right-0 top-[35%] custom-bg bg-[#eee] py-[25px] mt-[95px] rounded-[6px]">
            <p class="absolute w-[25px] h-[25px] rounded-[30px] flex justify-center right-[-11px] top-[-13px] bg-[#888787]"><a @click="$emit('closeActivity')" class="text-white relative top-[6px] block text-[20px] w-full mx-auto text-center no-underline mt-[-11px] cursor-pointer hover:opacity-[0.5]">&times;</a></p>
            <DataTable :data="props.data" :columns="columns" class="table table-striped text-center" style="margin-top: 20px !important;">
                <thead class="table-dark">
                    <tr>
                        <th class="text-center">Form Name</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Submitted Time</th>
                        <th class="text-center">Submitted Date</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import { dateFormatV2 } from '../functions';

DataTable.use(DataTablesCore);

const props = defineProps({
    data: Array,
});

const columns = [
    { data: 'form_text' },
    { data: 'status',
        render: (data) => {
            return data == 1 ? 'Done' : '-';
        }
    },
    { data: 'submitted_date' ,
        render: (data) => {
            return data == null ? '-' : dateFormatV2('%h:%I:%S %a', new Date(data).getTime());
        }
    },
    { data: 'submitted_date' ,
        render: (data) => {
            return data == null ? '-' : dateFormatV2('%lm %d, %y', new Date(data).getTime());
        }
    }
];

</script>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
#main-content::before{content: ''; width: 1px; height: 100%; background: #d9d9d9; position: absolute; top: 0;}
</style>