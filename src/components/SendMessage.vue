<template>
    <div class="view_wrap bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%] fixed top-0 left-0 z-[999]">
        <div class="container translate-y-[-35%] absolute left-0 right-0 top-[35%] custom-bg">
            <form class="max-w-[500px] mx-auto rounded-[12px] p-[25px] bg-[#047eb4] relative">
                <p class="text-center text-[20px] font-bold d-block text-[#fff]">Send Message <span @click="employeeStore.showSendMessageModal = false" class="absolute right-3 text-xl cursor-pointer top-1">&times;</span></p>
                <label for="fullname-icon" class="block my-2 text-sm font-medium text-[#fff]">Email <small>*</small></label>
                <p class="absolute right-6 top-[72px] text-white text-sm italic"><input @click="messageStore.bulkSend" type="checkbox"> Send to All</p>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><EnvelopeIcon class="h-6 w-6 text-gray-500" /></div>
                    <input type="text" v-model="messageStore.message.Email" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Email" :disabled="messageStore.isBulkSend">
                </div>
                <label for="fullname-icon" class="block my-2 text-sm font-medium text-[#fff]">Subject <small>*</small></label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"><DocumentIcon class="h-6 w-6 text-gray-500" /></div>
                    <input type="text" v-model="messageStore.message.Subject" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Subject">
                </div>
                <label for="address-icon" class="block my-2 text-sm font-medium text-[#fff]">Message <small>*</small></label>
                <div class="relative">
                    <div class="absolute top-3 flex items-center ps-3.5 pointer-events-none"><DocumentTextIcon class="h-6 w-6 text-gray-500" /></div>
                    <textarea v-model="messageStore.message.Message" class="text-[#1d1d1d] pl-11 text-sm rounded-lg w-full p-[12px]" placeholder="Message" cols="30" rows="10"></textarea>
                </div>
                <button @click.prevent="messageStore.sendMessageHandler" class="d-block p-2 bg-[#0a4a7d] hover:bg-[#1d67a2] text-center text-[#fff] mt-4 rounded-lg px-4" :class="{ 'opacity-[0.5]': messageStore.isSending, 'pointer-events-none': messageStore.isSending }">{{ messageStore.isSending ? 'Sending...' : 'Send' }}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { EnvelopeIcon, DocumentIcon, DocumentTextIcon } from '@heroicons/vue/24/solid';
import { useMessageStore } from '../stores/messageStore';
import { useEmployeeStore } from '../stores/employeeStore';

const employeeStore = useEmployeeStore();
const messageStore = useMessageStore();

</script>