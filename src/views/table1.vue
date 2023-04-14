<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="行政区">
                <el-select v-model="formInline.district" placeholder clearable>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="东西湖区" value="东西湖区"></el-option>
                    <el-option label="新洲区" value="新洲区"></el-option>
                    <el-option label="武昌区" value="武昌区"></el-option>
                    <el-option label="汉南区" value="汉南区"></el-option>
                    <el-option label="汉阳区" value="汉阳区"></el-option>
                    <el-option label="江夏区" value="江夏区"></el-option>
                    <el-option label="江岸区" value="江岸区"></el-option>
                    <el-option label="江汉区" value="江汉区"></el-option>
                    <el-option label="洪山区" value="洪山区"></el-option>
                    <el-option label="硚口区" value="硚口区"></el-option>
                    <el-option label="蔡甸区" value="蔡甸区"></el-option>
                    <el-option label="青山区" value="青山区"></el-option>
                    <el-option label="黄陂区" value="黄陂区"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小区">
                <el-select v-model="formInline.cell" placeholder clearable>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search"
                           @click="onSearch"
                >搜索
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" icon="el-icon-refresh">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
                ref="multipleTable"
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"

                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="user_id" label="用户序号" align="center"></el-table-column>
            <el-table-column prop="district_id" label="小区序号" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" @click="checkInfo(scope.$index, scope.row)">查看
                    </el-button>
                    <el-button size="mini" plain type="primary" @click="updateInfo(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini" plain type="danger" @click="deleteInfo(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="查看"
                :visible.sync="dialog1"
                width="30%"
        >
            <el-form :model="checkForm" label-width="80px">
                <el-form-item label="用户序号">
                    <el-input v-model="checkForm.user_id" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="小区序号">
                    <el-input v-model="checkForm.district_id" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="checkForm.username" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="checkForm.password" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="checkForm.email" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="checkForm.phone" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="管理员">
                    <el-input v-model="checkForm.is_admin" readonly="readonly"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialog1 = false">取 消</el-button>
                        </span>
        </el-dialog>
        <el-dialog
                title="编辑"
                :visible.sync="updateDialogVisible"
                width="30%"
        >
            <el-form :model="updateForm" label-width="80px">
<!--                <el-form-item label="小区序号">-->
<!--                    <el-input v-model="updateForm.district_id"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="用户名">
                    <el-input v-model="updateForm.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="updateForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="updateForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                                    <el-button @click="updateDialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click=changeUser>确 定</el-button>
                                </span>
        </el-dialog>
        <!--        <el-dialog-->
        <!--                title="删除"-->
        <!--                :visible.sync="dialog3"-->
        <!--                width="30%"-->
        <!--        >-->
        <!--            &lt;!&ndash;            <span>确定删除吗？</span>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <span slot="footer" class="dialog-footer">&ndash;&gt;-->
        <!--            &lt;!&ndash;                <el-button @click="dialog4 = false">取 消</el-button>&ndash;&gt;-->
        <!--            &lt;!&ndash;                <el-button type="primary" @click="dialog4 = false">确 定</el-button>&ndash;&gt;-->
        <!--            &lt;!&ndash;            </span>&ndash;&gt;-->
        <!--        </el-dialog>-->
        <!--        <el-dialog-->
        <!--                title="添加"-->
        <!--                :visible.sync="dialog3"-->
        <!--                width="30%"-->
        <!--        >-->
        <!--            <el-form :model="form" label-width="80px">-->
        <!--                <el-form-item label="用户名">-->
        <!--                    <el-input v-model="form.username"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="密码">-->
        <!--                    <el-input v-model="form.password"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="邮箱">-->
        <!--                    <el-input v-model="form.email"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="手机号">-->
        <!--                    <el-input v-model="form.phone"></el-input>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <span slot="footer" class="dialog-footer">-->
        <!--                        <el-button @click="dialog3 = false">取 消</el-button>-->
        <!--                        <el-button type="primary" @click="dialog3 = false">确 定</el-button>-->
        <!--                    </span>-->
        <!--        </el-dialog>-->
        <!--        <div class="add">-->
        <!--            <el-button type="primary" @click="dialog3 = true">添加</el-button>-->
        <!--        </div>-->
        <!--        <div class="search">-->
        <!--            <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
        <!--                <el-form-item label="区域">-->
        <!--                    <el-select v-model="formInline.district" placeholder="请选择">-->
        <!--                        <el-option label="区域一" value="shanghai"></el-option>-->
        <!--                        <el-option label="区域二" value="beijing"></el-option>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="小区">-->
        <!--                    <el-select v-model="formInline.cell" placeholder="请选择">-->
        <!--                        <el-option label="小区一" value="shanghai"></el-option>-->
        <!--                        <el-option label="小区二" value="beijing"></el-option>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item>-->
        <!--                    <el-button type="primary" @click="onSearch">查询</el-button>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--        </div>-->

        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size=pageSize
                    layout="total,  prev, pager, next, jumper"
                    :total=total
            ></el-pagination>
        </div>
    </div>
</template>

<script>
// import axios from "axios";
// axios.baseURL = "http://localhost:8088";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8088";
export default {
    name: "btable",
    data() {
        return {
            tableData: [], // 用于存储从后端获取的表格数据
            total: 0,
            pageSize: 5,
            currentPage: 1,
            dialog1: false,
            updateDialogVisible: false,
            dialog2: false,
            dialog3: false,
            formInline: {
                district: "",
                cell: "",
            },
            checkForm: {
                user_id: 0,
                district_id: 0,
                username: "",
                password: "",
                email: "",
                phone: "",
                is_admin: false
            },
            updateForm: {
                user_id: 0,
                district_id: 0,
                username: "",
                email: "",
                phone: "",
            },
            deleteForm: {
                username: "",
                password: "",
                email: "",
                phone: "",
            },
        };
    },
    methods: {
        async getUserList() {
            // 新增操作请求的类型: post	接收时需要使用JSON方式处理
            let {
                data: result
            } = await axios.get("/api/userAll")
            // Ajax调用之后, 将请求结果赋值给data属性
            this.tableData = result;
            this.total = result.length;
        },
        async changeUser() {
            // 发送put请求，将修改后的数据传给后端
            let {
                data: result
            } = await axios.put("/api/user", this.updateForm)
            // 判断返回值是否为true
            if (result) {
                // 如果为true，说明修改成功，重新获取数据
                await this.getUserList();
                // 关闭对话框
                this.updateDialogVisible = false;
            }
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        checkInfo(index, row) {
            this.checkForm.user_id = this.tableData[index + (this.currentPage - 1) * this.pageSize].user_id;
            this.checkForm.district_id = row.district_id;
            this.checkForm.username = row.username;
            this.checkForm.password = this.tableData[index + (this.currentPage - 1) * this.pageSize].password;
            this.checkForm.email = row.email;
            this.checkForm.phone = row.phone;
            this.checkForm.is_admin = this.tableData[index + (this.currentPage - 1) * this.pageSize].is_admin;
            this.dialog1 = true;
        },
        updateInfo(index, row) {
            this.updateForm.user_id = this.tableData[index].user_id;
            // this.updateForm.district_id = row.district_id;
            this.updateForm.username = row.username;
            this.updateForm.email = row.email;
            this.updateForm.phone = row.phone;
            this.updateDialogVisible = true;
        },
    },
    mounted() {
        this.getUserList();
    }
};
</script>

<style scoped>
</style>