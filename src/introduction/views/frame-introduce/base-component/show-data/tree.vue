<template>
    <show-config-code :code="codeCreate">
        <p>此处为可能用到的树的类型或功能，完整API请参考
            <el-link
                    href="https://element.eleme.cn/#/zh-CN/component/tree"
                    target="_blank"
                    type="primary"
                    :underline="false">
                element-ui官方网站<i class="el-icon-view el-icon--right"></i>
            </el-link>
            <span style="font-size: 12px; padding-left: 10px;color: #E65D6E;">( 注：官方还提供 节点操作 等功能,此页面暂时无法配置 )</span>
        </p>

        <template v-slot:show>
            <el-input
                    v-show="paramForm.filter"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            <el-tree
                    ref="tree"
                    :data="treeData"
                    highlight-current
                    accordion
                    :expand-on-click-node="false"
                    :filter-node-method="filterNode"
                    :show-checkbox="paramForm.showCheckbox"
                    :draggable="paramForm.draggable"
                    @node-click="handleNodeClick"
            ></el-tree>
        </template>

        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="100px"
                    style="padding: 0 10px;">
                <el-form-item label="数据源类型">
                    <el-select v-model="paramForm.dataType" placeholder="请选择数据源">
                        <el-option
                                v-for="(type, index) in dataTypeArray"
                                :key="index"
                                :label="type.name"
                                :value="type.type"></el-option>
                    </el-select>
                    <el-button type="info" round @click="showDataSource = true">查看数据源</el-button>
                </el-form-item>
                <el-form-item label="节点过滤">
                    <el-switch v-model="paramForm.filter"></el-switch>
                </el-form-item>
                <el-form-item label="节点可选">
                    <el-switch v-model="paramForm.showCheckbox"></el-switch>
                </el-form-item>
                <el-form-item label="节点拖拽">
                    <el-switch v-model="paramForm.draggable"></el-switch>
                </el-form-item>
                <el-divider>此页面不展示，请复制代码测试</el-divider>
                <el-form-item label="懒加载模式">
                    <el-switch v-model="paramForm.lazy"></el-switch>
                </el-form-item>
            </el-form>
        </template>

        <sf-dialog
                v-model="showDataSource"
                title="数据类型"
                draggable
                footer-hide>
            <vue-code-mirror :code="JSON.stringify(dataSource, null, 2)"></vue-code-mirror>
        </sf-dialog>
    </show-config-code>
</template>

<script>
    /* eslint-disable */
    import ShowConfigCode from '../ShowConfigCode.vue';
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    import DealMultData from '#/utils/tree/deal-mult-data'
    import DealNestData from '#/utils/tree/deal-nest-data'
    import DealRecursionData from '#/utils/tree/deal-recursion-data'

    /* 测试数据 */
    import MultData from '@/introduction/test-data/tree/mult-data';//多级表
    import NestData from '@/introduction/test-data/tree/nest-data';//主键嵌套
    import RecursionData from '@/introduction/test-data/tree/recursion-data';//单表递归

    export default{
        components:{
            ShowConfigCode,
            VueCodeMirror
        },
        data(){
            return {
                data: [
                    {
                        nodeKey: 1,
                        label: '一级 1'
                    }, {
                        nodeKey: 2,
                        label: '一级 2',
                        children: [{
                            nodeKey: 4,
                            label: '二级 2-1'
                        }, {
                            nodeKey: 3,
                            label: '二级 2-2',
                            children: [{
                                nodeKey: 5,
                                label: '三级 2-2-1'
                            }]
                        }]
                    }
                ],
                multData: DealMultData({
                    data: MultData,
                    tableNames: ['hospitalList', 'deptList', 'groupList', 'personList'],
                    key:['hospitalId','deptId','groupId','personId'],
                    parentKey: ['','hospitalId','deptId','groupId'],
                    label: ['hospitalName','deptName','groupName','personName']
                }),
                nestData: DealNestData({
                    data: NestData,
                    key: 'classCode',
                    label: 'className'
                }),
                recursionData: DealRecursionData({
                    data: RecursionData,
                    key: 'nodeId',
                    label: 'nodeName',
                    parentKey: 'parentId'
                }),
                dataTypeArray: [
                    {
                        type: 'original',
                        name: '原始型'
                    },
                    {
                        type: 'recursion',
                        name: '单表递归型'
                    },
                    {
                        type: 'nest',
                        name: '主键嵌套型'
                    },
                    {
                        type: 'mult',
                        name: '多级表型'
                    }
                ],
                paramForm: {
                    dataType: 'original',
                    filter: false,
                    showCheckbox: false,
                    draggable: false,
                    lazy: false
                },
                showDataSource: false,
                filterText: ''
            }
        },
        computed:{
            treeData(){
                if(this.paramForm.dataType === 'original'){
                    return this.data;
                }else if(this.paramForm.dataType === 'mult'){
                    return this.multData;
                }else if(this.paramForm.dataType === 'nest'){
                    return this.nestData;
                }else{
                    return this.recursionData;
                }
            },
            dataSource(){
                if(this.paramForm.dataType === 'original'){
                    return this.data;
                }else if(this.paramForm.dataType === 'mult'){
                    return MultData;
                }else if(this.paramForm.dataType === 'nest'){
                    return NestData;
                }else{
                    return RecursionData;
                }
            },
            codeCreate(){
                return `<template>${
                    this.paramForm.filter ? `
    <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
    </el-input>` : ''
                    }
    <el-tree${
            this.paramForm.filter ? `
        ref="tree"`:''
            }${
            !this.paramForm.lazy ? `
        :data="data"${
            this.paramForm.dataType === 'original' ? `
        :props="treeProps"`:''
            }` : `
        :load="loadNode"
        lazy`
            }
        :expand-on-click-node="false"
        highlight-current
        accordion
        @node-click="handleNodeClick"${
            this.paramForm.filter ? '\n\t\t:filter-node-method="filterNode"' : ''
        }${
            this.paramForm.showCheckbox ? `
        show-checkbox
        node-key="nodeKey"
        :default-expanded-keys="[1, 2]"
        :default-checked-keys="[3]"` : ''
        }${
            this.paramForm.draggable ? '\n\t\tdraggable' : ''
        }
    ></el-tree>
</template>
<script>${this.paramForm.dataType === 'mult' ? `\n\timport DealMultData from '#/utils/tree/deal-mult-data'\n` : (
            this.paramForm.dataType === 'nest' ? `\n\timport DealNestData from '#/utils/tree/deal-nest-data'\n` : (
            this.paramForm.dataType === 'recursion' ? `\n\timport DealRecursionData from '#/utils/tree/deal-recursion-data'\n` : ''
        )
        )}
    export default{
        data(){
            return {${
                    !this.paramForm.lazy ? `
                data: ${this.paramForm.dataType === 'original' ? 'DataSource' : (
                        this.paramForm.dataType === 'mult' ? `DealMultData({
                    data: DataSource,
                    tableNames: ['hospitalList', 'deptList', 'groupList', 'personList'],
                    key: ['hospitalId','deptId','groupId','personId'],
                    parentKey: ['','hospitalId','deptId','groupId'],
                    label: ['hospitalName','deptName','groupName','personName']
                })` : (
                            this.paramForm.dataType === 'nest' ? `DealNestData({
                    data: DataSource,
                    key: 'classCode',
                    label: 'className'
                })` : `DealRecursionData({
                    data: DataSource,
                    key: 'nodeId',
                    label: 'nodeName',
                    parentKey: 'parentId'
                })`
                        )
                    )}, //具体数据源格式(DataSource)请查看[查看数据源]按钮${
                        this.paramForm.dataType === 'original' ? `
                treeProps: {
                  children: 'children',
                  label: 'label'
                },`:''
                        }` : ''
                    }${
                    this.paramForm.filter ? `
                filterText: '',` : ''
                    }
            }
        },${
            this.paramForm.filter ? `
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },`:''
            }
        methods: {
            handleNodeClick(data) {
                console.log(data);
            }${
                this.paramForm.filter ? `,
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }` : ''
                }${
                this.paramForm.lazy ? `
            loadNode(node, resolve) {
                if (node.level === 0) {
                  return resolve([{ label: 'region' }]);
                }
                if (node.level > 1) return resolve([]);

                setTimeout(() => {
                  const data = [{
                    label: 'leaf',
                    leaf: true
                  }, {
                    label: 'zone'
                  }];

                  resolve(data);
                }, 500);
            }`:''
                }${
                this.paramForm.showCheckbox ? `
            //this.$refs.tree.getCheckedNodes()
            //this.$refs.tree.getCheckedKeys()
            /*this.$refs.tree.setCheckedNodes([{
                nodeKey: 1,
                label: '二级 2-1'
            }, {
                nodeKey: 2,
                label: '三级 1-1-1'
            }]);*/
            //this.$refs.tree.setCheckedKeys([3]);` : ''
                }
        }
    }
<\/script>`;
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                // eslint-disable-next-line
                console.log(data);
            }
        }
    }
</script>