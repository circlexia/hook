import React from 'react';
import {Tabs,Toast} from 'antd-mobile';
import echarts from 'echarts/lib/echarts';
// 引入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import './style/index.css';
import axios from 'axios';
import {getUrlParams} from '../../util/getUrlParams';
import footImg from '../../assets/img/foot.png';
import fireImg from '../../assets/img/fire.png';
const urlParamsObj = getUrlParams();
const xcookUrl = 'http://line.xcook.cn:8888';
const tabs = [
  { title: '最近7天' },
  { title: '最近30天' }
];
export default class Walk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentdate: '',
      startDate: '',
      endDate: '',
      stepcount: '',
      xData: [],
      yData: [],
      yCalory: [],
      totalNumber: '',
      totalMonth: '',
      suggestion: '',
      showSeven: true
    };
  }

  componentDidMount() {
    this.getNowFormatDate();
    this.getBeforeDate(6);
    Toast.loading('加载中...',1);
  }
  //获取今天日期 
  getNowFormatDate() {
    const date = new Date();
    const seperator1 = '-';
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }
    const currentdate = year + seperator1 + month + seperator1 + strDate;
    this.setState({
      currentdate: currentdate
    },()=>{
    });
    return currentdate;
  }
  // 获取6天前的日期
  getBeforeDate(n){
    var n1 = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n1){
      if(mon>1) {
        mon=mon-1;
      } else {
        year = year-1;
        mon = 12;
      }
    }
    d.setDate(d.getDate()-n1);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    const startDate = year+'-'+(mon<10?('0'+mon):mon)+'-'+(day<10?('0'+day):day);
    if(n === 6){
      this.setState({
        startDate: startDate
      },()=>{
        this.getList();
      });
    } else if(n === 30){
      this.setState({
        startDate: startDate
      },()=>{
        this.getList2();
      });
    }
    return startDate;
  }
  // 获取步数记录的数据
  getList(){
    axios.post(xcookUrl+'/CookbookResourcePlatform-api/healthy/getStep',{userId: urlParamsObj.userId, startDate: this.state.startDate, endDate: this.state.currentdate}).then((res)=>{
      const result = res.data.data;
      const xData = [];
      const yData = [];
      let totalNumber = 0;
      Toast.hide();
      const length = result.data.length;
      result.data.reverse().forEach((item,index)=>{
        xData.push(item.time.substring(5));
        yData.push(item.stepcount);
        if(length === 7){
          totalNumber+=item.stepcount;
          this.setState({
            stepcount: result.data[6].stepcount,
            calory: result.data[6].calory
          });
        } else {
        }
      });
      this.setState({
        totalNumber: totalNumber
      },()=>{
        if(this.state.totalNumber<=14000) {
          this.setState({
            suggestion: '运动量较低，请酌情增加运动量'
          });
        } else if (this.state.totalNumber >=14001 && this.state.totalNumber <= 35000) {
          this.setState({
            suggestion: '适当增加运动量有益健康'
          });
        } else if(this.state.totalNumber<=70000&&this.state.totalNumber>=35001) {
          this.setState({
            suggestion: '运动量较高，可根据身体状况适当调整'
          });
        } else {
          this.setState({
            suggestion: '运动量较高，请注意运动健康'
          });
        }
      });
      this.setState({
        xData: xData,
        yData: yData,
      },()=>{
        var content1Chart = echarts.init(document.getElementById('content1'));
        // 绘制图表
        let resu1 = '';
        content1Chart.clear();
        content1Chart.setOption({
          tooltip: {
            show: true,
            trigger: 'axis',
            formatter: function(params){
              console.log(result.data, 'dataaa');
              result.data.forEach((item,index)=>{
                if(item.time.includes(params[0].name)){
                  resu1 = `<div class="wrapVal">${params[0].value}&nbsp;步<br/>${item.calory}&nbsp;kcal</div>`;
                }
              });
              return resu1;
            },
            backgroundColor: '#26A6FF',
          },
          grid: {
            left: '14%',
            bottom: '10%',
            right: '5%',
          },
          xAxis: {
            axisLabel: {
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: '#AAAAAA',
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: ['rgba(152,152,152,.2)']
              }
            },
            data: this.state.xData
          },
          yAxis: [{
            type: 'value',
            scale: true,
            name: '步数',
            min: 0,
            axisLabel: {
              textStyle: {
                color: '#3C3939'
              },
              formatter: function(value, index){
                return value > 0 ? value : 0;
              },
            },
            nameTextStyle: {
              color: '#3C3939'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: ['rgba(152,152,152,.2)']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#AAAAAA',
                width: 1
              }
            },
          }],
          series: [{
            name: '步数',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#26A6FF',
                lineStyle: {
                  color: '#26A6FF'
                },
              }
            },
            symbolSize: 6,
            areaStyle: {normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#1495EB'},
                  {offset: 0.5, color: '#C0E2F9'},
                  {offset: 1, color: '#ffffff'}
                ]
              )
            }},
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: (params)=>{
                  console.log(params, 'params');
                }
              }
            },
            data: this.state.yData
          }]
        });
      });
    }).catch((e)=>{
      console.log(e);
    });
  }


  // 获取步数记录的数据
  getList2(){
    var dataset = {
      userId: urlParamsObj.userId,
      startDate: this.state.startDate, 
      endDate: this.state.currentdate,
      pageSize: 29,
    };
    axios.post(xcookUrl+'/CookbookResourcePlatform-api/healthy/getStep',dataset).then((res)=>{
      const result = res.data.data;
      const xData = [];
      const yData = [];
      let totalNumber = 0;
      Toast.hide();
      const length = result.data.length;
      result.data.reverse().forEach((item,index)=>{
        xData.push(item.time.substring(5));
        yData.push(item.stepcount);
        if(length === 7){
          totalNumber+=item.stepcount;
          this.setState({
            stepcount: result.data[6].stepcount,
            calory: result.data[6].calory
          });
        } else {
        }
      });
      this.setState({
        totalNumber: totalNumber
      },()=>{
      });
      this.setState({
        xData: xData,
        yData: yData,
      },()=>{
        // 绘制图表二
        var content2Chart = echarts.init(document.getElementById('content1'));
        // 绘制图表
        let resu2 = '';
        content2Chart.clear();
        content2Chart.setOption({
          // title: {
          //   text: '步数',
          //   textStyle: {
          //     fontSize: '12',
          //     color: '#3C3939'
          //   }
          // },
          tooltip: {
            show: true,
            trigger: 'axis',
            formatter: function(params){
              result.data.forEach((item,index)=>{
                if(item.time.includes(params[0].name)){
                  resu2 = `<div class="wrapVal">${params[0].value}&nbsp;步<br/>${item.calory}&nbsp;kcal</div>`;
                }
              });
              return resu2;
            },
            backgroundColor: '#26A6FF',
          },
          grid: {
            left: '14%',
            bottom: '10%',
            right: '5%',
          },
          xAxis: {
            axisLabel: {
              interval: 4
            },
            axisLine: {
              lineStyle: {
                color: '#AAAAAA'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: ['rgba(152,152,152,.2)']
              }
            },
            data: this.state.xData
          },
          yAxis: [{
            type: 'value',
            scale: true,
            name: '步数',
            min: 0,
            axisLabel: {
              textStyle: {
                color: '#3C3939'
              },
              formatter: function(value, index){
                return value > 0 ? value : 0;
              }
            },
            nameTextStyle: {
              color: '#3C3939'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: ['rgba(152,152,152,.2)']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#AAAAAA'
              }
            }
          }],
          series: [{
            name: '步数',
            type: 'line',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#26A6FF',
                lineStyle: {
                  color: '#26A6FF'
                },
              }
            },
            areaStyle: {normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#1495EB'},
                  {offset: 0.5, color: '#C0E2F9'},
                  {offset: 1, color: '#ffffff'}
                ]
              )
            }},
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: (params)=>{
                  console.log(params, 'params');
                }
              }
            },
            data: this.state.yData
          }]
        });
      });
    }).catch((e)=>{
      console.log(e);
    });
  }
  handleTabClick(tab){
    this.setState({
      showSeven: !this.state.showSeven
    });
    if(tab === 2){
      this.getBeforeDate(30);
    } else {
      this.getBeforeDate(6);
    }
  }
  render() {
    const {stepcount,calory,suggestion} = this.state;
    const clientWidth = document.documentElement.clientWidth;
    return (
      <div className="sport__container">
        <div className="header__container" style={{marginTop: 0}}>
          <h3 className="header__title">今日步数</h3>
          <div className="header__account">
            <div className="header__number">
              <span className="footer"><img src={footImg} className="footerImg" alt=""/></span>
              <span className="today__count">{stepcount}</span>
              <span className="today__bu">步</span>
            </div>
          </div>
          <p className="header__total"><span className="fireImg"><img src={fireImg}/></span>共燃脂<span className="header__cal">{calory}</span>kcal</p>
        </div>
        <div className="content__suggest">
          <h2 className="content__title">本周运动量评估</h2>
          <p className="content__suggest_desc">{suggestion}</p>
        </div>
        <div className="content__container">
          <h2 className="content__title">步数记录</h2>
          <div className="btn__group">
            <span className={this.state.showSeven?'active': ''} onClick={()=>this.handleTabClick(1)}>最近7天</span>
            <span className={this.state.showSeven === false?'active': ''} onClick={()=>this.handleTabClick(2)}>最近30天</span>
          </div>
          <div id="content1" style={{ alignItems: 'center', justifyContent: 'center',width: '100%', height: '300px', backgroundColor: '#fff' }}>
          </div>
        </div>
      </div>
    );
  }
}