<template>
  <div class="container">
    <div style="display: flex;flex-direction: row">
      <div style="width: 500px; height: 500px">
        <ve-line :data="chartData1" :settings="chartSettings"></ve-line>
      </div>
      <div style="width: 500px;height: 500px;margin-left: 30px">
        <ve-bar :data="chartData2"></ve-bar>
      </div>
    </div>
    <div style="display: flex;flex-direction: row">
      <div style="width: 500px; height: 500px">
        <ve-histogram :data="chartData3"></ve-histogram>
      </div>
      <div style="width: 500px; height: 500px">
        <ve-pie :data="chartData4"></ve-pie>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "charts",
  data() {
    this.chartSettings = {
      metrics: ["访问用户", "反馈用户"],
      dimension: ["日期"],
    };
    return {
      chartData1: {
        columns: ["日期", "访问用户", "反馈用户", "反馈率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 反馈用户: 1093, 反馈率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 反馈用户: 3230, 反馈率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 反馈用户: 2623, 反馈率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 反馈用户: 1423, 反馈率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 反馈用户: 3492, 反馈率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 反馈用户: 4293, 反馈率: 0.78 },
        ],
      },
      chartData2: {
        columns: ["日期", "访问用户", "反馈用户", "反馈率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 反馈用户: 1093, 反馈率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 反馈用户: 3230, 反馈率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 反馈用户: 2623, 反馈率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 反馈用户: 1423, 反馈率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 反馈用户: 3492, 反馈率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 反馈用户: 4293, 反馈率: 0.78 },
        ],
      },
      chartData3: {
        columns: ["日期", "访问用户", "反馈用户", "反馈率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 反馈用户: 1093, 反馈率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 反馈用户: 3230, 反馈率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 反馈用户: 2623, 反馈率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 反馈用户: 1423, 反馈率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 反馈用户: 3492, 反馈率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 反馈用户: 4293, 反馈率: 0.78 },
        ],
      },
      chartData4: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 },
        ],
      },
    };
  },
};
</script>

<style scoped>
</style>