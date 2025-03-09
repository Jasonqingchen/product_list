new Vue({
    el: '#app',
    data() {
        return {
            tableData:[],
            fileList:[],
            form:{
                pname:'',
                price:'',
                purl:'',
                ptype:'',
                detail:'',
                id:''
            },
        }
    },

//初始化
    mounted: function () {
        this.listData();

    },
    //方法事件
    methods: {
        //删除
        handleDelete(val){
            var newthis = this;
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleChange(file, fileList){
            this.form.pname = file.name;
            this.form.purl = "http://8.134.191.139:8080/image/"+file.name;
            console.log(file);
        },
        onSubmit(){
            var addForm = this.form;
            if (this.form.pname==null || this.form.pname ==""){
                this.$notify.error({
                    title: 'picture not upload ',
                    offset: 300
                });
                return;
            }



            var newthis = this;
            var d={
                'purl': addForm.purl,
                'pname': addForm.pname,
                'detail': addForm.detail,
                'ptype': addForm.ptype,
                'price': addForm.price,
                'id': addForm.id,
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
                        newthis.$refs.upload.submit();
                    } else {
                        newthis.$message.error('Im sorry submit error !');
                    }
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });

        }

    }
})