<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex2" mode="horizontal" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b" router>
                <el-menu-item index="/list">题目列表</el-menu-item>
                <el-menu-item index="/exercise">题目界面</el-menu-item>
            </el-menu>
        </el-header>

        <el-main>
            <RouterView></RouterView>
        </el-main>
    </el-container>
</template>


<script>
import { RouterView } from 'vue-router';


</script>

<style lang="less" scoped></style>
