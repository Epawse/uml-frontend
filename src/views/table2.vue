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
            <el-form-item>
                <el-button type="primary" icon="el-icon-upload"
                           @click="onAddData"
                >添加数据
                </el-button>
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
            <el-table-column prop="district_name" label="小区名" align="center"></el-table-column>
            <el-table-column prop="latitude" label="纬度" align="center"></el-table-column>
            <el-table-column prop="longitude" label="经度" align="center"></el-table-column>
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
                :visible.sync="checkDialogVisible"
                width="30%"
        >
            <el-form :model="checkForm" label-width="80px">
                <el-form-item label="序号">
                    <el-input v-model="checkForm.district_id" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="小区名">
                    <el-input v-model="checkForm.district_name" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="纬度">
                    <el-input v-model="checkForm.latitude" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="经度">
                    <el-input v-model="checkForm.longitude" readonly="readonly"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="checkDialogVisible = false">取 消</el-button>
                        </span>
        </el-dialog>
        <el-dialog
                title="编辑"
                :visible.sync="updateDialogVisible"
                width="30%"
        >
            <el-form :model="updateForm" label-width="80px">
                <el-form-item label="序号">
                    <el-input v-model="updateForm.district_id"></el-input>
                </el-form-item>
                <el-form-item label="小区名">
                    <el-input v-model="updateForm.district_name"></el-input>
                </el-form-item>
                <el-form-item label="纬度">
                    <el-input v-model="updateForm.latitude"></el-input>
                </el-form-item>
                <el-form-item label="经度">
                    <el-input v-model="updateForm.longitude"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                                    <el-button @click="updateDialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click=changeDistrict>确 定</el-button>
                                </span>
        </el-dialog>
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
            checkDialogVisible: false,
            updateDialogVisible: false,
            dialog2: false,
            dialog3: false,
            formInline: {
                district: "",
                cell: "",
            },
            checkForm: {
                district_id: "",
                district_name: "",
                latitude: "",
                longitude: "",
            },
            updateForm: {
                district_id: "",
                district_name: "",
                latitude: "",
                longitude: "",
            },
            deleteForm: {
                district_id: "",
                district_name: "",
                latitude: "",
                longitude: "",
            },
        };
    },
    methods: {
        async getDistrictList() {
            // 新增操作请求的类型: post	接收时需要使用JSON方式处理
            let {
                data: result
            } = await axios.get("/api/districtAll")
            // Ajax调用之后, 将请求结果赋值给data属性
            this.tableData = result;
            this.total = result.length;
        },
        async changeDistrict() {
            // 发送put请求，将修改后的数据传给后端
            let {
                data: result
            } = await axios.put("/api/district", this.updateForm)
            // 判断返回值是否为true
            if (result) {
                // 如果为true，说明修改成功，重新获取数据
                await this.getDistrictList();
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
            this.checkForm.district_id = this.tableData[index + (this.currentPage - 1) * this.pageSize].district_id;
            this.checkForm.district_name = row.district_name;
            this.checkForm.latitude = row.latitude;
            this.checkForm.longitude = row.longitude;
            this.checkDialogVisible = true;
        },
        updateInfo(index, row) {
            this.updateForm.district_id = this.tableData[index].district_id;
            this.updateForm.district_name = row.district_name;
            this.updateForm.latitude = row.latitude;
            this.updateForm.longitude = row.longitude;
            this.updateDialogVisible = true;
        },
    },
    mounted() {
        this.getDistrictList();
    }
};
</script>

<style scoped>
</style>