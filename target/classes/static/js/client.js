new Vue({
    el: '#app',
    data() {
        return {
            ordersdetail:false,
            ordercid:'',
            orderdlog:false,
            gjtetail:false,
            tjclient:[],
            show: false,
            fileList: [],//文件列表
            followid:'',
            tableData:[],
            tableDatafollow:[],
            tableDataorder:[],
            dialogVisible: false,
            gjdialogVisible: false,
            currentPage: 1, //初始页
            pagesize: 100,    //    每页的数据
            formorder:{
                ssxs:'',
                date:''
            },
            formo:{
                name:'',
                money:'',
                blance:'',
                bz:'',
                pay:''
            },
            forms:{
                phone:'',
                name:'',
                address:'',
                xydj:'',
                ssxs:''
            },
            formd:{
                bz:'',
                balance:''
            },
            formc:{
                balance:'',
                email:'',
                sex:'',
                ssxs:'',
                phone:'',
                name:'',
                address:'',
                xydj:'',
                ed:'',
                id:'',
                bz:'',
                zq: false
            },
            form:{
                email:'',
                sex:'',
                phone:'',
                gjdate:'',
                ed:'',
                name:'',
                address:'',
                xydj:'',
                id:'',
                bz:'',
                zq:''
            }

        }
    },


    //初始化
    mounted: function () {
        this.rlt();
        this.xsblac();
        this.sale();
        setTimeout(this.delayedExecution, 1000);
        var newthis = this;
        /* 初始查询 */
        var url = '/listdata';
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            success: function (result) {
                newthis.tableData=result;
            },
            error: function () {
                console.log('error submit!!');
                return false;
            }
        });

        //统计数据
        var urldata = '/tjdata';
        $.ajax({
            type: 'POST',
            url: urldata,
            dataType: 'json',
            success: function (result) {
                document.getElementById("c").innerText = result.A;
                document.getElementById("b").innerText = result.B+' $';
               document.getElementById("a").innerText = result.C;
               document.getElementById("d").innerText = result.D;

            },
            error: function () {
                console.log('error submit!!');
                return false;
            }
        });

        //客户分布比例
        newthis.khfb();
        newthis.wzshm();
    },
    //方法事件
    methods: {
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            var vv = 0;
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = 'Total';
                    return;
                }
                if(index!==7){
                    sums[index] = '—';
                    return;
                }

            });
            for(var i=0;i<data.length;i++){
                vv += Number(data[i].balance);
            }

            sums[7] = Number(vv)+' $';
            return sums;
        },
        wzshm(){
            var chartDom = document.getElementById('f');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                graphic: {
                    elements: [
                        {
                            type: 'text',
                            left: '',
                            top: 'center',
                            style: {
                                text: 'Client distribution ',
                                fontSize: 80,
                                fontWeight: 'bold',
                                lineDash: [0, 200],
                                lineDashOffset: 0,
                                fill: 'transparent',
                                stroke: '#efc3c3',
                                lineWidth: 1
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
                                        percent: 1,
                                        style: {
                                            fill: 'black'
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

        //客户分布
        khfb(){

            //统计数据
            var urldata = '/tjclient';
            $.ajax({
                type: 'POST',
                url: urldata,
                dataType: 'json',
                success: function (result) {
                    var chartDom = document.getElementById('e');
                    var myChart = echarts.init(chartDom);
                    var option;
                    option = {
                        title: {
                            text: 'Customer distribution',
                            subtext: 'Data',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left'
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: '50%',
                                data:  result ,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);

                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });





        },



        delayedExecution(){
            this.show = true;
        },
        //条件搜索
        Search(){
            //获取form表单个项目值
            var sForm = this.forms;

            var newthis = this;
            var d={
                'phone':sForm.phone,
                'name': sForm.name,
                'xydj': sForm.xydj,
                'ssxs': sForm.ssxs,
            }
            var url = '/search';
            $.ajax({
                type: 'POST',
                url: url,
                data: d,
                dataType: 'json',
                success: function (result) {
                    newthis.tableData = result;
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /* 编辑 */
        handleEdit(){

        },
        /* 时间格式化 */
        formatDate (d){
            let dt = new Date(d)
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
        },
        //add order
        addorder(){
            var newthis = this;
            newthis.$confirm('Are you sure add order?', '', {
                confirmButtonText: 'YES',
                cancelButtonText: 'NO',
                type: 'warning'
            }).then(() => {
              var  oform = newthis.formo;
                var d={
                    'cid':newthis.ordercid,
                    'bz': oform.bz,
                    'balance': oform.balance,
                    'money': oform.money,
                    'pay': oform.pay,
                }
                $.ajax({
                    type: 'POST',
                    url: '/addorder',
                    data:d,
                    dataType: 'json',
                    success: function (result) {
                        if(result==1){
                            newthis.sale();
                            newthis.xsblac();
                            newthis.$notify({
                                title: 'add order success!',
                                type: 'success',
                                offset: 300
                            });
                            newthis.orderdlog = false;
                        } else{
                            newthis.$message.error('Im sorry add order error !');
                        }
                    },
                    error: function () {
                        console.log('error submit!!');
                        return false;
                    }
                });


            }).catch(() => {
                newthis.$notify.error({
                    title: '取消删除',
                    message: '取消删除！'
                });
            });
        },
        //新订单
        getorder(id){
            this.orderdlog = true;
            this.ordercid = id;
        },
        //跟进方法
        follow(){
            //获取form表单个项目值
            var addForm = this.formd;

            var newthis = this;
            var d={
                'id':newthis.followid,
                'bz': addForm.bz,
                'balance': addForm.balance,
            }
            var url = '/follow';
            $.ajax({
                type: 'POST',
                url: url,
                data: d,
                dataType: 'json',
                success: function (result) {
                    if (result == 1) {
                        newthis.listData();
                        newthis.$notify({
                            title: 'success',
                            type: 'success',
                            offset: 300
                        });
                        //统计数据
                        var urldata = '/tjdata';
                        $.ajax({
                            type: 'POST',
                            url: urldata,
                            dataType: 'json',
                            success: function (result) {
                                document.getElementById("b").innerText = result.B+'$';
                                document.getElementById("d").innerText = result.D;

                            },
                            error: function () {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                        newthis.gjdialogVisible = false;
                    } else {
                        newthis.$message.error('Im sorry submit error !');
                    }
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //跟进说明
        gj(id){
            //回显数据
            this.gjdialogVisible = true;
            let newthis = this;
            var url = '/selectByid';
            $.ajax({
                type: 'POST',
                url: url,
                data: {'id':id},
                dataType: 'json',
                success: function (result) {
                    newthis.formd.balance = result[0].balance;
                    newthis.formd.bz = result[0].bz;
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
            this.followid = id;



        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
            this.pagesize = size;
            console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage)  //点击第几页
        },
        addclient(){
            this.formc = [];
            this.dialogVisible = true;
        },
        onSubmit(){
            //获取form表单个项目值
            var addForm = this.formc;

            var newthis = this;
            var d={
                'email': addForm.email,
                'sex': addForm.sex,
                'ed': addForm.ed,
                'balance': addForm.balance,
                'phone': addForm.phone,
                'name': addForm.name,
                'address': addForm.address,
                'xydj': addForm.xydj,
                'bz': addForm.bz,
                'zq': addForm.zq,
                'ssxs': addForm.ssxs,
            }
            var url = '/addhtdata';
            $.ajax({
                type: 'POST',
                url: url,
                data: d,
                dataType: 'json',
                success: function (result) {
                    if (result == 1) {
                        newthis.listData();
                        newthis.$notify({
                            title: 'success',
                            type: 'success',
                            offset: 300
                        });
                    } else {
                        newthis.$message.error('Im sorry submit error !');
                    }
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //数据列表
        listData() {
            var newthis = this;
            $.ajax({
                type: 'POST',
                url: '/listdata',
                dataType: 'json',
                success: function (result) {
                    newthis.tableData = result;
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //删除
        rowDelete(val){

            var newthis = this;
            newthis.$confirm('Are you sure delete this?', '', {
                confirmButtonText: 'yes',
                cancelButtonText: 'no',
                type: 'warning'
            }).then(() => {
            $.ajax({
                type: 'POST',
                url: '/delete',
                data:{id:val},
                dataType: 'json',
                success: function (result) {
                    if(result==1){
                        newthis.listData();
                        newthis.$notify({
                            title: 'delete success!',
                            type: 'success',
                            offset: 300
                        });
                    } else{
                        newthis.$message.error('Im sorry delete error !');
                    }
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });


        }).catch(() => {
                newthis.$notify.error({
        title: '取消删除',
        message: '取消删除！'
    });
});

        },
        //导入 excel
        importExcel(){
            let newthis = this;
            //判断files数组的长度是否大于0，不大于0 则未选择附件
            if (this.$refs.upload.uploadFiles.length == 0) {
                newthis.$message({
                    message: '请选择需要上传的文件',
                    type: 'error'
                });
                newthis.up = true;
                return false;
            }
            var name = this.$refs.upload.uploadFiles[0].name;
            var index = name.lastIndexOf(".")
            var res = name.substring(index, name.length);
            if (res!=".xlsx" && res!=".xls" ) {
                newthis.$message({
                    message: '该文件非Excel文件,或后缀非xlsx',
                    type: 'error'
                });
                return false;
            }
            this.$refs.upload.submit();
            this.listData();

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },

        //打开并获得数据 跟进详情
        gjxq(row, column, cell, event){
            this.gjtetail = true;
            let newthis = this;
            $.ajax({
                type: 'POST',
                url: '/detail',
                data:{id:row.id},
                dataType: 'json',
                success: function (result) {
                    newthis.tableDatafollow = result;
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        sale(){

            var f = this.formorder;

            let newthis = this;
            var d={
                'date': f.date,
                'ssxs': f.ssxs
            }
            debugger
            $.ajax({
                type: 'POST',
                url: '/getxsdate',
                data:d,
                dataType: 'json',
                success: function (result) {
                    var chartDom = document.getElementById('sa');
                    var myChart = echarts.init(chartDom);
                    var option;

                    const colors = ['#5470C6', '#91CC75', '#EE6666'];
                    option = {
                        color: colors,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        grid: {
                            right: '20%'
                        },
                        toolbox: {
                            feature: {
                                dataView: { show: true, readOnly: false },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        legend: {
                            data: ['Sales', 'Balance', 'Number of orders']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true
                                },
                                // prettier-ignore
                                data: result[0]
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: 'Sales',
                                position: 'right',
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: colors[0]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value} $'
                                }
                            },
                            {
                                type: 'value',
                                name: 'Balance',
                                position: 'right',
                                offset: 80,
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: colors[1]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value} $'
                                }
                            },
                            {
                                type: 'value',
                                name: 'Number of orders',
                                position: 'left',
                                alignTicks: true,
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: colors[2]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value}/次'
                                }
                            }
                        ],
                        series: [
                            {
                                name: 'Sales',
                                type: 'bar',
                                data: result[1]
                            },
                            {
                                name: 'Balance',
                                type: 'bar',
                                yAxisIndex: 1,
                                data: result[2]
                            },
                            {
                                name: 'Number of orders',
                                type: 'line',
                                yAxisIndex: 2,
                                data: result[3]
                            }
                        ]
                    };

                    myChart.setOption(option);

                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });


        },
        xsblac(){
            var f = this.formorder;
            var d={
                'date': f.date,
                'ssxs': f.ssxs
            }

            var url = '/xsqk';
            $.ajax({
                type: 'POST',
                url: url,
                data: d,
                dataType: 'json',
                success: function (result) {
                    if (result[0]==null){
                        // document.getElementById("qk").innerText="00";
                        document.getElementById("xse").innerText="00";
                    } else {
                        // document.getElementById("qk").innerText=result[0].balance;
                        document.getElementById("xse").innerText=result[0].sales;
                    }

                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        Searchd(){
            this.sale();
            this.xsblac();
        },
        OrderDetail(id){
            this.ordersdetail = true;
            let newthis = this;
            var url = '/selectOrderByCid';
            $.ajax({
                type: 'POST',
                url: url,
                data: {'id':id},
                dataType: 'json',
                success: function (result) {
                    newthis.tableDataorder=result;
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //热力图
        rlt(){
            var url = '/rltjk';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function (result) {

                    var chartDom = document.getElementById('rlt');
                    var myChart = echarts.init(chartDom);
                    var option;

                    function getVirtualData(year) {
                        const date = +echarts.time.parse(year + '-01-01');
                        const end = +echarts.time.parse(+year + 1 + '-01-01');
                        const dayTime = 3600 * 24 * 1000;
                        const data = [
                        ];
                        for(var i=0;i<result.length;i++){
                            data.push(result[i]);
                        }
                        return data;
                    }
                    option = {
                        title: {
                            top: 30,
                            left: 'center',
                            text: '年度销售热力图'
                        },
                        tooltip: {},
                        visualMap: {
                            min: 0,
                            max: 1000000,
                            type: 'piecewise',
                            orient: 'horizontal',
                            left: 'center',
                            top: 65
                        },
                        calendar: {
                            top: 120,
                            left: 30,
                            right: 30,
                            cellSize: ['auto', 13],
                            range: '2024',
                            itemStyle: {
                                borderWidth: 0.5
                            },
                            yearLabel: { show: false }
                        },
                        series: {
                            type: 'heatmap',
                            coordinateSystem: 'calendar',
                            data: getVirtualData('2024')
                        }
                    };

                    myChart.setOption(option);

                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });



        },
    }
})