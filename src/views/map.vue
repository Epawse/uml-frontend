<template>
    <div class="container">

        <el-form ref="form" :model="form" label-width="110px">
            <el-form-item label="所在小区：" prop="district">
                <el-select v-model="form.district" placeholder="小区">
                    <el-option

                            v-for="item in form.districts"
                            :key=item.district_id
                            :label=item.district_name
                            :value="item.district_name"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="详细地址：" prop="address">
                <el-autocomplete
                        v-model="form.address"
                        style="width:70%;"
                        popper-class="autoAddressClass"
                        :fetch-suggestions="querySearchAsync"
                        :trigger-on-focus="false"
                        placeholder="详细地址"
                        clearable
                        @select="handleSelect"
                >
                    <template slot-scope="{ item }">
                        <i class="el-icon-search fl mgr10"/>
                        <div style="overflow:hidden;">
                            <div class="title">{{ item.title }}</div>
                            <span class="address ellipsis">{{ item.address }}</span>
                        </div>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="地图定位：">
                <div id="map-container" style="width:70%;height:500px;"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
/* eslint-disable */
import loadBMap from '@/utils/loadBMap.js'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8088";

export default {
    data() {
        return {
            // DistrictsModel: '',
            // districts: [],
            form: {
                districts: [],
                district: '',
                address: '', // 详细地址
                addrPoint: { // 详细地址经纬度
                    lng: 0,
                    lat: 0
                }
            },
            map: 'myMap', // 地图实例
            mk: '', // Marker实例
            locationPoint: null
        }
    },
    async mounted() {
        await loadBMap('kA28Z7RQzizVHRxNDczTfHTsRj5BRFmh') // 加载引入BMap
        this.initMap()

        await this.getDistricts()
    },
    methods: {
        async getDistricts() {
            // 新增操作请求的类型: post	接收时需要使用JSON方式处理
            let {
                data: result
            } = await axios.get("/api/districtAll")
            // Ajax调用之后, 将请求结果赋值给data属性
            this.form.districts = result;
            console.log(this.form.districts);
        },
        // 初始化地图
        initMap() {
            var that = this

            // 1、挂载地图
            this.map = new BMap.Map('map-container', {enableMapClick: false})
            var point = new BMap.Point(113.3324436, 23.1315381)
            this.map.centerAndZoom(point, 19)

            // 2、设置图像标注并绑定拖拽标注结束后事件
            this.mk = new BMap.Marker(point, {enableDragging: true})
            this.map.addOverlay(this.mk)
            this.mk.addEventListener('dragend', function (e) {
                that.getAddrByPoint(e.point)
            })

            // 3、添加（右上角）平移缩放控件
            this.map.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                type: BMAP_NAVIGATION_CONTROL_SMALL
            }))

            // 4、开启滚轮缩放，取消双击放大
            this.map.enableScrollWheelZoom(true)
            this.map.disableDoubleClickZoom()

            // 5、添加（左下角）定位控件
            var geolocationControl = new BMap.GeolocationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT})
            geolocationControl.addEventListener('locationSuccess', function (e) {
                that.getAddrByPoint(e.point)
            })
            geolocationControl.addEventListener('locationError', function (e) {
                alert(e.message)
            })
            this.map.addControl(geolocationControl)

            // 6、浏览器定位
            this.geolocation()

            // 7、绑定双击地图任意点事件
            this.map.addEventListener('dblclick', function (e) {
                that.getAddrByPoint(e.point)
            })

            // 8、添加固定点位
            var point1 = new BMap.Point(113.3324436, 23.1315381)
            var marker1 = new BMap.Marker(point1)
            this.map.addOverlay(marker1)

        },
        // 浏览器定位函数
        geolocation() {
            var that = this
            var geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition(function (res) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    that.getAddrByPoint(res.point)
                    that.locationPoint = res.point
                } else {
                    alert('failed' + this.getStatus())
                    that.locationPoint = new BMap.Point(113.3324436, 23.1315381)
                }
            }, {enableHighAccuracy: true})
        },
        // 2、逆地址解析函数
        getAddrByPoint(point) {
            var that = this
            var geco = new BMap.Geocoder()
            geco.getLocation(point, function (res) {
                console.log(res)
                that.mk.setPosition(point)
                that.map.panTo(point)
                that.form.address = res.address
                that.form.addrPoint = point
            })
        },
        // 8-1、地址搜索
        querySearchAsync(str, cb) {
            var options = {
                onSearchComplete: function (res) {
                    var s = []
                    if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                        for (var i = 0; i < res.getCurrentNumPois(); i++) {
                            s.push(res.getPoi(i))
                        }
                        cb(s)
                    } else {
                        cb(s)
                    }
                }
            }
            var local = new BMap.LocalSearch(this.map, options)
            local.search(str)
        },
        // 8-2、选择地址
        handleSelect(item) {
            this.form.address = item.address + item.title
            this.form.addrPoint = item.point
            this.map.clearOverlays()
            this.mk = new BMap.Marker(item.point)
            this.map.addOverlay(this.mk)
            this.map.panTo(item.point)
        },
        onSubmit() {
            console.log(this.form)
        }
    },
}
</script>

<style>
/*.autoAddressClass {*/
/*    li {*/
/*        i.el-icon-search {*/
/*            margin-top: 11px;*/
/*        }*/

/*        .mgr10 {*/
/*            margin-right: 10px;*/
/*        }*/

/*        .title {*/
/*            text-overflow: ellipsis;*/
/*            overflow: hidden;*/
/*        }*/

/*        .address {*/
/*            line-height: 1;*/
/*            font-size: 12px;*/
/*            color: #b4b4b4;*/
/*            margin-bottom: 5px;*/
/*        }*/
/*    }*/
/*}*/
</style>
