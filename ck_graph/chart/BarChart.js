import {BasicChart, echarts} from './BasicChart'

class BarChart extends BasicChart {
  constructor(chartId) {
    super(chartId);
    this.setParams({});
  }

  setParams(params) {
    this.mGraphColorRGBA = params.graphColorRGBA  //|| '55,172,249' 图形的渐变颜色,配置生效
    this.mTextColor = params.textColor || '#000'; // 横坐标文字颜色
    this.mLabelAlign = params.labelAlign || 'left' // 坐标文字位置（居左、中、右）
    this.mBarWidth = params.barWidth || '50%'; //图形宽度
    this.mAxisLine = params.axisLine || 'true'; //显示坐标轴
    this.mSymbolSize = params.symbolSize||0; //图标大小
    this.mGraphicsColorMax = params.graphicsColorMax || '#E1A325'; //特殊柱子颜色
    this.mShowMark = params.showMark || false; //显示顶部数据
    this.mOrientation = params.orientation || 'vertical'; //是否垂直显示
    this.mShowLabelY = params.showLableY || false; //显示y轴刻度名
    this.mRotate = params.rotate  || 0; //刻度标签旋转
    this.mGridSet = params.gridSet ||  {
      left:'70'
    }; //整个图形距离上下左右距离设置，不传为默认
    this.mTooltipType = params.tooltipType || "shadow"
    this.mShowAll = params.showAll ? 0 :　'auto'; // 为true则x轴强制全部显示
    return this;
  }

  setTooltip(tooltip) {
    this.mTooltip = tooltip;
    return this;
  }

  setDatas(data) {
    let that = this;
    let xData = data.map(function (item) {
      let temp = {
        value: item.xAxis,
        textStyle: {
          color: that.mTextColor
        }
      };
      return temp;
    });
    let seriesData = data.map(function (item,index) {
      let temp = {
        value: item.seriesData,
        itemStyle: {
          normal: {
            color:that.mGraphColorRGBA?new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: 'rgba(' + that.mGraphColorRGBA + ',1)'},
                {offset: 1, color: 'rgba(' + that.mGraphColorRGBA + ',0)'}
              ]
            ):that.mOrientation=='vertical'?that.colors[0]:that.colors[index]
          },
        }
      };
      return temp;
    });
    let seriesGlyphData = data.map(function (item) {
      let temp = {
        value: item.seriesData,
        symbol: item.path,
        symbolSize: [item.path?that.mSymbolSize:0, item.path?that.mSymbolSize:0]
      }
      return temp;
    });
    let markData = data.map(function (item, index) {
      let temp = {
        value: item.seriesData,
        xAxis: index,
        yAxis: item.seriesData,
        label: {
          color: item.isMax ? that.mGraphicsColorMax : that.colors[index],
          offset:[0,15],
        }
      }
      return temp;
    });
    this.mData = {
      xData,
      seriesData,
      seriesGlyphData,
      markData
    };
    return this;
  }

  setOptions() {
    let that = this;
    super.setOptions({
      tooltip: this.mTooltip || {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: this.mTooltipType        // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor:'rgba(0,0,0,0)',
        formatter: function (params) {
          let dom=`<div style="width:200px;border:2px solid ${params[0].color};border-radius: 5px;text-align: left">
                      <p style="padding:0 10px;background:${params[0].color};height:30px;line-height: 30px;font-size: 16px">
                      ${that.mOrientation=='vertical'?that.yName:that.xName}</p>
                      <p style="padding:0 10px;height:30px;line-height: 30px;background:#fff;color:#000;font-size: 14px">
                        <span style="display:inline-block;max-width:100px;overflow: hidden">${params[0].name}</span>
                        <span style="float:right;color:${params[0].color}">${params[0].value}</span></p>
                    </div>`
          return dom;
        }
      },
      [this.mOrientation=='vertical'?'xAxis':'yAxis']:
        {
          // type: 'category',
          data: this.mData.xData,
          axisTick: {show: false},
          axisLine: {show: this.mAxisLine},
          axisLabel: {
            align: this.mLabelAlign,
            rotate:this.mRotate,
            interval: this.mShowAll
          },
          offset: (this.mSymbolSize||0) + 10
        },
      [this.mOrientation=='vertical'?'yAxis':'xAxis']:
        {
          splitLine: {show: false},
          axisLine: {show: this.mAxisLine},
          axisTick: {show: false},
          axisLabel: {show: this.mShowLabelY, interval: this.mShowAll},
        },
      grid:this.mGridSet,
      series: [
        {
          type: 'bar',
          barWidth: this.mBarWidth,
          data: this.mData.seriesData,
          markPoint: {
            itemStyle: {
              color: {
                type: 'linear',
              }
            },
            data: this.mShowMark?this.mData.markData:[]
          },
        },
        {
          name: 'glyph',
          type: 'pictorialBar',
          symbolPosition: 'start',
          symbolOffset: [0, '150%'],
          data: this.mData.seriesGlyphData
        }
      ]
    })
    return this;
  }
}

export {
  BarChart
}
