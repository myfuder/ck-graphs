import {
  BasicChart,
  echarts
} from './BasicChart'

class MixingChart extends BasicChart {
  constructor(chartId) {
    super(chartId);
    this.setParams({});
  }

  setParams(params) {
    this.mLegend = params.legend || false;
    this.mBarWidth = params.barWidth || '30%';
    this.mGrid = params.grid || {
      top: 40,
      left: 50,
      right: 50
    }
    this.mXShowAxisTick = params.xShowAxisTick || false // 默认显示x轴刻度
    this.mYShowAxisTick = params.yShowAxisTick || false // 默认显示y轴刻度
    this.mYSplitLine = params.ySplitLine || false // 默认显示y轴分割线
    this.mLegendIcon = params.legendIcon || 'circle' // 默认显示y轴分割线
    this.mYShowAxisLine = params.yShowAxisLine || false // 默认显示y轴轴线
    return this;
  }

  setTooltip(tooltip) {
    this.mTooltip = tooltip;
    return this;
  }

  setDatas(data) {
    let that = this;
    let legendData = data.seriesData.map((item) => {
      if (item.type == 'bar') {
        item.barGap = '0'
        item.barWidth = that.mBarWidth
      }
      return item.name
    })
    let xAxisData = data.xAxisData
    this.mData = {
      legendData,
      xAxisData,
      seriesData: data.seriesData
    }
    return this;
  }
  setOptions() {
    super.setOptions({
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0)',
        formatter: function (params) {
          let child = '';
          for (let item of params) {
            child += `<p style="padding:0 10px;height:30px;line-height: 30px;background:#fff;color:#000;font-size: 14px;overflow:hidden;">
                        <span style="display:inline-block;height:10px;width:10px;border-radius: 50%;border-color:5px solid ${item.color};box-shadow:0 0px 10px ${item.color}"></span>
                        <span style="padding-right:10px">${item.seriesName}</span>
                        <span style="float:right;color:${item.color}">${item.seriesName.indexOf("增长率") != -1?(item.value+'%'):item.value}</span>
                      </p>`
          }
          let dom = `<div style="min-width:200px;border:2px solid ${params[0].color};border-radius: 5px;text-align: left">
                      <p style="padding:0 10px;background:${params[0].color};height:30px;line-height: 30px;font-size: 16px">${params[0].name}</p>
                      ${child}
                    </div>`
          // let dom = '<p style="background:'+params[0].color+'">'+params[0].name + ': ' + params[0].value+'</p>'
          return dom;
        }
      },
      legend: {
        show: this.mLegend,
        bottom: 0,
        icon: "circle",
        data: this.mData.legendData
      },
      grid: this.mGrid,
      xAxis: [{
        type: 'category',
        data: this.mData.xAxisData,
        axisPointer: {
          type: 'shadow'
        },
        axisTick: {
          show: !this.mXShowAxisTick
        }
      }],
      yAxis: this.yName.map((item, index) => {
        return {
          type: 'value',
          name: item,
          axisLine: {
            show: !this.mYShowAxisLine
          },
          axisTick: {
            show: !this.mYShowAxisTick
          },
          splitLine: {
            show: this.mYSplitLine ? false : !index
          }
        }
      }),
      series: this.mData.seriesData
    })
    return this;
  }
}

export {
  MixingChart
}
