//一些公共函数
export default {
  // 表格通用样式 斑马纹 行
  rowStyle({ row, rowIndex }) {
    if (rowIndex % 2 === 0) {
      return {
        'background-color':'#F5F5F9',
        'height': '50px'
      }
    } else {
      return {
        'background-color':'#FFFFFF',
        'height': '50px'
      }
    }
  },

  // 灰色背景表格样式 斑马纹 行
  rowStyleGrey({ row, rowIndex }) {
    if (rowIndex % 2 === 0) {
      return {
        'background-color':'#DDDFE4',
        'height': '50px'
      }
    } else {
      return {
        'background-color':'#EEF0F4',
        'height': '50px'
      }
    }
  },

  // 表格状态 颜色
  cellStyle(key, stateMap, colIndex) {
    // 0 绿色 1 黄色 2 红色
    const styleList = [{
      'color': '#21BF74'
    },{
      'color': '#FAAD14'
    },{
      'color': '#BF495A'
    },]
    return function ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === colIndex) {
        return styleList[stateMap[row[key]]]
      }
      return ''
    }
  },

  /* 去除为空的字段*/
  nullValueFun(data) {
    var obj = {}
    for (var key in data) {
      // 如果属性为guaHaoLeiXing
      if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
        obj[key] = data[key]
      }
    }
    return obj
  },
  /* 用来切割query */
  getQueryVariable(path, variable)
  {
    let querys = path.split('?')
    if(querys.length > 1) {
      let query = querys[1];
      let vars = query.split("&");
      for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
      }
    }
    return(false);
  }
}
