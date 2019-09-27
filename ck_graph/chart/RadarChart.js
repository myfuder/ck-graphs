import { BasicChart } from './BasicChart'
class RadarChart extends BasicChart{
  constructor(chartId){
    super(chartId);
    this.setParams({});
  }
  setDatas(data) {
    this.mData = data;
    return this;
  }
  setParams(param){
    this.mTextColor = param.textColor;
    return this;
  }
  setOptions() {
    super.setOptions({
      grid:{
        top:'20%',
        bottom:'2%',
      },
      legend: {
        orient:'horizontal',
        x:'center',
        bottom:'0',
        data:this.mData.serisData.map((item)=>{
          return item.name
        })
      },
      radar:
        {
          name: {
            textStyle: {
              color: this.mTextColor,
            }
          },
          indicator: this.mData.indicator,
          center: ['50%', '50%'],
        },
      series:
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data: this.mData.serisData
        },
    })
    return this;
  }
}
export {
  RadarChart
}
