<template>
    <el-table :data="storage_info" stripe style="width: 100%">
        <el-table-column prop="exercise_id" label="练习ID" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="tags" label="标签">
            <template #default="scope">
                <el-tag v-for="item in scope.row.divided_tag" type="success" style="margin-right: 0.5rem;">{{ item
                }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度">
            <template #default="scope">
                <el-tag type="success" style="margin-right: 0.5rem;">{{ scope.row.difficulty }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="操作">
            <template #default="scope">
                <el-button type="success" @click="toContentPage(scope.row.exercise_id)">点我查看题目!</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<script>
import requests from '../utils/request'
export default {
    data() {
        return {
            storage_file_path: "",
            storage_info: [],
        }
    },
    methods:{
        toContentPage(exercise_id){
            this.$router.push({
                name: 'ExerciseContent',
                params:{
                    pid: exercise_id
                }
            });
        }
    },
    created() {
        requests.get("api/get-all").then(
            res => {
                this.storage_info = res.data;
                console.log(this.storage_info)
                // 处理一下数据
                for(let i = 0; i < this.storage_info.length; i++){
                    this.storage_info[i].divided_tag = this.storage_info[i].tags.split(',');
                }
                console.log(this.storage_info)
            }
        )
    },
}
</script>

<style lang="less" scoped></style>