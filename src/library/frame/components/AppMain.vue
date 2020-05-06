<template>
    <transition name="slide-fade" mode="out-in">
        <keep-alive>
            <router-view :key="key" />
        </keep-alive>
    </transition>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
//            cachedViews() {
//                return this.$store.state.tagsView.cachedViews //:include="cachedViews"
//            },
            key() {
                return this.$route.fullPath
            }
        }
    }
</script>

<style scoped="">
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all .4s ease;
    }
    .slide-fade-enter{
        transform: translateX(-10px);
        opacity: 0;
    }
    .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>