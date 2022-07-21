import { get, post, ajaxDelete, IResult } from './fetch';
import { IAnyObject } from '@src/types';
import { download } from './download';

interface Api {
	[propNames: string]: (params: IAnyObject) => Promise<IResult>;
}
const userServe = 'cloud-service';
const baseServe = 'cloud-service';
const fileServe = 'file-service';

const api: Api = {
	// 获取首页数据
	gethome(params) {
		return get({
			url: `${baseServe}/home/overview`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 登录日志
	getLoginLogList(params: any) {
		return get({
			url: '/cloud-service/cloudlogin',
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取课程列表
	getMajorList(params) {
		return get({
			url: `${baseServe}/cloudMajor`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加课程
	saveMajor(params) {
		return post({
			url: `${baseServe}/cloudMajor`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除课程
	deleteMajor(params) {
		return ajaxDelete({
			url: `${baseServe}/cloudMajor/${params.id}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 课程列表
	getStatisticalClassInfo() {
		return get({
			url: `${baseServe}/achievementCommon/statisticalClassInfo`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 下载模版
	getMajorExcel() {
		return download({
			url: `${baseServe}/cloudMajor/majorExcel`
		});
	},
	// 上传模版
	uploadMajorExcel() {
		return download({
			url: `${baseServe}/cloudMajor/majorExcel`
		});
	},
	// 学年学期列表
	getCloudSemester(params) {
		return get({
			url: `${baseServe}/cloudSemester`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 保存学年学期
	saveCloudSemester(params) {
		return post({
			url: `${baseServe}/cloudSemester`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取班级列表
	getClassList(params) {
		return get({
			url: `${baseServe}/cloudClass/list`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 班级停用启用
	switchBatchStatusSwitch(params) {
		return post({
			url: `${baseServe}/cloudClass/batchStatusSwitch`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除班级
	deleteBatchStatusSwitch(params) {
		return ajaxDelete({
			url: `${baseServe}/cloudClass/batchRemoveClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 新增行政班级
	addAdministrationClass(params) {
		return post({
			url: `${baseServe}/cloudClass/addAdministrationClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 修改行政班级
	modifyAdministrationClass(params) {
		return post({
			url: `${baseServe}/cloudClass/modifyAdministrationClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 批量新增行政班级
	batchCreateAdministrationClass(params) {
		return post({
			url: `${baseServe}/cloudClass/batchCreateAdministrationClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 新增教学班级
	addTeachingClass(params) {
		return post({
			url: `${baseServe}/cloudClass/addTeachingClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 修改教学班级
	modifyTeachingClass(params) {
		return post({
			url: `${baseServe}/cloudClass/modifyTeachingClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取学校年级
	schoolGradeList(params) {
		return get({
			url: `${baseServe}/grade/schoolGradeList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取指定学段课程列表
	getMajorListByStage(params) {
		return get({
			url: `${baseServe}/cloudMajor/majorList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取班级详情
	getCloudClassDetails(params) {
		return get({
			url: `${baseServe}/cloudClass/detail`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取班级教师列表
	teaClaRelList(params) {
		return get({
			url: `${baseServe}/teaClaRel/teaClaRelList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加老师进入班级所需老师列表
	teaClaRelUserList(params) {
		return get({
			url: `${baseServe}/teaClaRel/teaClaRelUserList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加老师进入行政班
	addAdministrationTeaClaRel(params) {
		return post({
			url: `${baseServe}/teaClaRel/addAdministrationTeaClaRel`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加老师进入教学班
	addTeachingTeaClaRel(params) {
		return post({
			url: `${baseServe}/teaClaRel/addTeachingTeaClaRel`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 修改行政班老师班级信息
	modifyAdministrationTeaClaRel(params) {
		return post({
			url: `${baseServe}/teaClaRel/modifyAdministrationTeaClaRel`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 批量删除班级老师
	batchDeleteTeaClaRel(params) {
		return post({
			url: `${baseServe}/teaClaRel/batchDeleteTeaClaRel`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 班级学生列表
	stuClaRelList(params) {
		return get({
			url: `${baseServe}/stuClaRel/stuClaRelList`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 添加学生进入班级所需学生列表
	stuClaRelUserList(params) {
		return get({
			url: `${baseServe}/stuClaRel/stuClaRelUserList`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 添加学生进入班级
	addStuClaRel(params) {
		return post({
			url: `${baseServe}/stuClaRel/addStuClaRel`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 批量删除班级学生
	batchDeleteStuClaRel(params) {
		return post({
			url: `${baseServe}/stuClaRel/batchDeleteStuClaRel`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 编辑班级学生信息
	modifyStuClaRel(params) {
		return post({
			url: `${baseServe}/stuClaRel/modifyStuClaRel`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 班级列表
	findClaList(params) {
		return get({
			url: `${baseServe}/achievementCommon/classes`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 国家课程成绩管-列表
	tbAchievementStgb(params) {
		return get({
			url: `${baseServe}/bcAchievementStgb`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 校本课程成绩管-列表
	tbAchievementSchool(params) {
		return get({
			url: `${baseServe}/bcAchievementSchool`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 研究性课程成绩管-列表
	achievementSchoolResearch(params) {
		return get({
			url: `${baseServe}/bcAchievementResearch`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 日常体育锻炼成绩(身心)-列表
	tbTbAchievementSports(params) {
		return get({
			url: `${baseServe}/bcAchievementSports`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 艺术课程成绩管-列表
	tbAchievementUngbArt(params) {
		return get({
			url: `${baseServe}/bcAchievementUngb/art`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 体质健康测试成绩(身心)-列表
	tbAchievementUngbHealth(params) {
		return get({
			url: `${baseServe}/bcAchievementUngb/health`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 下载成绩模版
	downloadTemplate(params) {
		return download({
			url: `${baseServe}/achievementCommon/downloadTemplate`,
			params: params
		});
	},
	// 下载成绩模版
	findStuInfo(params) {
		return get({
			url: `${baseServe}/achievementCommon/stuInfo`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 国家课程成绩管-单个学生成绩
	findTbAchievementStgb(params) {
		return get({
			url: `${baseServe}/bcAchievementStgb/findStuAchievement`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 国标课程成绩-保存
	saveTbAchievementStgb(params) {
		return post({
			url: `${baseServe}/bcAchievementStgb/save`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 校本课程成绩管理(学业)-单个学生成绩
	findTbAchievementSchool(params) {
		return get({
			url: `${baseServe}/bcAchievementSchool/findStuAchievement`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 校本课程成绩管理(学业)-保存
	saveTbAchievementSchool(params) {
		return post({
			url: `${baseServe}/bcAchievementSchool/save`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 科目列表
	findMajorList(params) {
		return get({
			url: `${baseServe}/achievementCommon/majors`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 老师列表
	getAllTea(params) {
		return get({
			url: `${baseServe}/achievementCommon/teachers`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 学期列表
	getSemesterList(params) {
		return get({
			url: `${baseServe}/achievementCommon/semesters`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 研究性学习成绩管理(学业)-单个学生成绩
	findAchievementSchoolResearch(params) {
		return get({
			url: `${baseServe}/bcAchievementResearch/findStuAchievement`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 研究性学习成绩管理(学业)-保存
	saveAchievementSchoolResearch(params) {
		return post({
			url: `${baseServe}/bcAchievementResearch/save`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 体质健康测试成绩(身心)-单个学生成绩
	findTbAchievementUngbHealth(params) {
		return get({
			url: `${baseServe}/bcAchievementUngb/health/findStuAchievement`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 体质健康测试成绩(身心)-保存
	saveTbAchievementUngbHealth(params) {
		return post({
			url: `${baseServe}/bcAchievementUngb/health/save`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 日常体育锻炼成绩(身心)-单个学生成绩
	findTbAchievementSports(params) {
		return get({
			url: `${baseServe}/bcAchievementSports/findStuAchievement`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 日常体育锻炼成绩(身心)-保存
	saveTbAchievementSports(params) {
		return post({
			url: `${baseServe}/bcAchievementSports/save`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 艺术素养成绩(艺术)-单个学生成绩
	findTbAchievementUngbArt(params) {
		return get({
			url: `${baseServe}/bcAchievementUngb/art/findStuAchievement`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 艺术素养成绩(艺术)-保存
	saveTbAchievementUngbArt(params) {
		return post({
			url: `${baseServe}/bcAchievementUngb/art/save`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 年级列表
	getGradeList(params) {
		return get({
			url: `${baseServe}/grade`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 新增年级
	saveGrade(params) {
		return post({
			url: `${baseServe}/grade`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 获取学生列表
	getStudentOfGradeList(params) {
		return get({
			url: `${baseServe}/student/studentOfGradeList`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 在读年级列表（学校）
	getschoolGradeList(params) {
		return get({
			url: `${baseServe}/grade/schoolGradeList`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 在年级中添加学生
	saveGradeJoin(params) {
		return post({
			url: `${baseServe}/grade/join`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 在年级中添加学生
	removeGrade(params) {
		return get({
			url: `${baseServe}/grade/remove/${params.id}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 根据类型查询协议
	getCloudinfo(params) {
		return get({
			url: `${baseServe}/cloudinfo`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 保存协议
	saveCloudinfo(params) {
		return post({
			url: `${baseServe}/cloudinfo`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 通知公告列表
	getCloudannouncementList(params) {
		return get({
			url: `${baseServe}/cloudannouncement`,
			loading: true,
			params: params,
			servicePrefix: 'default'
		});
	},
	// 保存通知公告
	saveCloudannouncement(params) {
		return post({
			url: `${baseServe}/cloudannouncement`,
			loading: true,
			data: params,
			servicePrefix: 'default'
		});
	},
	// 删除通知公告
	deleteCloudannouncement(params) {
		return ajaxDelete({
			url: `${baseServe}/cloudannouncement/${params.id}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 通过insSn去获取查找范围
	findInsByInsSn() {
		return get({
			url: `${baseServe}/cloudannouncement/findInsByInsSn`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除社团
	deleteCloudAssociation(params) {
		return ajaxDelete({
			url: `${baseServe}/cloudAssociation/delete`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 社团启用停用
	statusSwitchCloudAssociation(params) {
		return post({
			url: `${baseServe}/cloudAssociation/statusSwitch`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 社团管理移出成员
	batchDeleteAssociationMember(params) {
		return post({
			url: `${baseServe}/associationMember/batchDeleteAssociationMember`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 社团管理成员列表
	associationMemberList(params) {
		return get({
			url: `${baseServe}/associationMember/associationMemberList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 修改社团管理成员信息
	modifyAssociationMember(params) {
		return post({
			url: `${baseServe}/associationMember/modifyAssociationMember`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加学生进入社团所需学生列表
	associationMemberStudentList(params) {
		return get({
			url: `${baseServe}/associationMember/associationMemberStudentList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 学生加入社团
	addAssociationMember(params) {
		return post({
			url: `${baseServe}/associationMember/addAssociationMember`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加老师进入社团所需学生列表
	associationMemberTeacherList(params) {
		return get({
			url: `${baseServe}/associationMember/associationMemberTeacherList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 保存地方课程选用和取消选用
	cloudMajorSchoolRelation(params) {
		return post({
			url: `${baseServe}/cloudMajorSchoolRelation`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 查询所有机构年级管理数据
	grades(params) {
		return get({
			url: `${baseServe}/grade/grades`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 查看所有学年学期管理数据
	allAcademic(params) {
		return get({
			url: `${baseServe}/cloudAcademic/allAcademic`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	}
};

export default api;
