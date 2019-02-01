<template>
    <div>
        <v-layout>
            <!--  > -->
            <v-flex xs12>
                <v-card class="text-xs-center">
                    <v-flex>
                        &nbsp;
                        <br>
                        <!--<v-spacer class="mt1"></v-spacer>-->

                        <Clock :color="my_color"></Clock>
                        <audio :src="audioSrc" v-if="!pause" ref="audio"></audio>
                    </v-flex>

                    <v-flex>
                        <!--<v-spacer class="mt1"></v-spacer>-->

                        <v-progress-circular class="progress"
                                             :rotate="-90"
                                             :size="200"
                                             :width="18"
                                             :value="timer0.percent"
                                             :color="my_color">
                            <!--color="teal"-->
                            <!--{{ value }}-->
                            <div align="center" style="font-size: 2em">{{timer0.remainTimeStr}}
                            </div>
                            <!--<div align="center">-->
                            <!--<span style="font-size: 2em">{{nowTodo.tag}}</span><br>-->
                            <!--</div>-->
                            <v-chip :color="my_color" text-color="white">
                                <v-icon left>label</v-icon>
                                {{nowTodo.tag?nowTodo.tag:"default"}}
                            </v-chip>

                        </v-progress-circular>


                    </v-flex>
                    <v-spacer class="pl-1"></v-spacer>
                    <div class="text-xs-center">
                        <v-btn fab dark small :color="my_color" @click="initTodo">
                            <v-icon dark>refresh</v-icon>
                        </v-btn>

                        &nbsp;&nbsp;

                        <v-btn fab dark small :color="my_color" v-if="pause"
                               v-on:click="startTodo">
                            <v-icon>play_arrow</v-icon>
                        </v-btn>

                        <v-btn fab dark small :color="my_color" v-if="!pause"
                               v-on:click="pauseTodo">
                            <v-icon>pause</v-icon>
                        </v-btn>

                        <v-btn fab dark small :color="my_color"
                               @click="nextRound">
                            <v-icon dark>last_page</v-icon>
                        </v-btn>


                        &nbsp;&nbsp;
                        <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-width="200"
                                max-height="500"
                                offset-x
                                min-width="200"
                                bottom
                                left
                        >
                            <v-btn fab dark slot="activator" small :color="my_color">
                                <v-icon dark>build</v-icon>
                            </v-btn>

                            <v-card>
                                <v-spacer class="pl-1"></v-spacer>
                                <v-list>
                                    <v-spacer class="pl-1"></v-spacer>
                                    <v-list-tile>
                                        <v-slider
                                                class="pl-0"
                                                label="Round"
                                                v-model="status.conf.round"
                                                max="20"
                                                step="1"
                                                :color="my_color"
                                                thumb-label="always"
                                        ></v-slider>
                                    </v-list-tile>
                                    <v-spacer class="pl-1"></v-spacer>
                                    <v-list-tile>
                                        <v-slider
                                                class="pl-0"
                                                label="TodoTime"
                                                v-model="status.conf.todoTime"
                                                max="50"
                                                :color="my_color"
                                                step="5"
                                                thumb-label="always"
                                        ></v-slider>
                                    </v-list-tile>
                                    <v-spacer class="pl-1"></v-spacer>
                                    <v-list-tile>
                                        <v-slider
                                                class="pl-0"
                                                label="RestTime"
                                                v-model="status.conf.restTime"
                                                max="50"
                                                :color="my_color"
                                                step="5"
                                                thumb-label="always"
                                        ></v-slider>
                                    </v-list-tile>
                                    <v-spacer class="pl-1"></v-spacer>
                                    <v-list-tile>

                                        <v-slider
                                                class="pl-0"
                                                label="LongRestTime"
                                                max="50"
                                                :color="my_color"
                                                step="5"
                                                v-model="status.conf.longRestTime"
                                                thumb-label="always"
                                        ></v-slider>
                                    </v-list-tile>

                                </v-list>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn flat @click="menu = false">Cancel</v-btn>
                                    <v-btn color="primary" flat @click="saveConf">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </div>


                    <strong style="font-size: 1.5em;margin-bottom: 3em;line-height: 3em;color: #e91e63"
                            :color="my_color">{{status.costRound}}/{{status.conf.round}}</strong>
                </v-card>
            </v-flex>

        </v-layout>

        <v-layout ustify-center row>
            <v-flex>
                <!-- xs9 sm3 offset-sm4 -->
                <v-spacer></v-spacer>
                <v-card v-show="true">
                    <v-list class="mylist">
                        <v-list-group
                                v-for="item in items"
                                v-model="item.active"
                                :key="item.title"
                                :prepend-icon="item.action"
                                no-action
                                :color="my_color"
                        >
                            <v-list-tile slot="activator">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile
                                    v-for="subItem in item.items"
                                    :key="subItem.title"
                                    :color="my_color"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-content :color="my_color">
                                        <v-item-group>
                                            <!--<v-chip :color="my_color" text-color="white">-->
                                            <!--<v-icon left>label</v-icon>-->
                                            <!--#{{subItem.tag?subItem.tag:'default'}}-->
                                            <!--</v-chip> -->
                                            <v-chip :color="my_color" text-color="white">
                                                <v-icon left>label</v-icon>
                                                {{subItem.tag?subItem.tag:'default'}}
                                            </v-chip>


                                            <v-chip :color="my_color" :text-color="my_color" outline
                                                    label>
                                                {{subItem.title}}
                                            </v-chip>
                                        </v-item-group>
                                    </v-list-tile-content>
                                </v-list-tile-content>
                                <v-list-tile-action @click="setTodo(subItem);">
                                    <v-icon :color="my_color">{{ subItem.action }}</v-icon>
                                    <!--<v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>-->
                                    <v-icon
                                            v-if="nowTodo !== subItem"
                                            color="grey lighten-1"
                                    >
                                        radio_button_unchecked
                                    </v-icon>

                                    <v-icon
                                            v-else
                                            :color="my_color"
                                    >
                                        radio_button_checked
                                    </v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>


</template>

<script>
    import Clock from '../components/Clock'

    export default {
        name: 'list',
        components: {
            Clock
        },
        data() {
            return {
                timer0: {
                    setMinute: 0.25,// set the minute todo complete
                    completeTime: 0,  //  this time is when todo percent 100%
                    percent: 0,//   todo`s percent
                    remainTimeStr: "25 : 00",
                    remainTime: 0,//
                },
                status: {
                    reRound: 4, //remain round
                    costRound: 0, //cost round
                    nowTodo: true, //is todoing
                    nowRest: false, //is resting
                    nowLongRest: false,//is long resting
                    conf: {
                        round: 4, //every loop todo
                        restTime: 5,
                        todoTime: 25,
                        longRestTime: 20
                    },
                },

                menu: false,//conf menu status
                interval: {},//timer
                showList: true,
                pause: true,//timer is pause
                value: 0,
                nowTodo: 'none',//set todo now
                my_color: "pink",//theme color
                // my_color: "teal",
                items: [
                    {
                        action: 'school',
                        title: 'Study',
                        items: [
                            {title: 'Spark', tag: 'java'}, {title: 'Netty', tag: 'java'}
                        ]
                    },

                    {
                        action: 'healing',
                        title: 'Health',
                        items: [
                            {title: 'List Item0', tag: 'hell'}
                        ]
                    },
                    {
                        action: 'local_activity',
                        title: 'Attractions',
                        items: [
                            {title: 'List Item1', tag: 'activity'}
                        ]
                    },
                    {
                        action: 'directions_run',
                        title: 'Sport',
                        items: [
                            {title: 'List Item2', tag: "run"}
                        ]
                    },
                    {
                        action: 'local_offer',
                        title: 'Promotions',
                        items: [
                            {title: 'List Item3', tag: ''}
                        ]
                    }
                ]
            }
        },
        beforeDestroy() {
            clearInterval(this.interval)
        },
        created() {
            console.log("[create]");
            console.log(this.$LStore);
            this.status.conf = this.$LStore.getConf();
            console.log(this.$LStore.getConf());
            console.log(this.status.conf);
            this.timer0.setMinute = this.status.conf.todoTime;
            let mp3Src = "/static/a.mp3";
            this.audioSrc = window.location.origin + mp3Src;
            window.Vue0 = this

        },
        mounted() {

        },
        watch: {
            my_color: {
                deep: true,
                handler(val, oVal) {
                    // const color=val
                    // this.$vuetify.theme = {
                    //     primary: val,
                    //     secondary:val,
                    //     accent:'#e91e63',
                    //     error: val
                    // }
                }
            }
        },
        methods: {
            initStatus() {
                this.pause = false;
                this.timer0.setMinute = this.status.conf.todoTime;
                this.status = {
                    conf: this.$LStore.getConf(),
                    reRound: this.$LStore.getConf().round - 1,
                    costRound: 1,
                    nowTodo: true,
                    nowRest: false,
                    nowLongRest: false,
                }
            },
            changeStatus() {
                //handler Status
                //if nowTodo then =>rest or LongRest(reRound<=0)
                if (this.status.nowTodo) {
                    if (this.status.reRound <= 0) {
                        this.status.nowLongRest = true;
                        this.status.nowRest = false;
                        this.timer0.setMinute = this.status.conf.longRestTime;
                    } else {
                        this.status.nowLongRest = false;
                        this.status.nowRest = true;
                        this.timer0.setMinute = this.status.conf.restTime;
                    }
                    this.notify();
                    this.status.nowTodo = false;
                } else if (this.status.nowRest) {
                    this.status.costRound++;
                    this.status.reRound--;
                    this.timer0.setMinute = this.status.conf.todoTime;
                    this.notify();
                    this.status.nowRest = false;
                    this.status.nowTodo = true;
                } else if (this.status.nowLongRest) {
                    this.initStatus()
                } else {

                }
            },
            setTodo(item) {
                this.nowTodo = item;
                console.log("now todo:")
                console.log(item)
            },
            startTodo() {
                if (this.pause) {
                    if (this.timer0.remainTime === 0) {
                        this.initStatus();
                        this.startTimer();
                    } else {
                        this.pause = !this.pause;
                    }
                } else {
                    this.pause = !this.pause;
                }
            },
            initTodo() {

            },
            addTodo() {

            },
            saveTodo() {
                let time = new Date().getTime();
                this.$LStore.addHistories({
                    time,
                    todo: this.nowTodo
                })

            },
            pauseTodo() {
                if (this.timer0.remainTime !== 0) {
                    this.pause = true;
                }
            },
            nextRound() {
                this.timer0.completeTime = new Date().getTime() + 10;
            },

            notify() {
                let audio = this.$refs.audio;
                window.audio0 = audio;
                if (audio) {
                    audio.play();
                    window.setTimeout(() => {
                        audio.pause();
                    }, 3000)
                }
                if (this.status.nowTodo) {
                    this.saveTodo();
                }
                new Notification("break time now!!");
            },

            //选择25分钟
            //计算25分钟的结束时间 end25
            //end25-nowTime
            // endTime/1000/60 m : endTime%(1000*60)
            startTimer() {
                this.pause = false;
                console.log("start " + this.timer0.setMinute);
                this.timer0.completeTime = this.timer0.setMinute * 60 * 1000 + new Date().getTime();
                const my = this;
                this.interval = window.setInterval(() => {
                    my.calTime();
                }, 100);
            },

            completeTimer() {
                this.nowTime = "00 : 00";
                window.clearInterval(this.interval);
            },

            calTime() {
                if (!this.pause) {
                    this.timer0.remainTime = this.timer0.completeTime - new Date().getTime(); //  calculate  remain time
                }
                this.timer0.percent = 100 - parseInt((this.timer0.remainTime / (this.timer0.setMinute * 60 * 1000)) * 100);

                //show remain Time
                this.timer0.remainTimeStr =
                    "" +
                    // +this.formatTime(parseInt(end0 / 1000 / 60 /60 % 24))
                    // +" : "
                    this.formatTime(parseInt((this.timer0.remainTime / 1000 / 60) % 60)) +
                    " : " +
                    this.formatTime(parseInt((this.timer0.remainTime / 1000) % 60));

                if (this.timer0.remainTime <= 0) {
                    window.clearInterval(this.interval);
                    this.changeStatus();
                    this.startTimer()
                }
            },
            formatTime(time) {
                return time / 10 >= 1 ? time : `0${time}`;
            },
            saveConf() {
                this.menu = false;
                this.$LStore.setConf(this.status.conf);
            }
        }
    }

    //  init => setTodo round
    // => set Time setMin set TodoTime
    // => start Todo
    // => setRest RestTime(if long rest) --ReRound ++CostRound
    // => start Rest

</script>

<style>
    .mylist {
        /*margin-top: 1em;*/
        /*margin-bottom: 1em;*/
    }

    /*::selection {*/
    /*background-color: teal;*/
    /*}*/

    .pl-1 {
        margin-top: 2em;
    }

    .pl-0 {
        margin-top: 2em;
        margin-bottom: 2em;
    }

    .conf-0 {
        margin-top: 2em;
    }

    .mt1 {
        margin-top: 1em;
    }

    .mb1 {
        margin-bottom: 1em;
    }

</style>