<template>
    <li class="el-dropdown-menu-item"
        :class="{
            'is-disabled': disabled,
            'el-dropdown-menu-item-divided': divided
        }"
        @click="handleClick"
    >
        <slot></slot>
    </li>
</template>
<script>
    import Emitter from '@/utils/emitter';

    export default {
        name: 'ElDropdownItem',

        mixins: [Emitter],

        props: {
            command: String,
            disabled: Boolean,
            divided: Boolean
        },

        methods: {
            handleClick(e) {
                this.dispatch('ElDropdown', 'menu-item-click', [this.command, this]);
            }
        }
    };
</script>
