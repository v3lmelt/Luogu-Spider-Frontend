

<template>
    <v-md-preview :text=exercise_markdown></v-md-preview>
</template>




<script>
import request from '../utils/request';
export default {
    data() {
        return {
            solution_markdown: "",
            exercise_markdown: "",
        }
    },
    created() {
        let id = this.$route.params.pid;
        request.get("/markdown/" + id).then(
            res => {
                console.log(res)
                this.solution_markdown = res.data.solutionMarkdownData;
                this.exercise_markdown = res.data.exerciseMarkdownData;
            }
        )
    }
}
</script>

<style lang="less" scoped></style>