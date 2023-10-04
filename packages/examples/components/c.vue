<template>
    <div>
        {{ title }}
    </div>
</template>
<script setup lang=ts>
import { inject } from 'vue';

const title = inject('title');

</script>