import {
  BasicChart,
  echarts
} from './BasicChart'

class BarsChart extends BasicChart {
  constructor(chartId) {
      super(chartId);
    this.setParams({});
  }

  setParams(params) {
    this.mGraphColorRGBA = params.graphColorRGBA //|| '55,172,249' 图形的渐变颜色,配置生效
    this.mTextColor = params.textColor || '#000'; // 横坐标文字颜色
    this.mLabelAlign = params.labelAlign || 'center' // 坐标文字位置（居左、中、右）
    this.mBarWidth = params.barWidth || '25%'; //图形宽度
    this.mAxisLine = params.axisLine || 'true'; //显示坐标轴
    this.mSymbolSize = params.symbolSize || 0; //图标大小
    this.mGraphicsColorMax = params.graphicsColorMax || '#E1A325'; //特殊柱子颜色
    this.mShowMark = params.showMark || false; //显示顶部数据
    this.mOrientation = params.orientation || 'vertical'; //是否垂直显示
    this.mShowLabelY = params.showLableY || false; //显示y轴刻度名
    this.mRotate = params.rotate || 0; //刻度标签旋转
    this.mLengendData = params.lengendData || false; //lengend数据是否显示
    this.mLengendIcon = params.lengendIcon || "pin"; //lengend图形
    this.mGridSet = params.gridSet || {
      left: '70'
    }; //整个图形距离上下左右距离设置，不传为默认
    this.mTooltipType = params.tooltipType || "shadow"
    this.mShowAll = params.showAll ? 0 : 'auto'; // 为true则x轴强制全部显示
    return this;
  }

  setTooltip(tooltip) {
    this.mTooltip = tooltip;
    return this;
  }

  setDatas(data) {
    let dimensions = ['product']
    let seriesData = []
    for (let key in data.source) {
      dimensions.push(key)
      seriesData.push({
        type: 'bar',
        barWidth: this.mBarWidth,
        barGap: '0'
      })
    }
    let source = data.names.map((item, index) => {
      let temp = {}
      for (let key in data.source) {
        temp[key] = data.source[key][index]
      }
      return {
        product: item,
        ...temp,
      }
    })
    this.mData = {
      dimensions,
      source,
      seriesData
    }
    return this
  }

  setOptions() {
    let that = this;
    super.setOptions({
      tooltip: this.mTooltip || {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: this.mTooltipType // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: 'rgba(0,0,0,0)',
        formatter: function (params) {
          let temp = ''
          for (let i in params) {
            temp += `<p style="padding:0 10px;height:30px;line-height: 30px;background:#fff;color:#000;font-size: 14px">
                        <span style="display:inline-block;height:10px;width:10px;border-radius: 50%;border-color:5px solid ${params[i].color};box-shadow:0 0px 10px ${params[i].color}"></span>
                        <span style="padding-right:10px">${params[i].seriesName}</span>
                        <span style="float:right;color:${params[i].color}">${params[i].data[params[i].seriesName]}</span>
                      </p>`
          }
          let dom = `<div style="min-width:200px;border:2px solid ${params[0].color};border-radius: 5px;text-align: left">
                      <p style="padding:0 10px;background:${params[0].color};height:30px;line-height: 30px;font-size: 16px">${params[0].name}</p>
                      ${temp}
                    </div>`
          return dom;
        }
      },
      [this.mOrientation == 'vertical' ? 'xAxis' : 'yAxis']: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: this.mAxisLine
        },
        axisLabel: {
          align: this.mLabelAlign,
          rotate: this.mRotate,
          // interval: this.mShowAll,
          textStyle: {
            fontWeight: 'normal',
            color: this.mTextColor
          }
        },
        offset: (this.mSymbolSize || 0) + 10
      },
      [this.mOrientation == 'vertical' ? 'yAxis' : 'xAxis']: {
        splitLine: {
          show: false
        },
        axisLine: {
          show: this.mAxisLine
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: this.mShowLabelY,
          interval: this.mShowAll,
          textStyle:{
            fontWeight: 'normal',
            color: this.mTextColor
          }
        },
      },
      grid: this.mGridSet,
      legend: {
        show: this.mLengendData,
        bottom: 0,
        icon: this.mLengendIcon
      },
      dataset: {
        dimensions: this.mData.dimensions,
        source: this.mData.source,
      },
      series: this.mData.seriesData
    })
    return this;
  }
}

export {
  BarsChart
}
