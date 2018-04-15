<style scoped>
    @import "styles/common.css";
    @import "plugins/font_awesome/css/font-awesome.min.css";
    @import "plugins/ionicons/css/ionicons.min.css";
</style>
<template>
    <div id="app">
        <!--<transition name="bounce">-->
        <router-view></router-view>
        <!--</transition>-->
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {
        }
    }
</script>