<template>
<div class="userinf p-3 bg-white rounded">
    <div class="flex-between" v-if="!editorInf">
        <div class="flex-grow-1">
            <div class="font-weight-bold mb-2 h5">
                时分雨
                <Icon custom="fas fa-mars" />
            </div>
            <Row type="flex" class="small">
                <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                <span class="text-success mr-2">住址:</span>阿斯顿发生阿斯蒂芬
                </Col>
                <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                <span class="text-success mr-2">签名:</span>一条侧躺的咸鱼
                </Col>
            </Row>
        </div>
        <div class="userinf-right flex-shrink-0 text-center">
            <div class="p-5 rounded-circle d-inline-block" :style="{background:`url('${userInfo.icon}') center / cover`}"></div>
            <Button type="success" class="my-2" long size="small" @click="editorInf = true">编辑</Button>
        </div>
    </div>

    <div class="text-left" v-if="editorInf">
        <div class="font-weight-bold mb-2 h6">修改个人信息</div>
        <Row type='flex' :gutter="16">
            <Col span="12" :md="{span:12}" :xs="{span:24}">
            <div class="my-2">昵称</div>
            <Input v-model="value" placeholder="昵称" />
            </Col>
            <Col span="12" :md="{span:12}" :xs="{span:24}">
            <div class="my-2">性别</div>
            <RadioGroup class="my-1">
                <Radio label="男" border></Radio>
                <Radio label="女" border></Radio>
                <Radio label="未知" border></Radio>
            </RadioGroup>
            </Col>
            <Col span="12" :md="{span:12}" :xs="{span:24}">
            <div class="my-2">签名</div>
            <Input v-model="value" placeholder="签名" />
            </Col>
            <Col span="12" :md="{span:12}" :xs="{span:24}">
            <div class="my-2">住址</div>
            <Input v-model="value" placeholder="住址" />
            </Col>
        </Row>
        <div class="text-right mt-2">
            <Button type="warning" @click="editorInf = false">取消</Button>
            <Button type="success">确认</Button>
        </div>
    </div>

    <div class="my-2">
        <div class="userinf-Item-head font-weight-bold mb-2 h6">基本信息</div>
        <div class="flex-between">
            <div class="flex-grow-1">
                <Row type="flex" class="small">
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">用户UID:</span>{{ userInfo.userID }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">用户等级:</span>{{ userInfo.level }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">上次登录:</span>{{ userInfo.lastLoginTime }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">上次登录IP:</span>{{ userInfo.lastLoginIP }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">注册使用IP:</span>{{ userInfo.logonIP }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">注册日期:</span>{{ userInfo.logonTime }}
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">留言总数:</span>000
                    </Col>
                    <Col class="mb-2" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                    <span class="text-success mr-2">浏览总数:</span>000
                    </Col>
                </Row>
            </div>
            <div class="userinf-right flex-shrink-0 text-center">
            </div>
        </div>

    </div>

</div>
</template>

<script>
export default {
    meta: {
        title: '用户信息',
    },
    data() {
        return {
            editorInf: false,
            userInfo: {
                name: 'XIAOHUOHU', // 昵称
                icon: require('~/assets/image/userIcon.jpg'), // 头像
                signature: '一条侧躺的咸鱼)', // 个性签名
                gender: 'man/woman/other', // 性别
                level: 'lv6', // 等级
                lastLoginTime: '2020-09-12 12:09.00', // 上次登录时间
                // isCanlogin: true, // 能否登录
                // isCanSendMessage: true, // 能否发送消息
                lastLoginIP: '192.168.1.1', // 上次登陆 IP
                logonIP: '192.168.1.1', // 注册IP
                logonTime: '2020-09-12 12:09.00', // 注册时间
                userID: '10222212', // 用户ID
            },
        }
    },
}
</script>

<style lang="less">
.userinf-Item-head {
    border-left: 3px solid teal;
    padding-left: 0.5rem;
}

.userinf-right {
    width: 8rem;
}
</style>
