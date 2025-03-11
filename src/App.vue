<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
    components: {
        AppHeader,
    },
};
</script>

<template>
    <div id="app">
        <!-- Thanh điều hướng -->
        <AppHeader />

        <!-- Nội dung chính -->
        <div class="container mt-3">
            <router-view />
        </div>
    </div>
</template>

<style>
.page {
    max-width: 400px;
    margin: auto;
}
</style>
