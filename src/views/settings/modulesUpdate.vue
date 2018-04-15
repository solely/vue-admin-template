<template>
    <div>

        <Table :columns="columns1" :data="modulesData"></Table>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                modulesData: [],
                columns1: [
                    {
                        title: '模块名',
                        key: 'module_name'
                    }, {
                        title: '描述',
                        key: 'description',
                    }, {
                        title: '版本',
                        key: 'version',
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h,params)=> {
                            if (params.row.next !== null) {
                                return h('div',[
                                    h('Button',{
                                        props:{
                                            type:'info',
                                        },
                                        on:{
                                            click:()=>{
                                                this.update(params.row.module_name,params.index)
                                            }
                                        }
                                    },'可升级至'+params.row.next.version+'版本')
                                ]);
                            }
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                    },
                                }, '最新版本'),
                            ]);
                        },
                    }
                ],
            }
        },
        activated(){
            global.$fn.$get('/system/modulesUpdate.html', (data, cache) => {
                console.log(data);
                if (data.status == 0) {

                    this.modulesData = data.data;
                } else {
                    this.$Modal.error({
                        title: '提示',
                        content: '你无权访问！',
                    });
                }
            }, false);
        },
        methods: {
            update(module_name, index){
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定升级？',
                    loading: true,
                    onOk: () => {
                        global.$fn.$post('/system/update.html', {module_name: module_name}, (data, cache) => {
                            console.log(data);
                            let self = this;
                            global.$fn.informatique(data, () => {
                                self.$Modal.success({
                                    title: '提示',
                                    content: '升级成功',
                                })
                                setTimeout(() => {
                                    self.$Modal.remove();
                                    self.modulesData.splice(index, 1, data.data);
                                }, 2000);
                            }, self);
                        }, false);
                    }
                });
            },
            getModulesData(){

            },
        }
    }
</script>