<template>
    <div class="container">
            <el-row :gutter="15">
              <el-col :span="3">
                <el-card class="box-card">
                  <div class="card-item">
                    <div>
                      <i class="el-icon-notebook-2" style="color: #FE8823; font-size: 30px"></i>
                    </div>
                    <div style="color: #515a6e;font-size: 14px;margin-top: 10px">数据管理</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="3">
                <el-card class="box-card">
                  <div class="card-item">
                    <div>
                      <i class="el-icon-reading" style="color: #EA6646; font-size: 30px"></i>
                    </div>
                    <div style="color: #515a6e;font-size: 14px;margin-top: 10px">个人信息</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="3">
                <el-card class="box-card">
                  <div class="card-item">
                    <div>
                      <i class="el-icon-s-grid" style="color: #4FD3BE; font-size: 30px"></i>
                    </div>
                    <div style="color: #515a6e;font-size: 14px;margin-top: 10px">地图展示</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="3">
                <el-card class="box-card">
                  <div class="card-item">
                    <div>
                      <i class="el-icon-upload" style="color: #E6A23C; font-size: 30px"></i>
                    </div>
                    <div style="color: #515a6e;font-size: 14px;margin-top: 10px">提交反馈</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="3">
                <el-card class="box-card">
                  <div class="card-item">
                    <div>
                      <i class="el-icon-pie-chart" style="color: #FF7361; font-size: 30px"></i>
                    </div>
                    <div style="color: #515a6e;font-size: 14px;margin-top: 10px">vcharts图表</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="3">
                <el-card class="box-card">
                  <div class="card-item">
                    <div>
                      <i class="el-icon-aim" style="color: #65CCED; font-size: 30px"></i>
                    </div>
                    <div style="color: #515a6e;font-size: 14px;margin-top: 10px">国际化</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>

        <div style="margin-top: 50px">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>用户总数</span>
                            <el-tooltip style="float:right" content="用户总数" placement="top-start">
                                <i class="el-icon-user" style="color: #6190e8"></i>
                            </el-tooltip>
                        </div>
                        <div style="font-size: 30px;color: #515a6e">6689人</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>总反馈数</span>
                            <el-tooltip style="float:right" content="总订单数" placement="top-start">
                                <i class="el-icon-document" style="color: #6190e8"></i>
                            </el-tooltip>
                        </div>
                        <div style="font-size: 30px;color: #515a6e">22387</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>今日新增反馈数</span>
                            <el-tooltip style="float:right" content="总订单数" placement="top-start">
                                <i class="el-icon-view" style="color: #6190e8"></i>
                            </el-tooltip>
                        </div>
                        <div style="margin-top: 20px">
                            <el-progress :stroke-width="20" :percentage="32"></el-progress>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>未受理反馈数</span>
                            <el-tooltip style="float:right" content="总订单数" placement="top-start">
                                <i class="el-icon-s-promotion" style="color: #6190e8"></i>
                            </el-tooltip>
                        </div>
                        <div style="color: #6190e8;font-size: 30px">12306</div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div style="margin-top: 70px; height: 485px" >
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-card>
                        <ve-line :data="chartData1" :settings="chartSettings"></ve-line>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card>
                        <ve-histogram :data="chartData2"></ve-histogram>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Charts from "@/views/charts.vue";

export default {
    name: "dashboard",
    components: {Charts},
    data() {
        this.chartSettings = {
            metrics: ["日反馈数", "日完成反馈数"],
            dimension: ["日期"],
        };
        return {
            chartData1: {
                columns: ["日期", "日反馈数", "日完成反馈数"],
                rows: [
                    {日期: "1/1", 日反馈数: 2530, 日完成反馈数: 230},
                    {日期: "1/2", 日反馈数: 3530, 日完成反馈数: 530},
                    {日期: "1/3", 日反馈数: 2923, 日完成反馈数: 923},
                    {日期: "1/4", 日反馈数: 1723, 日完成反馈数: 723},
                    {日期: "1/5", 日反馈数: 3792, 日完成反馈数: 792},
                    {日期: "1/6", 日反馈数: 4593, 日完成反馈数: 493},
                    {日期: "1/7", 日反馈数: 4593, 日完成反馈数: 193},
                    {日期: "1/8", 日反馈数: 4593, 日完成反馈数: 293},
                    {日期: "1/9", 日反馈数: 4429, 日完成反馈数: 593},
                    {日期: "1/10", 日反馈数: 3826, 日完成反馈数: 293},
                    {日期: "1/11", 日反馈数: 1593, 日完成反馈数: 593},
                    {日期: "1/12", 日反馈数: 4593, 日完成反馈数: 593},
                ],
            },
            chartData2: {
                columns: ["日期", "点击量"],
                rows: [
                    {日期: "1/1", 点击量: 10934},
                    {日期: "1/2", 点击量: 32305},
                    {日期: "1/3", 点击量: 26231},
                    {日期: "1/4", 点击量: 14232},
                    {日期: "1/5", 点击量: 34926},
                    {日期: "1/6", 点击量: 42934},
                ],
            },
        };
    },
};
</script>

<style scoped>
/*.card-item {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*}*/
</style>