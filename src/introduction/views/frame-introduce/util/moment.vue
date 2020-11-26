<template>
    <div>
        <p style="margin-bottom: 10px;">
            此处配置为常用配置,所有配置请查看
            <el-link
                    href="http://momentjs.cn/docs/#/parsing/"
                    target="_blank"
                    type="primary"
                    :underline="false">
                Moment.js官方网站<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>
        <el-tabs tab-position="left">
            <el-tab-pane lazy label="解析">
                <el-row>
                    <el-col>
                        <h4>
                            当前时间 ：{{ $util.moment() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="now"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            字符串 ：{{ $util.moment("1970-01-01 09:30:26.123") }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="stringAnalyze"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4 style="color: #E65D6E;">
                            字符串 + 格式 ：{{ $util.moment("01-01-1970 09:30:26", "MM-DD-YYYY HH:mm:ss") }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="stringFormatAnalyze"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            字符串 + 多个格式 ：{{ $util.moment("01-01-1970 09:30:26", ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]) }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="stringFormatsAnalyze"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            是否为有效的日期时间 ：{{ $util.moment("1970-01-01 09:30:26.123").isValid() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="isValidAnalyze"></vue-code-mirror>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane lazy label="操作">
                <el-row>
                    <el-col :span="12">
                        <el-row>
                            <el-col>
                                <h4>
                                    加法 ：{{ $util.moment().add(7, 'days').add(1, 'h') }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="addOperate"></vue-code-mirror>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4>
                                    减法 ：{{ $util.moment().subtract(7, 'days').subtract(1, "h") }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="subtractOperate"></vue-code-mirror>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4>
                                    差值 ：{{ $util.moment().diff( $util.moment('1995-04-02'), 'years') }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="diffOperate"></vue-code-mirror>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Key</th>
                                    <th>Shorthand</th>
                                </tr>
                                <tr>
                                    <td>years</td>
                                    <td>y</td>
                                </tr>
                                <tr>
                                    <td>quarters</td>
                                    <td>Q</td>
                                </tr>
                                <tr>
                                    <td>months</td>
                                    <td>M</td>
                                </tr>
                                <tr>
                                    <td>weeks</td>
                                    <td>w</td>
                                </tr>
                                <tr>
                                    <td>days</td>
                                    <td>d</td>
                                </tr>
                                <tr>
                                    <td>hours</td>
                                    <td>h</td>
                                </tr>
                                <tr>
                                    <td>minutes</td>
                                    <td>m</td>
                                </tr>
                                <tr>
                                    <td>seconds</td>
                                    <td>s</td>
                                </tr>
                                <tr>
                                    <td>milliseconds</td>
                                    <td>ms</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-row>
                            <el-col>
                                <h4>
                                    开始时间 ：{{ $util.moment().startOf('year') }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="startOfOperate"></vue-code-mirror>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4>
                                    结束时间 ：{{ $util.moment().endOf('month') }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="endOfOperate"></vue-code-mirror>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Key</th>
                                    <th>Mean</th>
                                </tr>
                                <tr>
                                    <td>year</td>
                                    <td>setting the start/end time of this year.</td>
                                </tr>
                                <tr>
                                    <td>quarter</td>
                                    <td>setting the start/end time of this quarter.</td>
                                </tr>
                                <tr>
                                    <td>month</td>
                                    <td>setting the start/end time of this month.</td>
                                </tr>
                                <tr>
                                    <td>week</td>
                                    <td>setting the start/end time of this week.</td>
                                </tr>
                                <tr>
                                    <td>isoWeek</td>
                                    <td>setting the start/end time of this isoWeek.</td>
                                </tr>
                                <tr>
                                    <td>day</td>
                                    <td>setting the start/end time of this day.</td>
                                </tr>
                                <tr>
                                    <td>hour</td>
                                    <td>setting the start/end time of this hour.</td>
                                </tr>
                                <tr>
                                    <td>minute</td>
                                    <td>setting the start/end time of this minute.</td>
                                </tr>
                                <tr>
                                    <td>second</td>
                                    <td>setting the start/end time of this second.</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane lazy label="显示">
                <el-row>
                    <el-col :span="12">
                        <el-row>
                            <el-col>
                                <h4>
                                    格式化 ：{{ $util.moment().format('YYYY/MM/DD HH:mm:ss') }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="format"></vue-code-mirror>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4 style="color: #E65D6E;">
                                    根据其区域设置对时间进行格式化(请参考右表) ：{{ $util.moment().format("L LTS") }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="formatByExpress"></vue-code-mirror>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4>
                                    转义字符 ：{{ $util.moment().format('[today] dddd') }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="formatBySpecial"></vue-code-mirror>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Key</th>
                                    <th>Result</th>
                                </tr>
                                <tr>
                                    <td>LT</td>
                                    <td>{{ $util.moment().format('LT') }}</td>
                                </tr>
                                <tr>
                                    <td>LTS</td>
                                    <td>{{ $util.moment().format('LTS') }}</td>
                                </tr>
                                <tr>
                                    <td>L</td>
                                    <td>{{ $util.moment().format('L') }}</td>
                                </tr>
                                <tr>
                                    <td>l</td>
                                    <td>{{ $util.moment().format('l') }}</td>
                                </tr>
                                <tr>
                                    <td>LL</td>
                                    <td>{{ $util.moment().format('LL') }}</td>
                                </tr>
                                <tr>
                                    <td>ll</td>
                                    <td>{{ $util.moment().format('ll') }}</td>
                                </tr>
                                <tr>
                                    <td>LLL</td>
                                    <td>{{ $util.moment().format('LLL') }}</td>
                                </tr>
                                <tr>
                                    <td>lll</td>
                                    <td>{{ $util.moment().format('lll') }}</td>
                                </tr>
                                <tr>
                                    <td>LLLL</td>
                                    <td>{{ $util.moment().format('LLLL') }}</td>
                                </tr>
                                <tr>
                                    <td>llll</td>
                                    <td>{{ $util.moment().format('llll') }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-row class="contentTitle">
                            <el-col>
                                <span style="position: absolute;"> 时差:</span>
                                <div style="margin-left: 40px;">
                                    <p>
                                        moment().from(Moment|String|Number|Date|Array, Boolean);
                                    </p>
                                    <p>
                                        @param Boolean  默认为 false：带后缀的值; true: 不带后缀的值
                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4>
                                    a.fromNow() : 相对于 现在 ，a 是 {{ $util.moment().add(20, "seconds").fromNow() }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="fromNow"></vue-code-mirror>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4>
                                    a.from(b) : 相对于 b ，a 是 {{ $util.moment().subtract(40, "seconds").from($util.moment().subtract(20, "seconds")) }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="from"></vue-code-mirror>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4>
                                    a.toNow() : 相对于 a ，现在 是 {{ $util.moment().add(20, "seconds").toNow() }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="toNow"></vue-code-mirror>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <h4>
                                    a.to(b) : 相对于 a ，b 是 {{ $util.moment().subtract(40, "seconds").to($util.moment().subtract(20, "seconds")) }}
                                </h4>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <vue-code-mirror v-model="to"></vue-code-mirror>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Range</th>
                                    <th>From</th>
                                    <th>To</th>
                                </tr>
                                <tr>
                                    <td>0 to 45 seconds</td>
                                    <td>{{ $util.moment().subtract(20, 'seconds').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(20, 'seconds').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>45 to 90 seconds</td>
                                    <td>{{ $util.moment().subtract(70, 'seconds').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(70, 'seconds').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>90 seconds to 45 minutes</td>
                                    <td>{{ $util.moment().subtract(25, 'minutes').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(25, 'minutes').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>45 to 90 minutes</td>
                                    <td>{{ $util.moment().subtract(75, 'minutes').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(75, 'minutes').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>90 minutes to 22 hours </td>
                                    <td>{{ $util.moment().subtract(11, 'hours').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(11, 'hours').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>22 to 36 hours</td>
                                    <td>{{ $util.moment().subtract(29, 'hours').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(29, 'hours').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>36 hours to 25 days</td>
                                    <td>{{ $util.moment().subtract(12, 'days').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(12, 'days').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>25 to 45 days</td>
                                    <td>{{ $util.moment().subtract(35, 'days').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(35, 'days').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>45 to 345 days</td>
                                    <td>{{ $util.moment().subtract(195, 'days').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(195, 'days').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>345 to 545 days (1.5 years)</td>
                                    <td>{{ $util.moment().subtract(445, 'days').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(445, 'days').toNow() }}</td>
                                </tr>
                                <tr>
                                    <td>546 days+</td>
                                    <td>{{ $util.moment().subtract(600, 'days').fromNow() }}</td>
                                    <td>{{ $util.moment().subtract(600, 'days').toNow() }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <h4>
                            获取时间戳（单位：秒） : {{ $util.moment().unix() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="getUnix"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            获取本月天数 : {{ $util.moment().daysInMonth() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="daysInMonth"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            时间转 Date 对象 : {{ $util.moment().toDate() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="toDate"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            时间转数组 : {{ $util.moment().toArray() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="toArray"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            时间转JSON : {{ $util.moment().toJSON() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="toJSON"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            时间转ISO 8601 字符串 : {{ $util.moment().toISOString() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="toISOString"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            时间转对象 : （请自行尝试，或查看官网）
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="toObject"></vue-code-mirror>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane lazy label="查询">
                <el-row class="contentTitle">
                    <el-col>
                        查询时，可传第二个参数 Unit ，参数类型为 String : @eg this.$util.moment('2010-10-20').isBefore('2010-10-21', 'year') // false
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            是否之前（开） : {{ $util.moment('2010-10-20').isBefore('2010-10-21') }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="isBefore"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            是否之前（闭） : {{ $util.moment('2010-10-21').isSameOrBefore('2010-10-21') }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="isSameOrBefore"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            是否相同 : {{ $util.moment('2010-10-20').isSame('2010-10-20') }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="isSame"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            是否之后（开） : {{ $util.moment('2010-10-20').isAfter('2010-10-19') }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="isAfter"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            是否之后（闭） : {{ $util.moment('2010-10-19').isSameOrAfter('2010-10-19') }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="isSameOrAfter"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            是否之间（左开右开） : {{ $util.moment('2010-10-20').isBetween('2010-10-19', '2010-10-25') }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="isBetween"></vue-code-mirror>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <h4>
                            是否闰年 : {{ $util.moment([2000]).isLeapYear() }}
                        </h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <vue-code-mirror v-model="isLeapYear"></vue-code-mirror>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default{
        components: {
            VueCodeMirror
        },
        data(){
            return {
                now: `this.$util.moment()`,
                stringAnalyze: `this.$util.moment('1970-01-01 09:30:26.123')`,
                stringFormatAnalyze: `this.$util.moment('01-01-1970 09:30:26', 'MM-DD-YYYY HH:mm:ss')`,
                stringFormatsAnalyze: `this.$util.moment('01-01-1970 09:30:26', ['MM-DD-YYYY', 'DD-MM', 'DD-MM-YYYY'])`,
                isValidAnalyze: `this.$util.moment('1970-01-01 09:30:26.123').isValid()`,

                addOperate: `this.$util.moment().add(7, 'days').add(1, 'h')`,
                subtractOperate: `this.$util.moment().subtract(7, 'days').subtract(1, 'h')`,
                diffOperate: `$util.moment().diff( $util.moment('1995-04-02'), 'years')`,
                startOfOperate: `this.$util.moment().startOf('year')`,
                endOfOperate: `this.$util.moment().endOf('month')`,

                format: `this.$util.moment().format('YYYY/MM/DD HH:mm:ss')`,
                formatByExpress: `this.$util.moment().format('L LTS')`,
                formatBySpecial: `this.$util.moment().format('[today] dddd')`,

                fromNow: `this.$util.moment().add(20, 'seconds').fromNow()`,
                from: `this.$util.moment().subtract(40, 'seconds').from(this.$util.moment().subtract(20, 'seconds'))`,
                toNow: `this.$util.moment().add(20, 'seconds').toNow()`,
                to: `this.$util.moment().subtract(40, 'seconds').to(this.$util.moment().subtract(20, 'seconds'))`,

                getUnix: `this.$util.moment().unix()`,
                daysInMonth: `this.$util.moment().daysInMonth()`,
                toDate: `this.$util.moment().toDate()`,
                toArray: `this.$util.moment().toArray()`,
                toJSON: `this.$util.moment().toJSON()`,
                toISOString: `this.$util.moment().toISOString()`,
                toObject: `this.$util.moment().toObject()`,

                isBefore: `this.$util.moment('2010-10-20').isBefore('2010-10-21')`,
                isSameOrBefore: `this.$util.moment('2010-10-21').isSameOrBefore('2010-10-21')`,
                isSame: `this.$util.moment('2010-10-20').isSame('2010-10-20')`,
                isAfter: `this.$util.moment('2010-10-20').isAfter('2010-10-19')`,
                isSameOrAfter: `this.$util.moment('2010-10-19').isSameOrAfter('2010-10-19')`,
                isBetween: `this.$util.moment('2010-10-20').isBetween('2010-10-19', '2010-10-25')`,
                isLeapYear: `this.$util.moment([2000]).isLeapYear()`
            }
        }
    }
</script>

<style scoped="">
    .contentTitle{
        font-size: 16px;
        margin-bottom: 3px;
        font-weight: bold;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }
    .table th, .table td{
        border: 1px solid #bdbdbd;
        padding: 3px 10px;
    }
    .table td:nth-of-type(1){
        white-space: pre;
        text-align: right;
        width: 0;
    }
</style>