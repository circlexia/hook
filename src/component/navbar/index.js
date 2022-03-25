import React from 'react';
import './style/index.css';
import { NoticeBar } from 'antd-mobile';
import {strlen} from '../common';
import classnames from 'classnames';
export class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  //返回按钮
  onLeftClick(){//接口封装的native返回方法
    if(this.props.onLeftClick){
      this.props.onLeftClick();
    }else{
      window.history.back();
    }
  }
  render() {
    const {title} = this.props;
    return (
      <div className="upcore-navbar">
        <span className="upcore-navbar-icon-left" onClick={() => this.onLeftClick()}/>
        <div className="upcore-navbar-name-span" style={{padding: '0',backgroundColor:'#ffffff',color: '#000'}}>
          {strlen(title)<14?title
            :<NoticeBar marqueeProps={{loop:true}} icon={false}>
              {title}
            </NoticeBar>}
        </div>
      </div>
    );
  }
}