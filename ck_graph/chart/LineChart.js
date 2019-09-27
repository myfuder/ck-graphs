import {BasicChart} from './BasicChart'

class LineChart extends BasicChart {
  setMarkArea(markArea){
    if(markArea){
      this.mMarkArea = JSON.parse(markArea).list.map((item)=>{
        let temp = [{
          name:item.name,
          xAxis: item.x[0]
        },{
          xAxis: item.x[1]
        }]
        return temp;
      })
    }
    return this
  }
  constructor(chartId) {
    super(chartId);
  }
  setParams(params) {
    this.mTextColor = params.textColor || '#101010'; // 横坐标文字颜色
    this.mShowLineY = params.showLineY || false; //y轴轴线是否显示,默认显示
    this.mShowTickY = params.showTickY || false; //y轴刻标是否显示,默认显示
    this.mLengendIcon = params.lengendIcon || "pin"; //折线图lengend图形
    this.mShowTickX = params.showTickX || false; //y轴刻标是否显示,默认显示
    this.mOpacity = params.opacity || 0.2; //是否显示区域背景
    this.mInterval = params.interval || null;
    this.mGridSet = params.gridSet || {
      left:'3%',
      top:'10%',
      bottom: '7%',
      right:'3%',
      containLabel: true
    };  //整个图形距离上下左右距离设置，不传为默认
    return this;
  }
  setDatas(data) {
    let that = this;
    let seriesData = data.series.map(function (item,index) {
      let temp = {
        // lineStyle:{color:'#000'},
        areaStyle:{opacity: that.mOpacity,},
        markArea: {
          data: that.mMarkArea
        },
        itemStyle:{
          color:that.colors[index]
        },
        ...item
      };
      return temp;
    });
    this.mData = {xAxis:data.xAxis,series:seriesData};
    return this;
  }

  setTooltip(tooltip) {
    this.mTooltip = tooltip;
    return this;
  }

  setOptions() {
    let that = this;
    super.setOptions({
      // color:that.colors,
      tooltip: this.mTooltip || {
        trigger: 'axis',
        backgroundColor:'rgba(0,0,0,0)',
        formatter: function (params) {
          let child = '';
          for( let item of params){
            child+=`<p style="padding:0 10px;height:30px;line-height: 30px;background:#fff;color:#000;font-size: 14px">
                        <span style="display:inline-block;height:10px;width:10px;border-radius: 50%;border-color:5px solid ${item.color};box-shadow:0 0px 10px ${item.color}"></span>
                        <span>${item.seriesName}</span>
                        <span style="float:right;color:${item.color}">${item.value}</span>
                      </p>`
          }
          let dom=`<div style="width:200px;border:2px solid ${params[0].color};border-radius: 5px;text-align: left">
                      <p style="padding:0 10px;background:${params[0].color};height:30px;line-height: 30px;font-size: 16px">${params[0].name}</p>
                      ${child}
                    </div>`
          // let dom = '<p style="background:'+params[0].color+'">'+params[0].name + ': ' + params[0].value+'</p>'
          return dom;
        }
      },
      legend: {
        data: this.mData.series.map((avg,index) => {
          let temp = {
            name: avg.name,
            icon:this.mLengendIcon,
            textStyle: {
              color: 'black'
            }
          }
          return temp
        }),
        bottom:'-5',
        icon: "roundRect",
      },
      grid: this.mGridSet,
      color:'#a5a5a5',
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.mData.xAxis,
        splitLine: {show: false},
        axisLine: {show: false},
        axisTick: {show: this.mShowTickX},
        axisLabel: {show: true,color:this.mTextColor,interval:this.mInterval},
      },
      yAxis: {
        type: 'value',
        splitLine: {show: true},
        axisLine: {show: this.mShowLineY},
        axisTick: {show: this.mShowTickY},
        axisLabel: {show: true},
      },
      series: this.mData.series
    })
    return this;
  }
}

export {
  LineChart
}
