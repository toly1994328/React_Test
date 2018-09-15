import React, {Component} from 'react';
import './Progress.scss';

class Progress extends Component {
    render() {
        return (
            <div className="comp-progress" onClick={this.ChangeProgress.bind(this)} ref='pb'>
                <div className="ui-progress"
                     style={{
                         width: `${this.props.progress}%`,
                         background: this.props.setColor}}>
                </div>
            </div>
        );
    }


    /**
     * 改变进度条
     * @constructor
     */
    ChangeProgress(e) {
        let pb = this.refs.pb;
        let progress = (e.clientX - pb.getBoundingClientRect().left) / pb.clientWidth;
        this.props.onClick(progress, pb.clientWidth);//处理回调,将值传递给父组件
    }
}

export default Progress;