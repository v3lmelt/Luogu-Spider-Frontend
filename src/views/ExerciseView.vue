

<template>
    <el-container>
        <el-main>
            <v-md-preview :text=markdown_info></v-md-preview>
        </el-main>
        <el-aside width="30%">
            <el-affix target=".el-aside" :offset="155">
                <el-descriptions title="本题信息" :column="2" direction="vertical" border style="width: 100%;">
                <el-descriptions-item label="题目标题">
                    {{exercise_info.title}}
                </el-descriptions-item>
                <el-descriptions-item label="出题人">
                    {{ exercise_info.exercise_author }}
                </el-descriptions-item>
                <el-descriptions-item label="题解作者">
                    {{exercise_info.solution_author}}
                </el-descriptions-item>
                <el-descriptions-item label="题目难度">
                    <el-tag>{{ exercise_info.difficulty }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Tags">
                    <el-tag v-for="item in exercise_info.divided_tag">{{ item }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="题解">
                    <el-button @click="ChangeMode()" >{{ button_text }}</el-button>
                </el-descriptions-item>
            </el-descriptions>
            </el-affix>

        </el-aside>
    </el-container>
</template>




<script>
import request from '../utils/request';
export default {
    data() {
        return {
            exercise_info: {},
            markdown_info:"",
            solution_markdown: "",
            exercise_markdown: "",
            mode:0,
        }
    },
    methods:{
        ChangeMode(){
            if(this.mode == 0){
                this.mode = 1;
                this.markdown_info = this.solution_markdown;
            }else{
                this.mode = 0;
                this.markdown_info = this.exercise_markdown;
            }
        }
    },
    created() {
        let id = this.$route.params.pid;
        request.get("/markdown/" + id).then(
            res => {
                console.log(res)
                this.solution_markdown = res.data.solutionMarkdownData;
                this.exercise_markdown = res.data.exerciseMarkdownData;

                this.markdown_info = this.exercise_markdown;
            }
        );
        request.get("/api/search/" + id).then(
            res => {
                console.log(res.data)
                this.exercise_info = res.data;
                this.exercise_info.divided_tag = this.exercise_info.tags.split(',');
            }
        )
    },
    computed:{
        button_text(){
            if(this.mode == 0){
                return "点我切换题解!"
            }else{
                return "点我切换题目!"
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>