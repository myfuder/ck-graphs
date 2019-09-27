import {BasicChart} from './BasicChart'

class MultiPieChart extends BasicChart {
  constructor(chartId) {
    super(chartId);
    this.setParams({});
  }

  setParams(params) {
    this.mShowLengd = params.showLengd != undefined ? params.showLengd : true //显示图例
    this.mRoseType = params.roseType || false
    this.mRadius = params.radius || false
    this.mShowTooltip = params.showTooltip || false
    this.mLength = params.length || 10
    this.mUnit = params.unit || ''
    this.mCenter = params.center || false
    return this;
  }

  setDatas(data) {
    var that=this;
    let legendData = data.name.map((item) => {
      return item
    })
    let seriesData = (function () {
      var arr = [];
      for(let i = 1; i < data.source[0].product.length; i++) {
        arr.push({
          type: 'pie',
          radius: that.mRadius?that.mRadius[i-1]:'55%',
          center: data.source[0].product.length>2?that.mCenter[i-1]:['50%','65%'],
          roseType: that.mRoseType?that.mRoseType[i-1]:'',
          label: {
            formatter: function (param) {
              var val = param.data[i];
              var name = param.data[0];
              return name + '\n' + val + '人，' + param.percent + '%'
            }
          },
          encode:{
            itemName: 'name',
            value:data.source[0].product[i]
          }
        });
      }
      return arr
    })();
    let sourceData = (function () {
      var source = [data.source[0].product];
      for (var i = 0; i < data.source[1].datas.length; i++) {
        source.push(data.source[1].datas[i]);
      }
      return source
    })();
    this.mData = {
      seriesData,
      legendData,
      sourceData
    };
    return this
  }

  setTooltip(tooltip) {
    this.mTooltip = tooltip;
    return this;
  }

  setOptions() {
    let that = this;
    super.setOptions({
      tooltip: {
        show: this.mShowTooltip,
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0)',
        formatter: function (params) {
          let dom = `<div style="width:200px;border:2px solid ${params.color};border-radius: 5px;text-align: left">
                      <p style="padding:0 10px;background:${params.color};height:30px;line-height: 30px;font-size: 16px">${that.mTitle ? that.mTitle.text : ''}</p>
                      <p style="padding:0 10px;height:30px;line-height: 30px;background:#fff;color:#000;font-size: 14px">
                          <span>${params.name}</span>
                        <span style="float:right;color:${params.color}">${params.data[1]}</span></p>
                    </div>`
          return dom;
        }
      },
      legend: {
        orient: 'horizontal',
        right: '20',
        top: '5',
        data: this.mShowLengd ? this.mData.legendData : []
      },
      dataset: {
        source: this.mData.sourceData
      },
      color: that.colors,
      series: this.mData.seriesData
    })
    return this;
  }
}

export {
  MultiPieChart
}
