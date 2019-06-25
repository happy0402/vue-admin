/**
 * Created by tx on 2019/6/21.
 */
export default {
    "hospitalList": [
        {
            "hospitalId": 1,
            "hospitalName": "温附一",
            "hospitalRemark": "温一医院"
        }, {
            "hospitalId": 2,
            "hospitalName": "温附二",
            "hospitalRemark": "温二医院"
        }, {
            "hospitalId": 3,
            "hospitalName": "温附三",
            "hospitalRemark": "温三医院"
        }
    ],
    "deptList": [
        {
            "deptId": 1,
            "hospitalId": 1,
            "deptName": "部门11",
            "deptRemark": "温一医院部门1"
        }, {
            "deptId": 2,
            "hospitalId": 1,
            "deptName": "部门12",
            "deptRemark": "温一医院部门2"
        }, {
            "deptId": 3,
            "hospitalId": 1,
            "deptName": "部门13",
            "deptRemark": "温一医院部门3"
        }, {
            "deptId": 4,
            "hospitalId": 2,
            "deptName": "部门21",
            "deptRemark": "温二医院部门1"
        }, {
            "deptId": 5,
            "hospitalId": 2,
            "deptName": "部门22",
            "deptRemark": "温二医院部门2"
        }, {
            "deptId": 6,
            "hospitalId": 3,
            "deptName": "部门31",
            "deptRemark": "温三医院部门1"
        }, {
            "deptId": 7,
            "hospitalId": 3,
            "deptName": "部门32",
            "deptRemark": "温三医院部门2"
        }
    ],
    "groupList": [
        {
            "groupId": 1,
            "deptId": 1,
            "groupName": "组11",
            "groupRemark": "部门11组1"
        }, {
            "groupId": 2,
            "deptId": 1,
            "groupName": "组12",
            "groupRemark": "部门11组2"
        }, {
            "groupId": 3,
            "deptId": 4,
            "groupName": "组41",
            "groupRemark": "部门21组1"
        }, {
            "groupId": 4,
            "deptId": 5,
            "groupName": "组51",
            "groupRemark": "部门22组1"
        }
    ],
    "personList": [
        {
            "personId": 1,
            "groupId": 3,
            "personName": "小明",
            "personRemark": "组41小明"
        }, {
            "personId": 2,
            "groupId": 3,
            "personName": "小张",
            "personRemark": "组41小张"
        }, {
            "personId": 3,
            "groupId": 3,
            "personName": "小红",
            "personRemark": "组41小红"
        }, {
            "personId": 4,
            "groupId": 3,
            "personName": "小陈",
            "personRemark": "组41小陈"
        }
    ]
}