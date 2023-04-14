<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <div>
                <el-form :inline="true" label-width="120px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="用户名 :">
                                <span>xxx</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="年龄 :">
                                <span>20</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="性别 :">
                                <span>男</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="住址 :">
                                <span>地大未来城校区</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号 :">
                                <span>11111111111</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮箱 :">
                                <span>123@123.com</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>

        <!--    <el-card class="box-card" style="margin-top: 20px">-->
        <!--      <div slot="header" class="clearfix">-->
        <!--        <span>其他信息</span>-->
        <!--      </div>-->
        <!--      <div>-->
        <!--        <el-form :inline="true" label-width="120px">-->
        <!--          <el-row>-->
        <!--            <el-col :span="8">-->
        <!--              <el-form-item label="曾用名 :">-->
        <!--                <span>无</span>-->
        <!--              </el-form-item>-->
        <!--            </el-col>-->
        <!--            <el-col :span="8">-->
        <!--              <el-form-item label="家庭人数 :">-->
        <!--                <span>4人</span>-->
        <!--              </el-form-item>-->
        <!--            </el-col>-->
        <!--            <el-col :span="8">-->
        <!--              <el-form-item label="寄宿方式 :">-->
        <!--                <span>住校</span>-->
        <!--              </el-form-item>-->
        <!--            </el-col>-->
        <!--          </el-row>-->
        <!--          <el-row>-->
        <!--            <el-col :span="8">-->
        <!--              <el-form-item label="学生来源 :">-->
        <!--                <span>正常入学</span>-->
        <!--              </el-form-item>-->
        <!--            </el-col>-->
        <!--            <el-col :span="8">-->
        <!--              <el-form-item label="家庭住址 :">-->
        <!--                <span>安徽省蚌埠市马栏山村大庄组100号</span>-->
        <!--              </el-form-item>-->
        <!--            </el-col>-->
        <!--          </el-row>-->
        <!--        </el-form>-->
        <!--      </div>-->
        <!--    </el-card>-->
        <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>反馈记录</span>
            </div>
            <div>
                <el-table :data="feedbackList">
                    <el-table-column label="反馈时间" prop="startDate" align="center"></el-table-column>
                    <el-table-column label="反馈标题" prop="title" align="center"></el-table-column>
                    <el-table-column label="当前状态" prop="status" align="center"></el-table-column>
                    <el-table-column label="操作" prop="edu" align="center">
                        <template>
                            <el-button size="mini" plain type="primary">查看</el-button>
                            <el-button size="mini" plain type="primary">编辑</el-button>
                            <el-button size="mini" plain type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "form-detail",
    data() {
        return {
            feedbackList: [
                {
                    startDate: "2023-3-15",
                    title: "标题4",
                    status: "未解决",
                },
                {
                    startDate: "2021-10-01",
                    title: "标题1",
                    status: "已解决",
                },
                {
                    startDate: "2021-12-12",
                    title: "标题2",
                    status: "已解决",
                },
                {
                    startDate: "2022-5-28",
                    title: "标题3",
                    status: "已解决",
                },
            ],
        };
    },
};
</script>

<style scoped>
.line-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-right: 40px;
}
</style>