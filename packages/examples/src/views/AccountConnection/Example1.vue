<template>
    <NpAccountConnection :account-name="accountName" :connected="connected" title="Example App" :action="{
        content: buttonText,
        onAction: handleAction,
    }">

        <template #details>
            {{ connected ? 'Account connected' : 'No account connected' }}
        </template>
        <template v-if="!connected" #termsOfService>
            <p>By clicking <strong>Connect </strong>, you agree to accept Sample App’s{{ ' ' }}
                <NpLink url="Example App"> terms and conditions </NpLink>. You’ll pay a
                commission rate of 15 % on sales made through Sample App.
            </p>
        </template>
    </NpAccountConnection>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { NpAccountConnection, NpLink } from "@ncpl/ncpl-polaris"


const connected = ref(false);
const accountName = computed(() => connected.value ? 'Jane Appleseed' : '');

const handleAction = () => {
    connected.value = !connected.value
};

const buttonText = computed(() => connected.value ? 'Disconnect' : 'Connect');
</script>