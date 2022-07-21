import { get, post, ajaxDelete, IResult } from './fetch';
import { IAnyObject } from '@src/types';
import { download, uploadFile } from './download';

interface IZXApi {
	[propNames: string]: (params: IAnyObject) => Promise<IResult>;
}
const userServe = 'cloud-service';
const baseServe = 'cloud-service';
const fileServe = 'file-service';
const ZXApi: IZXApi = {
	// 获取学生列表
	getStudentsList(params) {
		return get({
			url: `/cloud-service/student/studentList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 单文件上传接口
	upload(params) {
		return uploadFile({
			url: `${fileServe}/file/upload`,
			params: params
		});
	},
	// 多文件上传接口
	multiUpload(params) {
		return post({
			url: `${fileServe}/file/upload/multipart`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 省市区查询
	getRegion() {
		return get({
			url: `${baseServe}/regionInfo/region_tree`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加学生
	addStudent(params) {
		return post({
			url: `cloud-service/student/studentAdd`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 查询学生详情
	queryStudent(params) {
		return get({
			url: `cloud-service/student/studentDetailExtend`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 重置密码
	resetPassword(params) {
		return post({
			url: `cloud-service/student/resetPassword?sn=${params.sn}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 字典查询
	getDictionary(params) {
		return get({
			url: `cloud-service/clouddictionary/sub/${params.code}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 学段查询
	getSchStage() {
		return get({
			url: `${userServe}/school/schStageList`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 年级查询
	getSchStuGrade(params) {
		return get({
			url: `cloud-service/grade/schoolGradeList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 班级查询
	getSchClass(params) {
		return get({
			url: `cloud-service/cloudClass/gradeClassList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除学生
	deleteStudents(params) {
		return ajaxDelete({
			url: `cloud-service/student/batchDelete?insSn=${params.insSn}`,
			data: params.snList,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 批量休学
	batchSuspension(params) {
		return post({
			url: `cloud-service/student/batchSuspension`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 编辑学生信息
	upDateTudent(params) {
		return post({
			url: `cloud-service/student/studentModify`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 停用、启用用户
	statusSwitch(params) {
		return post({
			url: `cloud-service/student/batchStatusSwitch`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 学校用户列表
	getTeacherList(params) {
		return get({
			url: `cloud-service/teacher/teacherList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 停用、启用教师用户
	teacherDisable(params) {
		return post({
			url: `cloud-service/teacher/batchStatusSwitch`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	//获取角色列表
	getRoleList(params) {
		return get({
			url: `cloud-service/cloudrole/roleList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 查询教师详情
	queryTeacher(params) {
		return get({
			url: `cloud-service/teacher/teacherDetailExtend`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 编辑老师信息
	upDateTeacher(params) {
		return post({
			url: `cloud-service/teacher/teacherModify`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 重置教师端密码
	resetTeacherPassword(params) {
		return post({
			url: `cloud-service/teacher/resetPassword?sn=${params.sn}`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取指定类型课程列表
	getMajorList(params) {
		return get({
			url: `cloud-service/cloudMajor/majorList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加教师用户
	addTeacher(params) {
		return post({
			url: `cloud-service/teacher/teacherAdd`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除教师
	deleteTeachers(params) {
		return ajaxDelete({
			url: `cloud-service/teacher/batchDelete?insSn=${params.insSn}`,
			data: params.arr,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 社会人士列表
	getGuardianList(params) {
		return get({
			url: `cloud-service/sociologyUser/sociologyUserList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 社会人士详情
	querySociologyDetail(params) {
		return get({
			url: `cloud-service/sociologyUser/sociologyUserDetail`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 停用、启用社会人士用户
	batchSociologyDisable(params) {
		return post({
			url: `cloud-service/sociologyUser/batchStatusSwitch`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 重置社会人士用户密码
	resetSociologyPassword(params) {
		return post({
			url: `cloud-service/sociologyUser/resetPassword?sn=${params.sn}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 编辑社会人士
	upDateSociology(params) {
		return post({
			url: `cloud-service/sociologyUser/sociologyUserModify`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除社会人士
	deleteGuardian(params) {
		return ajaxDelete({
			url: `${userServe}/guardian/batchDelete`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 平台用户列表
	getPlatformList(params) {
		return get({
			url: `cloud-service/platformUser/platformUserList`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 停用、启用平台用户
	resetPlatformDisable(params) {
		return post({
			url: `cloud-service/platformUser/batchStatusSwitch`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 重置平台用户密码
	resetPlatformPassword(params) {
		return post({
			url: `cloud-service/platformUser/resetPassword?sn=${params.sn}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 新增平台用户
	addPlatformUser(params) {
		return post({
			url: `cloud-service/platformUser/platformUserAdd`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 平台用户详情
	queryPlatformDetail(params) {
		return get({
			url: `cloud-service/platformUser/platformUserDetail`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 编辑平台用户
	modifyPlatformUser(params) {
		return post({
			url: `cloud-service/platformUser/platformUserModify`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除平台用户
	deletePlatformUser(params) {
		return ajaxDelete({
			url: `cloud-service/platformUser/batchDelete`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},

	/** ----------------------------------------- 班级/社团管理 --------------------------------------------------- */

	// 删除班级
	deleteClass(params) {
		return ajaxDelete({
			url: `${userServe}/class/${params.id}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 根据学年获取班级列表
	getYearByClass(params) {
		return get({
			url: `${userServe}/class/listByAdmissionYear`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 班级详情
	queryClass(params) {
		return get({
			url: `${userServe}/class/detail`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 班级列表
	getClassList(params) {
		return get({
			url: `${userServe}/class/list`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 新增教学班级
	addClass(params) {
		return post({
			url: `${userServe}/class/addClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 批量创建班级
	batchCreateClass(params) {
		return post({
			url: `${userServe}/class/batchCreateClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 修改教学班级
	modifyClass(params) {
		return post({
			url: `${userServe}/class/modifyClass`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 停用、启用班级
	statusClass(params) {
		return post({
			url: `${userServe}/class/statusSwitch/{id}`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},

	/** ----------------------------------------- 综合评价管理 ------------------------=------------------------- */

	// 指标详情
	getEvaluatingKpiDetail(params) {
		return get({
			url: `comprehensive-service/evaluatingKpi/detail`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 指标列表
	getEvaluatingKpiList(params) {
		return get({
			url: `comprehensive-service/evaluatingKpi/list`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 保存或更新一 二级指标
	saveBaseKpi(params) {
		return post({
			url: `comprehensive-service/evaluatingKpi/saveOrUpdateBaseKpi`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 保存或更新填报指标
	saveFillKpi(params) {
		return post({
			url: `comprehensive-service/evaluatingKpi/saveOrUpdateFillKpi`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 指标排序
	kpiSort(params) {
		return post({
			url: `comprehensive-service/evaluatingKpi/kpiSort`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 保存或更新评价指标
	saveTermKpi(params) {
		return post({
			url: `comprehensive-service/evaluatingKpi/saveOrUpdateTermKpi`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除指标
	deleteEvaluatin(params) {
		return ajaxDelete({
			url: `comprehensive-service/evaluatingKpi/delete/${params.id}`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取评价模板列表
	getTemplateList(params) {
		return get({
			url: `comprehensive-service/evaluatingKpiScoreLevelTemplate/list`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 查询评价计划列表
	getEvaluatePlanList(params) {
		return get({
			url: `comprehensive-service/evaluatePlan/list`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	//  评价计划批量更新
	setEvaluatePlan(params) {
		return post({
			url: `comprehensive-service/evaluatePlan/batchUpdate`,
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取学年
	getkpiYear(params) {
		return get({
			url: `user-service/tbSemester/kpiPlanAcademicYear`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取学年的学期配置
	getkpiSemester(params) {
		return get({
			url: `user-service/tbSemester/kpiPlanSemester`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},

	/**********************************************  第二版   **************************************************/
	// 获取区域
	getInsTreeList(params) {
		return get({
			url: 'cloud-service/cloudInstitution/insTree',
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 机构用户列表
	getInstitutionUserList(params) {
		return get({
			url: 'cloud-service/institutionUser/insList',
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 获取角色列表
	getCloudRoleList(params) {
		return get({
			url: 'cloud-service/cloudrole/roleList',
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 删除用户
	deleteInstitutionUser(params) {
		return ajaxDelete({
			url: `cloud-service/institutionUser/batchDelete?insSn=${params.insSn}`,
			data: params.data,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 机构用户详细
	getInsUserDetail(params) {
		return get({
			url: `cloud-service/institutionUser/insUserDetail`,
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 停用、启用机构用户
	switchBatchStatus(params) {
		return post({
			url: 'cloud-service/institutionUser/batchStatusSwitch',
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 添加机构用户
	addInstitutionUse(params) {
		return post({
			url: 'cloud-service/institutionUser/insUserAdd',
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 修改机构用户
	modifyInstitutionUse(params) {
		return post({
			url: 'cloud-service/institutionUser/insUserModify',
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 机构用户重置密码
	resetInstitutionUserPassword(params) {
		return post({
			url: `cloud-service/institutionUser/resetPassword?sn=${params.sn}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 机构学校列表
	getCloudSchoolList(params) {
		return get({
			url: 'cloud-service/cloudSchool/list',
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 机构学校状态切换
	switchCloudSchoolStatus(params) {
		return post({
			url: `cloud-service/cloudSchool/statusSwitch?insSn=${params.insSn}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 机构学校详情
	getCloudSchoolDetail(params) {
		return get({
			url: `cloud-service/cloudSchool/schoolDetail?insSn=${params.insSn}`,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 社团列表
	getAssociationList(params) {
		return get({
			url: 'cloud-service/cloudAssociation/list',
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 意见反馈列表
	getCloudfeedbackList(params) {
		return get({
			url: 'cloud-service/cloudfeedback',
			params: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 查询意见反馈跟进情况
	queryCloudfeedback(params) {
		return get({
			url: `cloud-service/cloudfeedback/${params.id}`,
			loading: true,
			servicePrefix: 'default'
		});
	}
};

export default ZXApi;
