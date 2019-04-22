<template>
    <div>
        <br>
        <p>{{ doubleCounter }}</p>
        <button @click="increment()">Increment</button>
        <button @click="decrement()">Decrment</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default Vue.extend({
    name: "HelloWorld",
    
    methods: {
        ...mapMutations([
            'increment',
            'decrement'
        ])
    },

    computed: {
        ...mapGetters([
            'doubleCounter'
        ])
    }
});
</script>
