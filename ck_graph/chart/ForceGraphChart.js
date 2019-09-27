import { BasicChart } from './BasicChart'
class ForceGraphChart extends BasicChart{
  constructor(chartId){
    super(chartId)
  }
  setParams(param){
    this.mRepulsion = param.repulsion || 2500
    this.mEdgeLength = param.edgeLength || 90
    this.mLayoutAnimation = param.layoutAnimation || false
    return this;
  }
  setDatas(data){
    this.mData = data;
    return this;
  }
  setOptions(){
    super.setOptions({
      series: [
        {
          type: 'graph',
          layout: 'force',
          animation  :false,
          focusNodeAdjacency: true,
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize :12,
          data:this.mData.topData,
          width: '100%',
          height: '100%',
          force: {
            repulsion: this.mRepulsion,
            initLayout :'circular',
            edgeLength :[this.mEdgeLength,this.mEdgeLength],
            gravity:0.1,
            layoutAnimation :this.mLayoutAnimation,
          },
          links:this.mData.linkData,
          // tooltip:{
          //   show:false
          // },
          emphasis: {
            lineStyle: {
              width: 3,
              color:'#101010',
            }
          },
          edgeLabel: {
            normal: {
              textStyle: {
                fontSize:12
              }
            },
          },
          label: {
            normal: {
              show:true,
              position: 'bottom',
              textStyle:{
                color:'#101010',
                fontSize:'14',
              },
            },
          },
          symbolSize: function(value,params){
            return value;
          },
          itemStyle :{
            normal:{
              color:'#4a5de4',
            }
          },
          lineStyle  :{
            normal:{
              color:'#d2d2d2',
              width :2
            }
          },
        },
      ]
    })
    return this;
  }
}
export {
  ForceGraphChart
}

