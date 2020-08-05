<template>
    <div id="button">
        <demo-block title="基础用法" desc="基础的按钮用法">
            <i-button :ripple="true">default</i-button>
            <i-button type="primary" :ripple="true">primary</i-button>
            <i-button type="success" :ripple="true">success</i-button>
            <i-button type="warning" :ripple="true">warning</i-button>
            <i-button type="danger" :ripple="true">error</i-button>
            <i-button type="info" :ripple="true">info</i-button>
            <i-button type="text" :ripple="true">text</i-button>
        </demo-block>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>