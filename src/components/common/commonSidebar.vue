<template>
    <div class="sidebar">
        <el-menu
                :default-active="onRoute"
                class="sidebar-el-menu"
                :collapse="collapse"
                background-color="#fff"
                text-color="#333"
                active-text-color="#6190e8"
                router
                unique-opened
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <!-- 预留字体图标 -->
                            <i :class="item.icon"></i>
                            <span slot="title" class="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                                    class="title"
                            >
                                <template slot="title" class="title">{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                        class="title"
                                >{{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                                    class="title"
                            >{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" class="title">
                        <!-- 预留字体图标 -->
                        <i :class="item.icon"></i>
                        <span slot="title" class="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../../service/bus";

export default {
    name: "commonSidebar",
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: "el-icon-location-outline",
                    index: "dashboard",
                    title: "系统首页",
                },
                {
                    icon: "el-icon-notebook-2",
                    index: "info2",
                    title: "数据管理",
                    subs: [
                        {
                            index: "table1",
                            title: "用户表格",
                        },
                        {
                            index: "table2",
                            title: "小区表格",
                        },
                        {
                            index: "table3",
                            title: "反馈表格",
                        },
                    ],
                },
                {
                    icon: "el-icon-reading",
                    index: "info",
                    title: "个人信息",
                    subs: [
                        {
                            index: "form-detail",
                            title: "当前信息",
                        },
                        {
                            index: "form",
                            title: "修改信息",
                        },

                    ],
                },
                {
                    icon: "el-icon-tickets",
                    index: "mapview",
                    title: "地图展示",
                },
                {
                    icon: "el-icon-upload",
                    index: "upload",
                    title: "提交反馈",
                },
                {
                    icon: "el-icon-pie-chart",
                    index: "charts",
                    title: "vchart图表",
                },
            ],
        };
    },
    created() {
        // 控制折叠面板
        bus.$on("collapse", (msg) => {
            this.collapse = msg;
            bus.$emit("collapse-content", msg);
        });
    },
    computed: {
        // 路由配置
        onRoute() {
            return this.$route.path.replace("/", "");
        },
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar > ul {
    height: 100%;
}

.title {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.el-menu-item {
    border-left: #fff solid 6px;
}

/* 设置鼠标悬停时el-menu-item的样式 */
.el-menu-item:hover {
    border-left: #6190e8 solid 6px !important;
    background-color: #e2eff9 !important;
    color: #6190e8 !important;
}

.el-menu-item:hover i {
    color: #6190e8;
}

/* 设置选中el-menu-item时的样式 */
.el-menu-item.is-active {
    border-left: #6190e8 solid 6px !important;
    background-color: #e2eff9 !important;
    color: #6190e8 !important;
}
</style>