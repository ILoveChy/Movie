import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, InputNumber, Switch, message } from 'antd';
import ImgUploader from './ImgUploader';
import { withRouter } from 'react-router';


const { TextArea } = Input;
const AllAreas: { label: string, value: string }[] = [
  { label: "中国大陆", value: "中国大陆" },
  { label: "美国", value: "美国" },
  { label: "日本", value: "日本" },
  { label: "韩国", value: "韩国" },
  { label: "英国", value: "英国" },
  { label: "法国", value: "法国" },
  { label: "印度", value: "印度" },

]
const AreaGroups = Checkbox.Group
const AllTypes: { label: string, value: string }[] = [
  { label: "喜剧", value: "喜剧" },
  { label: "悬疑", value: "悬疑" },
  { label: "动作", value: "动作" },
  { label: "灾难", value: "灾难" },
  { label: "科幻", value: "科幻" },
  { label: "动漫", value: "动漫" }

]
const TypesGroups = Checkbox.Group
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 19,
    offset: 1
  }
}
const MovieForm = (props: any) => {

  const [form] = Form.useForm();
  useEffect(() => {
    if (props.movie) {
      console.log('加载成功');
      form.setFieldsValue({ ...props.movie });
    }
  });
  const handleFinish = async values => {
    const res = await props.onFinish(values)
    if (res) {
      message.error('提交失败')
    } else {
      message.success('提交成功', 1, () => {
        props.history.push('/movie')
      })
    }
  };
  const onFinishError = () => {
    message.error('提交失败')
  }



  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        {...formItemLayout}
        size="large"
        initialValues={
          { isHot: false, isComing: false, isClassic: false }
        }
        onFinishFailed={onFinishError}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "请填写电影名称" }]}
          label="电影名称">
          <Input />
        </Form.Item>
        <Form.Item
          name="poster"
          label="封面图">
          <ImgUploader />
        </Form.Item>
        <Form.Item
          name="areas"
          rules={[{ required: true, message: "请选择地区" }]}
          label="地区">
          <AreaGroups options={AllAreas} />
        </Form.Item>
        <Form.Item
          name="types"
          rules={[{ required: true, message: "请选择电影类型" }]}
          label="类型">
          <TypesGroups options={AllTypes} />
        </Form.Item>
        <Form.Item
          name="timeLong"
          rules={[{ required: true, message: "请填写电影时长" }]}
          label="时长(分钟)">
          <InputNumber min={30} max={360} step={10} />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name="isHot"
          label="正在热映">
          <Switch />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name="isComing"
          label="即将上映">
          <Switch />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name="isClassic"
          label="经典影片">
          <Switch />
        </Form.Item>
        <Form.Item
          valuePropName="description"
          name="description"
          label="描述">
          <TextArea allowClear placeholder="请输入电影描述" autoSize={{ minRows: 2, maxRows: 4 }} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default withRouter(MovieForm)