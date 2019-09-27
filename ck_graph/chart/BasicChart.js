import echarts from 'echarts'
class BasicChart {
  constructor(chartId) {
    this.colors = ['#5571fc', "#01ba82", '#de7a33', '#7d51d5', "#aeb000", "#02abad", "#ba0101", "#061eac", "#a601ba", "#31baa2", "#01baa2", "#a601ba", "#31ba01"]
    this.chartId = chartId;
  }
  setParams(avg) {
    return this;
  }
  setMarkArea(avg) {
    return this;
  }
  setTitle(title) {
    this.mTitle = title;
    return this;
  }
  setXName(xName) {
    this.xName = xName;
    return this;
  }
  setYName(yName) {
    this.yName = yName;
    return this;
  }
  getYName() {
    return this.yName
  }
  setOptions(option) {
    if (option.xAxis && option.yAxis) {
      option.xAxis.name = this.xName;
      option.yAxis.name = this.yName;
      // option.xAxis.nameTextStyle={
      //   padding:[60,0,0,-50]
      // }
      // option.yAxis.nameTextStyle = {
      //   padding: [0, 0, 0, 60]
      // }
    }
    this.mOption = {
      color: this.colors,
      tooltip: {},
      title: {
        ...this.mTitle,
        textStyle: {
          fontSize: 14
        }
      },
      textStyle: {
        color: '#101010',
      },
      // legend:{
      //   show:false
      // },
      grid: {
        bottom: 30,
        // top:'0',
      },
      ...option
    };
    return this;
  }
  drawOf() {
    let myChart = echarts.init(document.getElementById(this.chartId));
    myChart.setOption(this.mOption)
    return myChart
  }
}

export {
  BasicChart,
  echarts
}
