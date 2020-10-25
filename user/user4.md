---
title: 基础功能操作
date: 2020-10-23
categories:
 - 基础操作
tags:
 - 基础
isShowComments: true
---

::: warning 基础操作:
系统的界面结构沿用了微软经验的T型结构，在微软的很多产品里经常会用到，上面是一级菜单和快捷方式功能键，左边是二级菜单，右边是功能区。
:::

## 1、上传附件
您在发布信息、提报流程、发送邮件时都会看到“上传附件”按钮。点击“上传附件”按钮，将弹出页面，提示“请选择要上传的文件”。点击“浏览”，打开“选择文件”窗口。 选中想要上传的文件后，点击“打开”按钮，即可看到文件上传进度。点击文件前图标“×”可将附件删除。
 >**`附图`** 

![An images](/images/14.png)

##  2、附件在线预览
如果系统开启了在线预览功能，所有有附件的地方，均可以点击附件预览按钮“![An images](/images/15.png) ” 点击直接显示可以预览的内容，支持office格式、txt文件、图片（jpg、gif、png、bmp格式）的直接预览，预览过后也可下载保存。


## 3、HTML编辑器
介绍如图所见的在线编辑器适用于表单设置、信息内容编辑等，界面主要分为以下三大部分:
> **`附图`** 

![An images](/images/16.png)


## 工具栏: 
编辑器顶部为工具栏，主要放置各种编辑功能的选项及按钮图标，使用者只需点击图标或选择相关选项即可实时对编辑栏编辑的内容进行添加或修改、修饰（使用与Word、wps、相类似）。 
## 源码: 
与一般编辑器区别于编辑器左上角为源码状态可与文本状态相互切换，点击图标“源码”在此状态下所有编辑的内容皆以HTML标记源代码方式显示，用法：某些表单可直接复制源码切换为文本显示，文本状态工具栏无法满足需求可修改源码实现。 

```json
<table border="1" cellpadding="2" cellspacing="0"
 style="border-collapse:collapse;border:1px solid #000000;width:100%;">
	<caption>
    <div style="text-align: center;"><span style="font-size:20px;"><strong>
    <span style="color:#000000;">物 料 编 码 申 请&nbsp;单</span></strong></span></div>
	</caption>
	<tbody>
		<tr>
			<td style="text-align: center;">申请人</td>
			<td>
			<div data-column="xz_material_request_requester">[申请人]</div>
			</td>
			<td>申请部门</td>
			<td>
			<div data-column="xz_material_request_organizationid">[申请部门]</div>
			</td>
			<td>申请时间</td>
			<td>
			<div data-column="xz_material_request_time">[申请时间]</div>
			</td>
		</tr>
		<tr>
			<td style="text-align: center;">备注</td>
			<td colspan="5" rowspan="1">
			<div data-column="xz_material_request_descript">[原由]</div>
			</td>
		</tr>
		<tr>
			<td colspan="6" style="text-align: center;"></td>
		</tr>
	</tbody>
</table>

```

## 编辑器: 
编辑器中部空白处为编辑区，主要是供使用者输入及编辑内容所用，同时所编辑的内容全部都是所见即所得。编辑器编辑区主要放置供使用者编辑内容的编辑框，若内容超出框架宽度或长度的话，会自动出现滚动条。另外还可通过状态栏的状态转换，来控制编辑框的不同编辑状态。 

