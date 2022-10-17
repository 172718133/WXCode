
/**API数据接口**/

//基地址
var BASEURL = "http://localhost:8084/snake/";
// var BASEURL = "http://39i3541c70.qicp.vip/snake/";
//登录
const LOGIN_URL = BASEURL + "userinfo/selectAll";
//注册
const REGISTER_URL = BASEURL + "userinfo/insertUserinfo";
//更新用户信息
const UPDATE_USER_URL = BASEURL + "userinfo/updateUserinfo";
//发布
const PUBLISH_URL = BASEURL + "publishinfo/insertPublishinfo";
//上传图片地址
const UPLOAD_IMAGE_URL = BASEURL + "upload/uploadFile";
//获取所有日记数据
const GET_PUBLISHVIEWINFO_URL = BASEURL + "publishviewinfo/selectAll";
//删除日记
const DELETE_PUBLISHINFO_URL = BASEURL + "publishinfo/deletePublishinfo";
//添加一级评论
const INSERT_EVALUATE_URL = BASEURL + "evaluate/insertEvaluate";
//添加二级评论
const INSERT_SECONDARYEVALUATION_URL = BASEURL + "secondaryevaluation/insertSecondaryevaluation";
//获取一级评论数据
const GET_EVALUATE_URL = BASEURL + "evaluate/selectAll";
//获取二级评论数据
const GET_SECONDARYEVALUATION_URL = BASEURL + "secondaryevaluation/selectAll";
//添加建议反馈
const FEEDBACK_URL = BASEURL + "suggest/insertSuggest";
//查询关注和分数人数		
const SELECT_FOLLOWANDFANS_URL = BASEURL + "followandfans/selectAll";
//添加收藏	
const INSERT_UCOLLECT_URL = BASEURL + "ucollect/insertUcollect";
//查询收藏	
const SELECT_COLLECTINFO_URL = BASEURL + "collectinfo/selectAll";

//注册登录
const NEW_REGISTER_URL = BASEURL + "user";//登录
const NEW_KYF_URL = BASEURL + "device/list";
const NEW_ydl_URL = BASEURL + "electric";//用电分析
const NEW_yxsjgl_URL = BASEURL + "setting";//首页
const NEW_swdjl_URL = BASEURL + "yxjl";//运行记录
const NEW_swddyf_URL = BASEURL + "temperature/list";//湿温度记录
const NEW_CIDT_URL = BASEURL + "device/";//设备台帐
const NEW_GAOJIN_URL = BASEURL + "report";//告警设置
const NEW_GAOJINLIST_URL = BASEURL + "warn/list";//告警事件-列表
const NEW_BAOXIUs_URL = BASEURL + "wxiu/list";//一键报修-列表
const NEW_CELUEsd_URL = BASEURL + "strategy/list";//策略-列表
const NEW_SFGUANZ_URL = BASEURL + "attention";//关注

export default{
	BASEURL,
	LOGIN_URL,
	REGISTER_URL,
	PUBLISH_URL,
	UPLOAD_IMAGE_URL,
	GET_PUBLISHVIEWINFO_URL,
	DELETE_PUBLISHINFO_URL,
	INSERT_EVALUATE_URL,
	INSERT_SECONDARYEVALUATION_URL,
	GET_EVALUATE_URL,
	GET_SECONDARYEVALUATION_URL,
	UPDATE_USER_URL,
	FEEDBACK_URL,
	SELECT_FOLLOWANDFANS_URL,
	INSERT_UCOLLECT_URL,
	SELECT_COLLECTINFO_URL,
	NEW_REGISTER_URL,
	NEW_KYF_URL,
	NEW_ydl_URL,
	NEW_yxsjgl_URL,
	NEW_swdjl_URL,
	NEW_swddyf_URL,
	NEW_CIDT_URL,
	NEW_GAOJIN_URL,
	NEW_GAOJINLIST_URL,
	NEW_BAOXIUs_URL,
	NEW_CELUEsd_URL,
	NEW_SFGUANZ_URL
}


