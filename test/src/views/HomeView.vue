<template>
    <main>
        <the-welcome/>
    </main>
</template>

<script setup lang="ts">
import TheWelcome from '_c/TheWelcome.vue';
import {useUserInfoStore} from '@/stores/modules/userInfo';
const store = useUserInfoStore();
store.changeNum();
console.log(store.name);
console.log(store.num);
console.log(import.meta.env.VITE_APP_URL);
</script>
