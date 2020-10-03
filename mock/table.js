const Mock = require('mockjs');

function getPaginationNum(pageSize, currentPage) {
  return { start: (currentPage-1)*pageSize, end: currentPage*pageSize }
}

// page-table
const pageTableData = [];
for(let i=0; i<Mock.Random.integer( 30, 200 ); i++) {
  pageTableData.push(Mock.mock({
    date: Mock.Random.date('yyyy-MM-dd'),
    name: Mock.Random.first(),
    address: Mock.Random.cparagraph( 5, 10 )
  }))
}

module.exports = [
  {
    url: '/table/dynamic-table/getTableData',
    type: 'post',
    response: req => {

      if(!req.cookies.token) {
        return {
          code: 60204,
          message: '获取token失败',
          success: false
        }
      }

      // dynamic-table
      const tableData = [];
      for(let i=0; i<Mock.Random.integer( 0, 30 ); i++) {
        tableData.push(Mock.mock({
          date: Mock.Random.date('yyyy-MM-dd'),
          name: Mock.Random.first(),
          address: Mock.Random.cparagraph( 5, 12 )
        }))
      }

      return {
        code: 20000,
        data: {
          data: tableData,
          total: tableData.length
        },
        message: '获取数据成功',
        success: true
      }
    }
  },
  {
    url: '/table/page-table/getTableData',
    type: 'post',
    response: req => {

      if(!req.cookies.token) {
        return {
          code: 60204,
          message: '获取token失败',
          success: false
        }
      }

      const { pageSize, currentPage } = req.body;
      let indexDict = getPaginationNum(pageSize, currentPage);

      return {
        code: 20000,
        data: {
          data: pageTableData.slice(indexDict.start, indexDict.end),
          total: pageTableData.length
        },
        message: '获取数据成功',
        success: true
      }
    }
  },
  {
    url: '/table/scroll-table/getTableData',
    type: 'post',
    response: req => {
      if(!req.cookies.token) {
        return {
          code: 60204,
          message: '获取token失败',
          success: false
        };
      }

      const tableData = [];
      for(let i=0; i<Mock.Random.integer( 30000, 100000 ); i++) {
        tableData.push(Mock.mock({
          date: Mock.Random.date('yyyy-MM-dd'),
          name: Mock.Random.first(),
          address: Mock.Random.cparagraph( 5, 12 )
        }))
      }

      return {
        code: 20000,
        data: {
          data: tableData,
        },
        message: '获取数据成功',
        success: true
      }
    }
  }
];
