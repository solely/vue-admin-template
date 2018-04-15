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
        <Button type="info" icon="plus" @click="addCategory">添加分类</Button>
        <div style="height:20px;"></div>
        <Table :columns="columns1" :data="listData" border></Table>
        <div id="layerModal" v-if="isModalShow" @click="layerModalClick"></div>
        <div id="addModal" v-if="isAdd">
            <Form :model="formItem" :label-width="80">
                <Form-item label="类目名称">
                    <Input v-model="formItem.input" placeholder="请输入类目"></Input>
                </Form-item>
                <Form-item label="排序">
                    <Input-number :max="1000" :min="1" v-model="formItem.sortNormal"></Input-number>
                </Form-item>
                <Form-item label="层级归属">
                    <Cascader :data="levelData" v-model="formItem.level" change-on-select></Cascader>
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
                self: this,
                columns1: [
                    {
                        title:'id',
                        key:'id',
                    },
                    {
                        title: '排序',
                        key: 'sort',
                        render:(h, params)=>{
                            let m = (params.row.level - 1) * 20 + 'px';

                            return h('div', [
                                h('Input', {
                                    props: {
                                        type: 'text',
                                        placeholder: '排序值',
                                        value: params.row.sort,
                                    },
                                    style: {
                                        width: '10%',
                                        marginLeft: m
                                    },
                                    class: 'change-sort',
                                    attrs: {
                                        'data-id': params.row.id
                                    },
                                    on: {
                                        change: () => {
                                        },
                                        click: () => {
                                        }
                                    }
                                })
                            ]);
                        }
                    }, {
                        title: '分类名称',
                        key: 'category_name',
                    }, {
                        title: '操作',
                        key: 'action',
                        render:(h, params)=>{
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
                    sortNormal: 1,
                    level: [],
                    id: 0,
                },
                isAdd: false,
                isModalShow: false,
                levelData: [],
                changeSort: 'change-sort'
            }
        },
        activated(){
            let self = this;
            global.$fn.$get('/basicData/category/categoryList.html', (data, cache) => {
                console.log(data);
                global.$fn.informatique(data, () => {
                    self.listData = data.data;
                }, self);
            }, false);
            setTimeout(() => {
                $('.change-sort').change(function () {
                    let id = parseInt($(this).data('id'));
                    let sort = parseInt($(this).find('input').val());
                    global.$fn.$post('/basicData/category/updateSort.html', {id: id, sort: sort}, (data) => {
                        global.$fn.informatique(data, () => {
                            self.$Message.success(data.message);
                        }, self);
                    });
                });
            }, 3000);
        },
        computed: {},
        methods: {
            addCategory(){
                this.isAdd = !this.isAdd;
                this.isModalShow = !this.isModalShow;
                this.getLevelData();
            },
            layerModalClick(){
                this.isAdd = false;
                this.isModalShow = false;
            },
            submitAddCategory(name){
                console.log(name);
                global.$fn.$post('/basicData/category/add.html', {
                    category_name: name.input,
                    level: name.level,
                    sort: name.sortNormal,
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
                this.getLevelData();
                this.formItem = {
                    input: currentData.category_name,
                    sortNormal: parseInt(currentData.sort),
                    level: (currentData.path + ',' + currentData.id).split(','),
                    id: parseInt(currentData.id),
                };
            },
            getLevelData(){
                //置空表单
                this.formItem = {
                    input: '',
                    sortNormal: 1,
                    level: [],
                    id: 0,
                }
                global.$fn.$get('/basicData/category/levelData.html', (data, cache) => {
                    console.log(data);
                    let self = this;
                    global.$fn.informatique(data, () => {
                        self.levelData = data.data;
                    }, self);
                }, false);
            },
            del(index){
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定删除此条类目？',
                    onOk: () => {
                        global.$fn.$post('/basicData/category/del.html', {id: this.listData[index].id}, (data) => {
                            let self = this;

                            global.$fn.informatique(data, () => {
                                self.$Modal.success({
                                    title: '提示',
                                    content: data.message,
                                })
                                setTimeout(() => {
                                    self.getListData();
                                }, 1000)
                            }, self);
                        });
                    }
                });
            },
            getListData(){
                let self = this;
                global.$fn.$get('/basicData/category/categoryList.html', (data, cache) => {
                    global.$fn.informatique(data, () => {
                        self.listData = data.data;
                    }, self);
                }, false);
            },
        },
        watch: {},
        mounted(){
        }
    }
</script>