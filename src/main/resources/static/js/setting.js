new Vue({
    el: '#app',
    data() {
        return {
            proname:'',
            activeIndex2:'',
            item:['http://www.clfgoodlife.com/Uploads/65489437c126e.jpg',
            'http://www.clfgoodlife.com/Uploads/654894592225e.jpg','http://www.clfgoodlife.com/Uploads/654894818da4a.jpg'],
            lispage:[],
            lispagenew:[],
            emp:[],
            uurl:'',
            nname:'',
            details:'',
            prices:'',
            dialogVisible:false,
            dialogVisiblec:false,
            form:{
                email:'',
                company:'',
                phone:'',
                counts:'',
                pname:'',
                youname:'',
                address:'',
                message:''
            }
        }
    },

    //初始化
    mounted: function () {
        this.ec();
        this.m();
        //init img page list
        var newthis = this;
        //点击标签弹出列表
        var url = '/search2';
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            success: function (result) {
                newthis.lispage=result;
            },
            error: function () {
                console.log('error submit!!');
                return false;
            }
        });
        var url2 = '/search3';
        $.ajax({
            type: 'POST',
            url: url2,
            dataType: 'json',
            success: function (result) {
                newthis.lispagenew=result;
            },
            error: function () {
                console.log('error submit!!');
                return false;
            }
        });
        var url3 = '/search4';
        $.ajax({
            type: 'POST',
            url: url3,
            dataType: 'json',
            success: function (result) {
                newthis.emp=result;
            },
            error: function () {
                console.log('error submit!!');
                return false;
            }
        });

    },
    //方法事件
    methods: {
        detail(val){
            this.uurl = val.purl;
            this.nname = val.pname;
            this.details = val.detail;
            this.prices = val.price;
            //打开详情页
            this.dialogVisible=true;

        },
        //'全局搜索
        search(){
            var newthis =this;
            // 创建一个 form
            var form1 = document.createElement("form");
            document.body.appendChild(form1);
            // 创建一个输入
            var input2 = document.createElement("input");
            // 设置相应参数
            input2.type = "text";
            input2.name = "proname";
            input2.value = newthis.proname;
            form1.appendChild(input2);
            // form 的提交方式
            form1.method = "POST";
            // form 提交路径
            form1.action = "/qjlist";
            // 对该 form 执行提交
            form1.submit();
            // 删除该 form
            document.body.removeChild(form1);
        },



        send(){
            this.form=[];
            this.form.pname = this.nname;
            //打开详情页
            this.dialogVisiblec=true;

        },
        //提交客户信息
        onSubmit(){
            var addForm = this.form;
            if (addForm.phone=="" || addForm.phone==null){
                this.$notify.error({
                    title: 'phone equal null',
                    offset: 300
                });
                return;
            }
            if (addForm.email=="" || addForm.email==null){
                this.$notify.error({
                    title: 'email equal null',
                    offset: 300
                });
                return;
            }
            var newthis = this;
            var d={
                'phone': addForm.phone,
                'company': addForm.company,
                'counts': addForm.counts,
                'pname': addForm.pname,
                'youname': addForm.youname,
                'address': addForm.address,
                'content': addForm.content,
                'message': addForm.message,
                'email':addForm.email
            }
            var url = '/add';
            $.ajax({
                type: 'POST',
                url: url,
                data: d,
                dataType: 'json',
                success: function (result) {
                    newthis.dialogVisiblec=false;
                    if (result == 1) {
                        newthis.addkun = false;
                        newthis.$notify({
                            title: 'success',
                            type: 'success',
                            offset: 300
                        });
                    } else {
                        newthis.$message.error('很遗憾，发送失败');
                    }
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(done) {
            this.$confirm('true close？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleCloses(done) {
            this.$confirm('true close？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        ec() {
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                graphic: {
                    elements: [
                        {
                            type: 'text',
                            left: 'center',
                            top: 'center',
                            style: {
                                text: 'Good Life',
                                fontSize: 80,
                                fontWeight: 'oblique',
                                lineDash: [0, 200],
                                lineDashOffset: 0,
                                fill: 'transparent',
                                stroke: '#f10b0b',
                                lineWidth: 3
                            },
                            keyframeAnimation: {
                                duration: 3000,
                                loop: true,
                                keyframes: [
                                    {
                                        percent: 0.7,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 200,
                                            lineDash: [200, 0]
                                        }
                                    },
                                    {
                                        // Stop for a while.
                                        percent: 0.8,
                                        style: {
                                            fill: 'transparent'
                                        }
                                    },
                                    {
                                        percent: 8,
                                        style: {
                                            fill: '#f10b0b'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            myChart.setOption(option);
        },
        m() {
            var myChart = echarts.init(document.getElementById("map"));
            option = null;
            const data = [
                { name: 'Zimbabwe', value: 106 },
                { name: 'Tanzania', value: 276 },
                { name: 'GuangZhou', value: 168 },
                { name: 'Nigeria', value: 105 },
                { name: 'Lithuania', value: 108 },
                { name: 'SouthAfrica', value: 66 },
                { name: 'France', value: 98 },
                { name: 'Bolivia', value: 109 },
                { name: 'Kenya', value: 123 },
                { name: 'Spain', value: 155 },
            ];
            const geoCoordMap = {
                Zimbabwe:[31.00000,-18.000000],
                Tanzania:[35.45,-6.08],
                Nigeria:[7.32,9.05],
                GuangZhou : [113.23, 23.16],
                Lithuania:[25.19,54.38],
                SouthAfrica:[28.11,-25.43],
                France:[2.2,48.5],
                Bolivia:[-68.1,-16.2],
                Kenya:[36.48,-1.17],
                Spain:[-3.45,40.25],
            };
            const convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            option = {
                title: {
                    text: 'guest Department',
                    subtext: 'Good Life',
                    sublink: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                bmap: {
                    center: [40.114129, 0.550339],
                    zoom: -1,
                    roam: true,
                    mapStyle: {
                        styleJson: [
                            {
                                featureType: 'water',
                                elementType: 'all',
                                stylers: {
                                    color: '#d1d1d1'
                                }
                            },
                            {
                                featureType: 'land',
                                elementType: 'all',
                                stylers: {
                                    color: '#f3f3f3'
                                }
                            },
                            {
                                featureType: 'railway',
                                elementType: 'all',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'highway',
                                elementType: 'all',
                                stylers: {
                                    color: '#fdfdfd'
                                }
                            },
                            {
                                featureType: 'highway',
                                elementType: 'labels',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'arterial',
                                elementType: 'geometry',
                                stylers: {
                                    color: '#fefefe'
                                }
                            },
                            {
                                featureType: 'arterial',
                                elementType: 'geometry.fill',
                                stylers: {
                                    color: '#fefefe'
                                }
                            },
                            {
                                featureType: 'poi',
                                elementType: 'all',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'green',
                                elementType: 'all',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'subway',
                                elementType: 'all',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'manmade',
                                elementType: 'all',
                                stylers: {
                                    color: '#d1d1d1'
                                }
                            },
                            {
                                featureType: 'local',
                                elementType: 'all',
                                stylers: {
                                    color: '#d1d1d1'
                                }
                            },
                            {
                                featureType: 'arterial',
                                elementType: 'labels',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'boundary',
                                elementType: 'all',
                                stylers: {
                                    color: '#fefefe'
                                }
                            },
                            {
                                featureType: 'building',
                                elementType: 'all',
                                stylers: {
                                    color: '#d1d1d1'
                                }
                            },
                            {
                                featureType: 'label',
                                elementType: 'labels.text.fill',
                                stylers: {
                                    color: '#104f3e'
                                }
                            }
                        ]
                    }
                },
                series: [
                    {
                        name: 'customer',
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        encode: {
                            value: 1
                        },
                        label: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    {
                        name: 'customer',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        data: convertData(
                            data
                                .sort(function (a, b) {
                                    return b.value - a.value;
                                })
                                .slice(0, 6)
                        ),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        encode: {
                            value: 2
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: '#104f3e'
                        },
                        emphasis: {
                            scale: true
                        },
                        zlevel: 1
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
})