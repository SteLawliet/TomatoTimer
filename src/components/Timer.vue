<template>
  <div class="hello">
    <!-- <audio src="../assets/a.mp3" v-if="!stop" ref="audio"  loop></audio> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    
    <audio src="../../public/static/a.mp3" v-if="!stop" ref="audio" loop></audio>

    <el-button type="primary" @click="openfile">openfile</el-button>

    <h1>{{ nowTime }}</h1>
    <div>
      <i-circle :percent="percent" :stroke-color="color">
        <Icon v-if="percent == 100" type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
        <span v-else style="font-size:24px">{{ percent }}%</span>
        <Icon v-else size="60" style="color:#5cb85c" type="android-time"></Icon>
      </i-circle>
    </div>
    <div class="el-progress0">
      <el-progress
        :text-inside="true"
        :stroke-width="18"
        :percentage="100-percent"
        color="rgba(142, 113, 199, 0.7)"
      ></el-progress>
    </div>
    <el-input-number v-model="selMin" placeholder></el-input-number>&nbsp;
    <el-button type="primary" v-if="!falg" @click="starttimer">Start</el-button>
    <el-button type="primary" v-if="falg" @click="endtimer">&nbsp;End&nbsp;</el-button>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      file: null,
      stop: false,
      percent: 0,
      clear: 0,
      falg: false,
      selMin: 0,
      intTime: 0,
      selTime: 0,
      nowTime: "00 : 00 : 00",
      endTime: 0,
      now: 0,
      Time: 0,
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {},
  computed: {},
  methods: {
    updateTime() {},
    //选择25分钟
    //计算25分钟的结束时间 end25
    //end25-nowTime
    // endTime/1000/60 m : endTime%(1000*60)
    starttimer() {
      this.stop = false;
      this.falg = !this.falg;
      this.$message.success("start");
      this.min = this.selMin;
      this.endTime = this.min * 60 * 1000 + new Date().getTime();
      const my = this;
      this.clear = window.setInterval(() => {
        my.getTime();
      }, 100);
    },
    endtimer() {
      this.falg = !this.falg;
      this.stop = !this.stop;
      this.nowTime = "00 : 00 : 00";
      window.clearInterval(this.clear);
    },
    getTime() {
      const end0 = this.endTime - new Date().getTime();
      this.percent = 100 - parseInt((end0 / (this.min * 60 * 1000)) * 100);
      this.nowTime =
        "" +
        // +this.formatTime(parseInt(end0 / 1000 / 60 /60 % 24))
        // +" : "
        this.formatTime(parseInt((end0 / 1000 / 60) % 60)) +
        " : " +
        this.formatTime(parseInt((end0 / 1000) % 60));
      if (end0 <= 0) {
        window.clearInterval(this.clear);
      }
    },
    formatTime(time) {
      return time / 10 >= 1 ? time : `0${time}`;
    },
    openfile() {
      let mp3Src = "/static/a.mp3";
      window.myAudio = this.$refs.audio;
      this.$refs.audio.src = window.location.origin + mp3Src;
      console.log(this.$refs.audio.src);
      this.$refs.audio.play();
      this.$message.success("time now!!");
      new Notification("break time now!!");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.el-progress0 {
  width: 40%;
}
</style>
