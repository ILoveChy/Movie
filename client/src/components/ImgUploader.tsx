import React, { Component } from 'react'
import { Upload, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { IResData, IResError } from '../services/CommonTypes';

interface IImgUploaderProps {
  value?: string
  onChange?: (imgUrl: string) => void
}
interface IImgState {
  showModal: boolean
}
export default class ImgUploader extends Component<IImgUploaderProps, IImgState> {
  state: IImgState = {
    showModal: false
  }
  private getUploadContent = () => {
    if (this.props.value) {
      return null
    } else {
      return (
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      )
    }
  }
  private getFileList = (): any[] => {
    if (this.props.value) {
      return [
        {
          uid: this.props.value,
          name: this.props.value,
          url: this.props.value,
        }
      ]
    }
    return [];
  }
  handleRequest = async (p: any) => {
    let formData = new FormData()
    formData.append(p.filename, p.file)
    //fetch api
    const request = new Request(p.action, {
      method: "post",
      body: formData
    })
    const res: IResData<string> | IResError = await fetch(request).then(resp => resp.json())
    console.log(res);

    if (res.err) {
      message.error(res.err)
    } else {
      if (this.props.onChange) {
        //触发回调
        this.props.onChange(res.data)
      }
    }
  }
  render() {

    return (
      <div>
        <Modal visible={this.state.showModal} footer={null} onCancel={() => {
          this.setState({
            showModal: false
          })
        }}>
          <img alt="" style={{ width: '100%' }} src={this.props.value} />
        </Modal>
        <Upload
          onRemove={() => {
            if (this.props.onChange) {
              this.props.onChange("")
            }
          }}
          onPreview={() => {
            this.setState({
              showModal: true
            })
          }}
          name="imgfile"
          accept=".jpg,.png,.gif,.bmp,.jpeg,.tiff"
          fileList={this.getFileList()}
          listType="picture-card"
          customRequest={this.handleRequest}
          action="/api/upload">
          {this.getUploadContent()}
        </Upload>
      </div>
    )
  }
}
