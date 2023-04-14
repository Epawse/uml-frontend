<!--暂未实现动态显示当前登陆用户的信息-->
<template>
    <div class="container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="form.username" class="input-wrapper"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form.username" class="input-wrapper"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="form.username" class="input-wrapper"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.username" class="input-wrapper"></el-input>
            </el-form-item>

            <el-form-item label="电子邮箱">
                <el-input v-model="form.username" class="input-wrapper"></el-input>
            </el-form-item>

            <el-form-item label="当前住址">
                <el-cascader :options="options" class="input-wrapper">
                    <template slot-scope="{ node, data }">
                        <span>{{ data.label }}</span>
                        <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                    </template>
                </el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "basicForm",
    data() {
        return {
            form: {
                username: "",
                sex: "",
                age: "",
                phone: "",
                email: "",
                address: "",
            },
            options: [
                {
                    value: "hk",
                    label: "",
                    children: [
                        {
                            value: "fxqsj",
                            label: "",
                        },
                        {
                            value: "fxqhj",
                            label: "",
                        },
                    ],
                },
                {
                    value: "ny",
                    label: "",
                    children: [
                        {
                            value: "fxqdl",
                            label: "",
                        },
                        {
                            value: "ny",
                            label: "",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
    },
};
</script>

<style scoped>
</style>