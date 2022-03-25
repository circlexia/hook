const cabinNameLocationList = [
  {
    name: '全舱室',
    location: -1
  },{
    name: '冷藏室',
    location: 1
  },{
    name: '冷冻室1',
    location: 2
  },{
    name: '冷冻室2',
    location: 3
  },{
    name: '变温室',
    location: 4
  },{
    name: '左变温室',
    location: 5
  },{
    name: '右变温室',
    location: 6
  },{
    name: '上变温室',
    location: 7
  },{
    name: '下变温室',
    location: 8
  },{
    name: '007多功能变温室',
    location: 9
  },{
    name: '小变温室',
    location: 10
  },{
    name: '大变温室',
    location: 11
  },{
    name: '冷冻室',
    location: 12
  },{
    name: '上冷冻室',
    location: 13
  },{
    name: '下冷冻室',
    location: 14
  },{
    name: '左冷冻室',
    location: 15
  },{
    name: '右冷冻室',
    location: 16
  },{
    name: '保湿室',
    location: 17
  },{
    name: '冷冻变温室',
    location: 18
  },{
    name: '冷藏变温室',
    location: 19
  },{
    name: '保湿',
    location: 20
  }
];
const cabinLocation = {
  '冷藏室': 1,
  '冷冻室1': 2,
  '冷冻室2': 3,
  '变温室': 4,
  '左变温室': 5,
  '右变温室': 6,
  '上变温室': 7,
  '下变温室': 8,
  '007多功能变温室': 9,
  '小变温室': 10,
  '大变温室': 11,
  '冷冻室': 12,
  '上冷冻室': 13,
  '下冷冻室': 14,
  '左冷冻室': 15,
  '右冷冻室': 16,
  '保湿室': 17,
  '冷冻变温室': 18,
  '冷藏变温室': 19,
  '保湿': 20,
};
const cabinName = {
  '冷藏室': '冷藏室',
  '冷冻室1': '冷冻室1',
  '冷冻室2': '冷冻室2',
  '变温室': 4,
  '左变温室': 5,
  '右变温室': 6,
  '上变温室': 7,
  '下变温室': 8,
  '007多功能变温室': 9,
  '小变温室': 10,
  '大变温室': 11,
  '冷冻室': 12,
  '上冷冻室': 13,
  '下冷冻室': 14,
  '左冷冻室': 15,
  '右冷冻室': 16,
  '保湿室': 17,
  '冷冻变温室': 18,
  '冷藏变温室': 19,
  '保湿': 20,
};
export function changeNameToLocation(name){

  var location = -1;
  cabinNameLocationList.map((item)=>{
    if(item.name === name){
      location=item.location;
    }
  });
  return location;
}
// const cabins = [{name:'冷藏室',location: 1}];
export function changeLocationToName(location) {
  var name = '未定义的舱室';
  cabinNameLocationList.map((item)=>{
    if(item.location === location){
      name=item.name;
    }
  });
  return name;
}

//计算保质期剩余方法
export function figTime(shelfLife, dateOfProduct) {
  // 接口返回：
  // dateOfProduct（时间戳）
  // shelfLife（保质期：天）
  // 计算保质期时间戳：shelfLifeTime（保质期对应的时间戳） = shelfLife*24*60*60*1000
  // 计算过期时间：overDueTime（过期时间戳）=dateOfProduct+shelfLifeTime
  // 获取当前时间戳：currentTime（当前时间戳） = new Date().getTime();
  // 计算百分比：(|currentTime-overDueTime|)/shelfLifeTime
  // 排序：overDueTime越小在越前面
  const shelfLifeTime = shelfLife * 24 * 60 * 60 * 1000;//保质期对应的时间戳
  const overDueTime = dateOfProduct + shelfLifeTime;//过期时间戳
  const currentTime = new Date().getTime();//当前时间戳
  const percent = (overDueTime - currentTime < 0 ? 0 : overDueTime - currentTime) / shelfLifeTime * 100;
  let flag = 0;//0: 已过期，1快过期，2新鲜
  let flagTime = 0;
  if(percent>0){
    const day = (overDueTime - currentTime)/(24 * 60 * 60 * 1000);
    if(day>1){//未过期
      flag = 2;
    }else{//快过期
      flag = 1;
    }
  }
  return { percent: percent, flag: flag, flagTime: flagTime,overDueTime: overDueTime };
}


function fomatDate(now) {
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  return year+'年'+month+'月'+date+'日';
}
export function figInfo(name, picUrl, location, dateOfProduct, shelfLife) {//时间戳日期转换方法
  var query = {
    pathname: '/Detail',
    query: {
      father: 'Draw',
      name: name,
      picUrl: picUrl,
      data: [
        {
          name: '所在温区',
          content: location
        },
        {
          name: '生产日期',
          content: fomatDate(new Date(dateOfProduct))//2019/4/1
        },
        {
          name: '过期日期',
          // content: this.props.todo.dateOfProduct + this.props.todo.shelfLife*3600*24*1000
          content: fomatDate(new Date(dateOfProduct + shelfLife * 3600 * 24 * 1000))
        }
      ]
    }
  };

  // function fomatDate(date){
  //   console.log('daaaaaaa_before',date)
  //   var arr =date.split('/');
  //   return arr[0]+'年'+arr[1]+'月'+arr[2]+'日'
  // }
  return query;
}



//根据指定的字段删除数组对象的对应对象
export function delArr(arr, iden) {
  var id = iden;//要删除的id
  var array = arr;
  var newArr = array.filter(function (obj) {
    return id !== obj.id;
  });
  return newArr;
}

export function findArr(arr, cabinID) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].location === cabinID) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

export function setProps(props,routeName){
  const { location } = props;
  let locationQuery ='';
  if (location&&location.query) {//当state有参数时，取参数并存到sessionStorage中
    locationQuery = location.query;
    sessionStorage.setItem(routeName+'location_query', JSON.stringify(locationQuery));// 存入到sessionStorage中
  } else {
    locationQuery = JSON.parse(sessionStorage.getItem(routeName+'location_query'));// 当state没有参数时，取sessionStorage中的参数
  }
  return locationQuery;
}


//修改对象数组某个对象的属性
export function updateFood(list1, changes) {
  //寻找处于数组的下标位置并修改属性
  var list = list1;
  var listItem = list.filter(item =>item.id ===changes.id)[0];
  listItem.dateOfProduct = changes.dateOfProduct;//保质期作为创造时间
  listItem.shelfLife = changes.shelfLife;
  return list;
}
//容器初始化


export function strlen(str){//判断字符串长度
  var len = 0;
  if (!str) {
    return len;
  }
  for (var i=0; i<str.length; i++) { 
    var c = str.charCodeAt(i); 
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
      len++; 
    }else { 
      len+=2; 
    } 
  } 
  return len;
}
export function getyyyyMMdd(){
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  const day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
  const hours = nowDate.getHours()< 10 ? '0' + nowDate.getHours() : nowDate.getHours();
  const minutes = nowDate.getMinutes()< 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
  const seconds = nowDate.getSeconds()< 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();
  const dateStr = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  return dateStr;
}  