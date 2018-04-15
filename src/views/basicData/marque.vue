<style scoped>
    #addModal {
        width: 300px;
        height: auto;
        position: fixed;
        top: 150px;
        right: 38%;
        z-index: 1989;
        background-color: white;
        padding: 20px;
    }

    #layerModal {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #000000;
        opacity: 0.3;
        z-index: 1988;
    }
</style>
<template>
    <div>
        <Button type="info" icon="plus" @click="addCategory">添加品牌</Button>
        <div style="height:20px;"></div>
        <Table :columns="columns1" :data="listData" border></Table>
        <div id="layerModal" v-if="isModalShow" @click="layerModalClick"></div>
        <div id="addModal" v-if="isAdd">
            <Form :model="formItem" :label-width="80">
                <Form-item label="品牌名称">
                    <Input v-model="formItem.input" placeholder="请输入标签"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="submitAddCategory(formItem)">保存</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="layerModalClick">取消</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                columns1: [
                    {
                        title: '品牌名称',
                        key: 'marque_name',
                    }, {
                        title: '操作',
                        key: 'action',
                        render:(h,params)=>{
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                    },
                                    on: {
                                        click:()=>{
                                            this.del(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [],
                formItem: {
                    input: '',
                    id: 0,
                },
                isAdd: false,
                isModalShow: false,
            }
        },
        activated(){
            let self = this;
            global.$fn.$get('/basicData/marque/marqueList.html', (data, cache) => {
                console.log(data);
                global.$fn.informatique(data, () => {
                    self.listData = data.data;
                }, self);
            }, false);
        },
        computed: {},
        methods: {
            addCategory(){
                this.formItem = {
                    input:'',
                    id:0,
                }
                this.isAdd = !this.isAdd;
                this.isModalShow = !this.isModalShow;
            },
            layerModalClick(){
                this.isAdd = false;
                this.isModalShow = false;
            },
            submitAddCategory(name){
                console.log(name);
                global.$fn.$post('/basicData/marque/add.html', {
                    marque_name: name.input,
                    id: name.id
                }, (data, cache) => {
                    console.log(data);
                    this.$Message.success(data.message);
                    this.getListData();
                });
            },
            edit(index){
                let currentData = this.listData[index];
                console.log(currentData);
                this.isAdd = true;
                this.isModalShow = true;
                this.formItem = {
                    input: currentData.marque_name,
                    id: parseInt(currentData.id),
                };
            },
            del(index){
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定删除此品牌？',
                    onOk: () => {
                        global.$fn.$post('/basicData/marque/del.html', {id: this.listData[index].id}, (data) => {
                            let self = this;

                            global.$fn.informatique(data, () => {
                                self.$Modal.success({
                                    title: '提示',
                                    content: data.message,
                                })
                                self.listData.splice(index,1);
                            }, self);
                        });
                    }
                });
            },
            getListData(){
                let self = this;
                global.$fn.$get('/basicData/marque/marqueList.html', (data, cache) => {
                    global.$fn.informatique(data, () => {
                        self.listData = data.data;
                    }, self);
                }, false);
            }
        },
        watch: {},
        mounted(){
        }
    }
</script>