<template>
    <div class="content">
        <p>This is {{id}}</p>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";

import { Budget } from "./../classes/Budget";
import { Expense } from "./../classes/Expense";
import { API } from "./../services/API";
import { Route } from 'vue-router';


export default Vue.extend({
    name: "app",

    data() {
        return {
            id: this.$route.params.id
        };
    },

    watch: {
        '$route'(to: Route, from: Route): void {
            this.id = to.params.id;
        } 
    },

    methods: {
        
    }
});
</script>
