<template>
    <dropdown
        ref="dropdown"
        class="dropdown-tree"
        trigger="click"
        :menuAlign="menuAlign"
        @click.native="handleClick">
        <i-input
            class="title"
            :class="{'title-active': isDropdownShow}"
            v-model="inputTitle"
            :size="size"
            :placeholder="placeholder"
            :readonly="true"
            :icon="iconClass">
        </i-input>
        <dropdown-menu
            ref="panel"
            class="brown-dropdown-panel"
            slot="dropdown"
            v-show="isDropdownShow">
            <iu-tree ref="tree"
                :inDropdown="true"
                :checkChildren="checkChildren"
                v-bind="$attrs"
                v-on="$listeners"
                @change="handleChange"
                @expandOrCollapse="handleExpandOrCollapse">
            </iu-tree>
        </dropdown-menu>
    </dropdown>
</template>

<script>
import emitter from '@/mixins/emitter';
import IUTree from '@/components/brown-tree';
import { Dropdown, DropdownMenu } from './components/dropdown';
import tree from '../../brown-tree/src/model/tree';

export default {
    name: 'dropdown-tree',

    mixins: [emitter],

    components: {
        IUTree,
        Dropdown,
        DropdownMenu
    },

    props: {
        size: String,
        title: String,
        placeholder: String,
        menuAlign: {
            type: String,
            default: 'start'
        },
        checkChildren:{
            type:Boolean,
            default:true
        }
    },

    computed: {
        iconClass() {
            return this.isDropdownShow ? 'arrow-down reverse' : 'arrow-down'
        },
        inputTitle() {
            return (this.title || this.checkedNodes.map(node => {
                return (node.label || '');
            }).join('，'));
        }
    },

    data() {
        return {
            isDropdownShow: false,
            menuWidth: 200,
            checkedNodes: []
        }
    },

    methods: {
        // 访问器
        selectAll() {
            if (this.$refs.tree) {
                this.$refs.tree.selectAll();
            }
        },
        cleanTree() {
            if (this.$refs.tree) {
                this.$refs.tree.clean();
            }
        },
        getTree() {
            return this.$refs.tree;
        },

        handleClick(e) {
            if (!this.isDropdownShow) {
                this.menuWidth = this.$refs.dropdown.$el.clientWidth;
            }

            this.isDropdownShow = !this.isDropdownShow;
        },

        handleChange(checkedNodes, onInit) {
            this.checkedNodes = checkedNodes;
            if (!onInit) {
                this.dispatch('form-item', 'el.form.change', [checkedNodes]);
            }
        },

        handleExpandOrCollapse() {
            const panel = this.$refs.panel;
            panel.resetTransformOrigin();
            this.$nextTick(panel.updatePopper);
        }
    },

    mounted() {
        this.$refs.panel.$el.addEventListener('click', () => {
            this.handleClick();
            (document.body || document.documentElement).click();
        })
    }
}
</script>

<style lang="scss">
    .dropdown-tree {
        width: 100%;

        cursor: pointer;

        input {
            cursor: pointer;
        }

        .title {
            input {
                border-color: #c0ccda !important;
            }

            &:hover input {
                border-color: #20a0ff !important;
            }

            &.title-active input {
                border-color: #20a0ff !important;
            }
        }

        .el-icon-arrow-down {
            transition: transform .25s ease-in-out;
        }
        .reverse {
            transition: transform .25s ease-in-out;
            transform: rotate(-180deg);
        }
    }
    .el-dropdown-menu.brown-dropdown-panel {
        min-width: 180px;
        max-height: 500px;

        overflow: auto;

        &:before {
            content: '';

            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -1;

            background: transparent;
        }

        .el-tree {
            border: none;
        }

        .el-tree-node-content {
            padding-right: 30px;
        }

        .brown-tree {
            max-height: 300px;
            overflow: auto;
            top: 28px;
            left: 0;
            width: 100%;
            background-color: #fff;
            box-sizing: border-box;
            z-index: 100;

            .tree-node .node-main {
                padding: 4px 6px;
                height: 28px;
                line-height: 20px;

                .node-checkbox {
                    background: #fff;
                    border: 1px solid #c0ccda;
                    &.icon-check {
                        background: #20a0ff;
                    }
                    &.icon-minus {
                        background: #20a0ff;
                    }
                }
            }
        }
    }
</style>