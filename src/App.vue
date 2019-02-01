<template>
    <v-app>

        <v-content>
            <Poto></Poto>
        </v-content>
    </v-app>
</template>

<script>
    import Poto from './components/List'
    //  import Clock from './components/Clock'


    export default {
        name: 'App',
        components: {
            Poto
        },
        data() {
            return {
                //
            }
        }
    }
</script>
