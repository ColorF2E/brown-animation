<template>
    <label class="el-radio">
            <span class="el-radio-input"
              :class="{
                'is-disabled': isDisabled,
                'is-checked': model === label,
                'is-focus': focus
              }"
            >
              <span class="el-radio-inner"></span>
              <input
                class="el-radio-original"
                :value="label"
                type="radio"
                v-model="model"
                @focus="focus = true"
                @blur="focus = false"
                :name="name"
                :disabled="isDisabled">
            </span>
            <span class="el-radio-label">
              <slot></slot>
              <template v-if="!$slots.default">{{label}}
</template>
        </span>
  </label>
</template>

<script>
    import Emitter from '../../../utils/emitter';
    
    export default {
        name: 'ElRadio',
    
        mixins: [Emitter],
    
        componentName: 'ElRadio',
    
        props: {
            value: {},
            label: {},
            disabled: Boolean,
            name: String
        },
    
        data() {
            return {
                focus: false
            };
        },
    
        computed: {
            isGroup() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'ElRadioGroup') {
                        parent = parent.$parent;
                    } else {
                        this._radioGroup = parent;
                        return true;
                    }
                }
                return false;
            },
    
            model: {
                get() {
                    return this.isGroup ? this._radioGroup.value : this.value;
                },
    
                set(val) {
                    if (this.isGroup) {
                        this.dispatch('ElRadioGroup', 'input', [val]);
                    } else {
                        this.$emit('input', val);
                    }
                }
            },
    
            isDisabled() {
                return this.isGroup ?
                    this._radioGroup.disabled || this.disabled :
                    this.disabled;
            }
        }
    };
</script>
