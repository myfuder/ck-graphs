import { BasicChart } from './BasicChart'
class GaugeChart extends BasicChart{
  constructor(chartId){
    super(chartId)
  }
  setDatas(data){
    this.mData = data;
    return this;
  }
  formatter(){
    return "{a} <br/>{b} : {c}%";
  }
  setOptions(){
    super.setOptions({
      tooltip : {
        formatter: this.formatter()
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {formatter:'{value}%'},
          data: this.mData
        }
      ]
    })
    return this;
  }
}
export {
  GaugeChart
}

