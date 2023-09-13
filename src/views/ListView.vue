<template>
    <el-container>
        <el-header height="auto">
            <div class="search-title">搜索</div>
            <el-form :inline="true" v-model="filters" style="width: 100%">
                <el-form-item label="难度">
                    <el-select v-model="filters.difficulty" placeholder="请选择难度" size="large" @change="findBySearch()"
                        clearable>
                        <el-option v-for="item in difficulty_options" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="标题关键词">
                    <el-input v-model="filters.title" @input="findBySearch()" />
                </el-form-item>
                
                <el-form-item label="题目ID">
                    <el-input v-model="filters.exercise_id" @input="findBySearch()" />
                </el-form-item>
                <el-form-item label="标签" style="width: 100%">
                    <div v-if="this.tags_for_display.length == 0">试着点击一些标签吧!</div>
                    <el-tag v-for="item in tags_for_display" type="success" style="margin-right: 0.5rem;" closable
                        @close="removeTagFromFilter(item)">{{ item
                        }}</el-tag>
                </el-form-item>

            </el-form>
        </el-header>
        <el-main>
            <el-table :data="storage_info" stripe style="width: 100%; margin-top: 1rem;">
                <el-table-column prop="exercise_id" label="练习ID" sortable width="auto"  />
                <el-table-column prop="title" label="标题" width="auto"/>
                <el-table-column prop="tags" label="标签" sortable width="auto">
                    <template #default="scope">
                        <el-tag v-for="item in scope.row.divided_tag" type="success" style="margin-right: 0.5rem;"
                            @click="addTagToFilter(item)">{{ item
                            }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="difficulty" label="难度" sortable width="auto" >
                    <template #default="scope">
                        <el-tag type="success" style="margin-right: 0.5rem;">{{ scope.row.difficulty }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="exercise_author" label="出题人" sortable width="auto" />
                <el-table-column prop="difficulty" label="操作">
                    <template #default="scope">
                        <el-button type="success" @click="toContentPage(scope.row.exercise_id)">点我查看题目!</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer height="auto">
            <el-pagination v-model:current-page="filters.pageNum" v-model:page-size="filters.pageSize"
                :page-sizes="[10, 20, 30, 40]" :small="small"
                layout="total, sizes, prev, pager, next, jumper" :total="page_helper.totalItem" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" hide-on-single-page />
        </el-footer>
    </el-container>
</template>

<script>
import { useTransitionFallthroughEmits } from 'element-plus';
import requests from '../utils/request'
export default {
    data() {
        return {
            storage_info: [],
            filters: {
                pageNum: 1,
                pageSize: 10,
            },
            page_helper:{
                totalItem:0,
            },
            current_page: 0,
            tags_for_display: [],
            difficulty_options:
                [
                    {
                        value: '暂无评定 ',
                        label: '暂无评定',
                    },
                    {
                        value: '入门 ',
                        label: '入门',
                    },
                    {
                        value: '普及− ',
                        label: '普及−',
                    },
                    {
                        value: '普及 提高- ',
                        label: '普及/提高- ',
                    },
                    {
                        value: '普及+ 提高 ',
                        label: '普及+/提高 ',
                    },
                    {
                        value: '省选 noi- ',
                        label: '省选/noi-',
                    },
                    {
                        value: 'NOI NOI+ CTSC ',
                        label: 'NOI/NOI+/CTSC',
                    },
                ]

        }
    },
    methods: {
        toContentPage(exercise_id) {
            localStorage.setItem("search_info", JSON.stringify(this.$data));
            this.$router.push({
                name: 'ExerciseContent',
                params: {
                    pid: exercise_id
                }
            });
        },
        findBySearch() {
            requests.get("api/search", { params: this.filters }).then(
                res => {
                    this.storage_info = res.data.list;
                    this.page_helper.totalItem = res.data.total;
                    for (let i = 0; i < this.storage_info.length; i++) {
                        this.storage_info[i].divided_tag = this.storage_info[i].tags.split(',');
                    }
                }
            )
        },
        handleSizeChange(newSize){
            this.storage_info.pageSize = newSize;
            this.findBySearch();
        },
        handleCurrentChange(newNum){
            this.storage_info.pageNum = newNum;
            this.findBySearch();
        },
        addTagToFilter(tag) {
            if (!this.tags_for_display.includes(tag)) {
                this.tags_for_display.push(tag);
            }
            this.filters.tags = this.tag_filter_text;
            console.log(this.filters.tags)
            this.findBySearch();
        },
        removeTagFromFilter(tag) {
            this.tags_for_display = this.tags_for_display.filter(item => {
                return item !== tag;
            })
            this.filters.tags = this.tag_filter_text;
            console.log(this.filters.tags)
            this.findBySearch();
        },
        removeDuplicate(arr) {
            const newArr = []
            arr.forEach(item => {
                if (!newArr.includes(item)) {
                    newArr.push(item)
                }
            })
            return newArr
        }

    },
    created() {
        if(localStorage.getItem("search_info")){
            let info = JSON.parse(localStorage.getItem("search_info"));
            console.log(info)
            this.storage_info = info.storage_info;
            this.filters = info.filters;
            this.page_helper = info.page_helper;
            this.current_page = info.current_page;
            this.tags_for_display = info.tags_for_display;

        }else{
            this.findBySearch();
        }
    },
    computed: {
        tag_filter_text() {
            return this.tags_for_display.join(",");
        }
    },
}
</script>

<style lang="less" scoped>
.search-title {
    font-size: 1.2rem;
    font-weight: 900;

    margin-bottom: 1rem;
}
</style>