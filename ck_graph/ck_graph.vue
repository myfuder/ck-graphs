<style>
  @import "ck_graph.css";
</style>
<script>
  import Vue from 'vue'
  import {GaugeChart} from './chart/GaugeChart'
  import {LineChart} from './chart/LineChart'
  import {BarChart} from './chart/BarChart'
  import {BarsChart} from './chart/BarsChart'
  import {PieChart} from './chart/PieChart'
  import {GraphChart} from './chart/graphChart'
  import {ForceGraphChart} from './chart/ForceGraphChart'
  import {RadarChart} from './chart/RadarChart'
  import {MultiPieChart} from './chart/MultiPieChart'
  import {MixingChart} from './chart/MixingChart'
  export default Vue.extend({
    name: 'ck_graph',
    props: ['id', 'title', 'xName', 'yName', 'markArea', 'type', 'datas', 'params'],
    template: require('./ck_graph.html'),
    data() {
      return {
        myChart: null,
        charts:null,
        'guage': GaugeChart,
        'line': LineChart,
        'bar': BarChart,
        'bars':BarsChart,
        'pie': PieChart,
        'pie1': MultiPieChart,
        'force': ForceGraphChart,
        'radar': RadarChart,
        'graph': GraphChart,
        'mix':MixingChart
      }
    },
    watch: {
      datas: function (data) {
        this.drawof();
      }
    },
    beforeDestroy() {
      if (this.myChart) {//判断图形已初始化,且未销毁
        this.myChart.off("click");
        this.myChart.clear();// //释放图形资源
        this.myChart.dispose();// //释放图形资源
        this.$store.state.echartsTabs = this.$store.state.echartsTabs.filter((item)=>{
          return this.id!=(item._dom?item._dom.id:item.dom.id)
        })
        this.myChart = null
      }
      for(let key in this.$data){
        this[key] = null
      }
      this.$watch = null
    },
    mounted() {
      this.drawof();
    },
    methods: {
      drawof() {
        if(this.datas&&Object.keys(this.datas).length>0){
          if(this.myChart){
            this.myChart.clear();
            this.myChart.setOption(this.charts.setTitle(this.title).setXName(this.xName).setYName(this.yName).setParams(this.params || {}).setDatas(this.datas).setOptions().mOption)
            return;
          }
          this.charts = new this[this.type](this.id)
            .setTitle(this.title).setXName(this.xName).setYName(this.yName)
            .setMarkArea(this.markArea)
            .setParams(this.params || {})
            .setDatas(this.datas)
            .setOptions();
          this.myChart = this.charts.drawOf();
          // this.myChart.currIndex = this.$store.state.currentTabIndex
          this.myChart.off("click");
          this.myChart.on('click', (params) => {
            this.$emit('click', params);
          });
          this.$store.state.echartsTabs = this.$store.state.echartsTabs.filter((item)=>{
            return this.id!=(item._dom?item._dom.id:item.dom.id)
          })
          if(this.id.indexOf('force')<0){
            this.$store.commit("setCharts",this.myChart)
            window.addEventListener("resize", () => {
              if(this.myChart&&(this.myChart._dom? this.myChart._dom.id: this.myChart.dom.id).indexOf(this.$store.state.currentTabIndex)>=0){
                this.myChart.resize()
              }
            });
          }
        }
      }
    }
  })
</script>
