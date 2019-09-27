import {BasicChart} from './BasicChart'

class GraphChart extends BasicChart {
  constructor(chartId) {
    super(chartId);
  }

  setDatas(data) {
    let that = this;
    let categories = data.nodes.map(function (item) {
      let temp = {name: item.name};
      return temp;
    });

    let graphNodeData = data.nodes.map(function (item, index) {
      let temp = {
        name: item.name,
        symbolSize: item.symbolSize,
        value: item.value,
        itemStyle: {color: that.colors[index], id: item.id, opacity: item.opacity},
        emphasis: {
          label: {
            color: 'rgba(0,0,0,0)'
          }
        },
      }
      return temp;
    });
    let graphLinkData = data.links.map(function (item) {
      let temp = {
        source: item.source,
        target: item.target,
        value: item.value,
        label: {
          show: false,
          position: 'end',
          align: 'center',
          emphasis: {
            show: true,
            fontWeight: 'bold',
            formatter: function (param) {
              var val = param.name.split('>');
              return val[1] + '\n关联度:' + param.value + '%'
            },
          }
        }
      }
      return temp;
    });
    let graphEdgeSymbol = data.edgeSymbol;
    this.mData = {
      categories,
      graphNodeData,
      graphLinkData,
      graphEdgeSymbol,
    };
    return this;
  }

  setOptions() {
    let that = this;
    super.setOptions({
      tooltip: {
        formatter: '{b0}<br/>贡献率:{c0}%'
      },
      legend: [{
        data: that.mData.categories.map(function (a) {
          return a.name;
        }),
        top: 'bottom',
      }],
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      color: that.colors,
      width: '100%',
      height: '55%',
      series: [
        {
          type: 'graph',
          layout: 'circular',
          focusNodeAdjacency: true,
          edgeSymbol: that.mData.graphEdgeSymbol,
          circular: {
            rotateLabel: true
          },
          data: that.mData.graphNodeData,
          links: that.mData.graphLinkData,
          categories: that.mData.categories,
          roam: true,    //是否放大缩小，拖动
          label: {
            normal: {
              show: true,
              color: 'source',
              position: 'right',
              formatter: '{b}',
            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              curveness: 0.3
            }
          },
          emphasis: {
            lineStyle: {
              width: 5
            }
          }
        }
      ]
    })
    return this;
  }
}

export {
  GraphChart
}

