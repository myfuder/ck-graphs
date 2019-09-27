import { BasicChart } from './BasicChart'
class PieChart extends BasicChart{
  constructor(chartId){
    super(chartId);
    this.setParams({});
  }
  setParams(params) {
    this.mShowLengd = params.showLengd!=undefined?params.showLengd:true //显示图例
    this.mRoseType = params.roseType || false
    this.mRadius = params.radius || '55%'
    this.mShowTooltip = params.showTooltip || false
    this.mLength = params.length || 10
    this.mUnit= params.unit||''
    this.mVertical=params.vertical||'vertical'
    this.mTop=params.top||'bottom'
    this.mRight=params.right|| 20
    this.mGridSet = params.gridSet||{}
    this.centerX=params.centerX||'50%'
    this.centerY=params.centerY||'50%'
    return this;
  }
  setDatas(data) {
    let that = this;
    let legendData = data.map((item)=>{
      return item.name
    })

    this.mData = {seriesData:data.map((item,index)=>{
        let temp = {
          value:item.value,
          name:item.name,
          itemStyle:{
            color:that.colors[index]
          }
        }
        return temp
      }),legendData};
    return this;
  }

  setTooltip(tooltip) {
    this.mTooltip = tooltip;
    return this;
  }
  setOptions() {
    let that = this;
    super.setOptions({
      tooltip : {
        show:this.mShowTooltip,
        trigger: 'item',
        backgroundColor:'rgba(0,0,0,0)',
        formatter: function(params){
          let dom=`<div style="width:200px;border:2px solid ${params.color};border-radius: 5px;text-align: left">
                      <p style="padding:0 10px;background:${params.color};height:30px;line-height: 30px;font-size: 16px">${that.mTitle?that.mTitle.text:''}</p>
                      <p style="padding:0 10px;height:30px;line-height: 30px;background:#fff;color:#000;font-size: 14px">
                        <span>${params.name}</span>
                        <span style="float:right;color:${params.color}">${params.value}</span></p>
                    </div>`
          return dom;
        }
      },
      grid:this.mGridSet,
      legend: {
        orient:this.mVertical,
        right:this.mRight ,
        top:this.mTop,
        data: this.mShowLengd?this.mData.legendData:[]
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : this.mRadius,
          center: [this.centerX, this.centerY],
          data:this.mData.seriesData.sort(function (a, b) { return a.value - b.value; }),
          roseType: this.mRoseType,
          label:{
            formatter:'{b}\n{c}' + this.mUnit +'\n{d}%'
  },
          labelLine:{
            length:this.mLength,
          },
          itemStyle: {
            shadowBlur:{
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 30
            },
            shadowColor:'red',
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    return this;
  }
}
export {
  PieChart
}
