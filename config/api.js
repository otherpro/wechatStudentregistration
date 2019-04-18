const ApiRootUrl = 'http://127.0.0.1:8080/studentregistration/';
// const ApiRootUrl = 'http://127.0.0.1:8360/api/';

module.exports = {

  AcademyList  : ApiRootUrl   + 'academy/list', //所有学院进行选择
  AcademyDetail: ApiRootUrl + 'academy/detail', //学院
  AcademyDelete: ApiRootUrl + 'academy/delete', //学院
  AcademyUpdate: ApiRootUrl + 'academy/update', //学院

  CourseList  : ApiRootUrl + 'course/list', //所有课程进行选择
  CourseDetail: ApiRootUrl + 'course/detail', //课程
  CourseDelete: ApiRootUrl + 'course/delete', //课程
  CourseUpdate: ApiRootUrl + 'course/update', //课程
  CourseAdd: ApiRootUrl + 'course/add', //课程

  StudentList: ApiRootUrl + 'student/list', //所有学生进行选择
  StudentDetail: ApiRootUrl + 'student/detail', //学生
  StudentDelete: ApiRootUrl + 'student/delete', //学生
  StudentUpdate: ApiRootUrl + 'student/update', //学生

  TeacherList: ApiRootUrl + 'teacher/list', //所有教师进行选择
  TeacherDetail: ApiRootUrl + 'teacher/detail', //教师
  TeacherDelete: ApiRootUrl + 'teacher/delete', //教师
  TeacherUpdate: ApiRootUrl + 'teacher/update', //教师

  StudentCourseList  : ApiRootUrl + 'studentCourse/list', //所有学院进行选择
  StudentCourseDetail: ApiRootUrl + 'studentCourse/detail', //学生选课记录
  StudentCourseDelete: ApiRootUrl + 'studentCourse/delete', //学生选课记录
  StudentCourseUpdate: ApiRootUrl + 'studentCourse/update', //学生选课记录


  CourseSelectDelete: ApiRootUrl + 'courseSelect/delete', //抢课
  CourseSelectUpdate: ApiRootUrl + 'courseSelectId/update', //抢课
  CourseSelectAdd: ApiRootUrl + 'courseSelect/add', //抢课
  CourseSelectUpdateDate: ApiRootUrl + 'courseSelect/updateDate', //抢课时间增加 删除  修改

  CourseSelectList: ApiRootUrl + 'courseSelect/list', //查询课程
  CourseSelectDetail: ApiRootUrl + 'courseSelect/detail', //课程详细信息
  CourseSelectExposer: ApiRootUrl + 'courseSelect/exposer', //抢课接口
  CourseSelectExecute: ApiRootUrl + 'courseSelect/execution', //提交课程选择
  CourseSelectTime: ApiRootUrl + 'courseSelect//time/now', //查询系统时间


  AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin', //微信登录
  AuthLoginByAccount: ApiRootUrl + 'auth/loginByAccount', //账号登录

  IndexUrl: ApiRootUrl + 'index/index', //首页数据接口
  CatalogList: ApiRootUrl + 'catalog/index',  //分类目录全部分类数据接口
  CatalogCurrent: ApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口


  GoodsCount: ApiRootUrl + 'goods/count',  //统计商品总数
  GoodsList: ApiRootUrl + 'goods/list',  //获得商品列表
  GoodsCategory: ApiRootUrl + 'goods/category',  //获得分类数据
  GoodsDetail: ApiRootUrl + 'goods/detail',  //获得商品的详情
  GoodsNew: ApiRootUrl + 'goods/new',  //新品
  GoodsHot: ApiRootUrl + 'goods/hot',  //热门
  GoodsRelated: ApiRootUrl + 'goods/related',  //商品详情页的关联商品（大家都在看）

  BrandList: ApiRootUrl + 'brand/list',  //品牌列表
  BrandDetail: ApiRootUrl + 'brand/detail',  //品牌详情

  CartList: ApiRootUrl + 'cart/index', //获取购物车的数据
  CartAdd: ApiRootUrl + 'cart/add', // 添加商品到购物车
  CartUpdate: ApiRootUrl + 'cart/update', // 更新购物车的商品
  CartDelete: ApiRootUrl + 'cart/delete', // 删除购物车的商品
  CartChecked: ApiRootUrl + 'cart/checked', // 选择或取消选择商品
  CartGoodsCount: ApiRootUrl + 'cart/goodscount', // 获取购物车商品件数
  CartCheckout: ApiRootUrl + 'cart/checkout', // 下单前信息确认

  OrderSubmit: ApiRootUrl + 'order/submit', // 提交订单
  PayPrepayId: ApiRootUrl + 'pay/prepay', //获取微信统一下单prepay_id

  CollectList: ApiRootUrl + 'collect/list',  //收藏列表
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete',  //添加或取消收藏

  CommentList: ApiRootUrl + 'comment/list',  //评论列表
  CommentCount: ApiRootUrl + 'comment/count',  //评论总数
  CommentPost: ApiRootUrl + 'comment/post',   //发表评论

  TopicList: ApiRootUrl + 'topic/list',  //专题列表
  TopicDetail: ApiRootUrl + 'topic/detail',  //专题详情
  TopicRelated: ApiRootUrl + 'topic/related',  //相关专题

  SearchIndex: ApiRootUrl + 'search/index',  //搜索页面数据
  SearchResult: ApiRootUrl + 'search/result',  //搜索数据
  SearchHelper: ApiRootUrl + 'search/helper',  //搜索帮助
  SearchClearHistory: ApiRootUrl + 'search/clearhistory',  //搜索帮助

  AddressList: ApiRootUrl + 'address/list',  //收货地址列表
  AddressDetail: ApiRootUrl + 'address/detail',  //收货地址详情
  AddressSave: ApiRootUrl + 'address/save',  //保存收货地址
  AddressDelete: ApiRootUrl + 'address/delete',  //保存收货地址

  RegionList: ApiRootUrl + 'region/list',  //获取区域列表

  OrderList: ApiRootUrl + 'order/list',  //订单列表
  OrderDetail: ApiRootUrl + 'order/detail',  //订单详情
  OrderCancel: ApiRootUrl + 'order/cancel',  //取消订单
  OrderExpress: ApiRootUrl + 'order/express', //物流详情

  FootprintList: ApiRootUrl + 'footprint/list',  //足迹列表
  FootprintDelete: ApiRootUrl + 'footprint/delete',  //删除足迹
};