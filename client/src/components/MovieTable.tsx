import React, { Component } from 'react'
import { IMovieState } from '../redux/reducers/MoviewReducer'
import { Table, Tag, Button, Divider, message, Popconfirm, Input } from 'antd';
import { ColumnProps, TablePaginationConfig } from 'antd/es/table';
import { IMovie } from '../services/MovieServices';
import { Switch } from 'antd';
import { colorRandom } from '../util';
import defaultPosterImg from '../assets/noImg.jpg'
import { SwitchType } from '../services/CommonTypes';
import { NavLink } from 'react-router-dom';
import { PaginationConfig } from 'antd/es/pagination';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons'
export interface IMovieTableEvents {
  /**
   * 完成加载之后的事件
   */
  onLoad: () => void

  onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void

  onDelete: (id: string) => Promise<void>
  onChange: (newPage: number) => void
  onKeyChange: (key: string) => void
  onSearch: () => void
}

export default class MovieTable extends Component<IMovieState & IMovieTableEvents> {

  componentDidMount = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }
  private getColumns = (): ColumnProps<IMovie>[] => {
    return [
      {
        "title": '图片', "dataIndex": "poster", render: (poster) => {
          if (poster) {
            return <img className="tableposter" src={poster} alt="" />
          } else {
            return <img className="tableposter" src={defaultPosterImg} alt="" />
          }
        }
      },
      {
        "title": '电影名称',
        "dataIndex": "name",
        filterDropdown: this.getFilterDropDown,
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      },
      {
        "title": '地区', "dataIndex": "areas", render: (props: string[]) => (
          <span>
            {props.map(item => {
              let color = colorRandom()
              return (
                <Tag color={color} key={item}>
                  {item.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        "title": '类型', "dataIndex": "types", render: (props: string[]) => (
          <span>
            {props.map(item => {
              let color = colorRandom()
              return (
                <Tag color={color} key={item}>
                  {item.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      { "title": '时长', "dataIndex": "timeLong", render: (props: number) => `${props}分钟` },
      {
        "title": '正在热映', "dataIndex": "isHot", render: (isHot, record) => <Switch checkedChildren="开" onChange={newState => {
          //更改仓库状态 更改数据库状态
          this.props.onSwitchChange(SwitchType.isHot, newState, record._id!)

        }} unCheckedChildren="关" checked={isHot} />
      },
      {
        "title": '即将上映', "dataIndex": "isComing", render: (isComing, record) => <Switch checkedChildren="开" onChange={newState => {
          //更改仓库状态 更改数据库状态
          this.props.onSwitchChange(SwitchType.isComing, newState, record._id!)

        }} unCheckedChildren="关" checked={isComing} />
      },
      {
        "title": '经典电影', "dataIndex": "isClassic", render: (isClassic, record) => <Switch checkedChildren="开" onChange={newState => {
          //更改仓库状态 更改数据库状态
          this.props.onSwitchChange(SwitchType.isClassic, newState, record._id!)

        }} unCheckedChildren="关" checked={isClassic} />
      },
      {
        "title": '操作', "dataIndex": "_id", render: (id, record) => {
          return (
            <>

              <NavLink to={`/movie/update/${id}`}>
                <Button type="primary">
                  编辑
                </Button>
              </NavLink>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除?"
                onConfirm={async () => {
                  await this.props.onDelete(id);
                  message.success('删除成功')
                }}
                okText="确定"
                cancelText="取消">
                <Button type="primary" danger >
                  删除
                </Button>
              </Popconfirm>

            </>
          )
        }
      }
    ];
  }

  private getFilterDropDown = (props: FilterDropdownProps) => {
    console.log(props);

    return (
      <div style={{ padding: 8 }}>
        <Input
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          value={this.props.condition.key}
          onChange={(e) => {
            console.log(e);

            this.props.onKeyChange(e.target.value)
          }}
          onPressEnter={this.props.onSearch}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
          onClick={this.props.onSearch}
        >
          搜索
        </Button>
        <Button
          size="small"
          style={{ width: 90 }}
          onClick={() => {
            this.props.onKeyChange("")
            this.props.onSearch()
          }}
        >
          重置
        </Button>
      </div>
    )
  }
  getPageConfig = (): TablePaginationConfig => {
    return {
      hideOnSinglePage: true,
      current: this.props.condition.page,
      pageSize: this.props.condition.limit,
      total: this.props.count
    }
  }
  handleChange = (pagination: PaginationConfig) => {
    this.props.onChange(pagination.current!)

  }
  render() {
    return (
      <div>
        <Table<IMovie>
          loading={this.props.isLoading}
          rowKey="_id"
          columns={this.getColumns()}
          dataSource={this.props.data}
          pagination={this.getPageConfig()}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
