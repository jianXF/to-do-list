import * as React from 'react';
import Api from '../../api';

interface iState {
    dataList: Array<{ [key: string]: any }>;
    type: string;
    total: number;
}

export default class Home extends React.Component<any, any> {

    state: iState = {
        dataList: [],
        type: '',
        total: 0
    }

    componentDidMount() {
        this.initData();
    }

// 初始化
    initData = async () => {
        const {type} = this.state;
        let {data, total} = await Api.list.find({is_completed: type});
        total = !type ? data.filter((d: { [key: string]: any }) => d.is_completed !== '1').length : total;
        this.setState({dataList: data, total: total})
    }
// 创建事件
    handlerCreate = async (content: string) => {
        await Api.list.add({content});
        this.initData();
    }
// 修改事件
    handlerUpdate = async (uuid: string, value: '0' | '1') => {
        await Api.list.update({uuid, is_completed: value});
        this.initData();
    }
// 修改查询条件
    changeType = (type: string) => {
        this.setState({type}, this.initData);
    }
    onClear = async (uuid?: string) => {
        await Api.list.del({uuid});
        this.initData();
    }

    render() {
        const {dataList = [], type, total} = this.state;
        return (
            <div className='wb-hone'>
                <h1>ToDo List</h1>
                <div className='wb-content'>
                    <div>
                        <Header onChange={this.handlerCreate}/>
                        {!!dataList.length &&
                        <List data={dataList} onChange={this.handlerUpdate} onDelete={this.onClear}/>}
                        <Filter onChange={this.changeType} number={total} onClear={this.onClear} type={type}/>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * 输入框
 * @param props
 * @returns {any}
 * @constructor
 */
export function Header(props: any) {
    const handlerKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            const value = e.target.value.trim();
            e.target.value = '';
            value && props.onChange(value);
        }
    }
    return (<div className='wb-header'>
        <input type="text" onKeyUp={handlerKeyUp} placeholder='请输入'/>
    </div>)
}

// 列表渲染
interface iList {
    data: Array<{ [key: string]: any }>;
    onChange: Function;
    onDelete: Function;
}

/**
 * 列表渲染
 * @param {iList} props
 * @returns {any}
 * @constructor
 */
export function List(props: iList) {
    // 时间戳转日期格式
    const handlerTime = (time: string): string => {
        const filter = (d: number) => {
            return d < 10 ? ('0' + d) : d;
        }
        const date = new Date(parseInt(time));
        return date.getFullYear() + '-' + filter(date.getMonth() + 1) + '-' + filter(date.getDate()) + ' ' + filter(date.getHours()) + ':'
            + filter(date.getMinutes()) + ':' + filter(date.getSeconds());
    }
    const onChange = (uuid: string, value: '0' | '1') => {
        props.onChange(uuid, value === '0' ? '1' : '0');
    }
    const onDelete = (uuid: string) => {
        props.onDelete(uuid);
    }
    const {data} = props;
    return (<ul className='wb-list'>
        {
            data.map(({uuid, content, create_time, is_completed}: { [key: string]: any }) => (
                <li key={uuid} className={is_completed === '1' ? 'completed' : ''}>
                    <p>
                        <i className='icon' onClick={() => onChange(uuid, is_completed)}></i>
                        <span className='text'>{content}</span>
                    </p>
                    <p>
                        <span className='time'>{handlerTime(create_time)}</span>
                        <i className='delete' onClick={() => onDelete(uuid)}>×</i>
                    </p>

                </li>
            ))
        }
    </ul>)
}

interface iFilter {
    onChange: Function;
    number: number;
    onClear: Function;
    type: string;
}

/**
 * 筛选器
 * @param {iFilter} iProps
 * @returns {any}
 * @constructor
 */
export function Filter(props: iFilter) {
    const options: Array<{ value: string, label: string }> = [
        {value: '', label: '全部'},
        {value: '0', label: '未完成'},
        {value: '1', label: '已完成'}
    ];
    const changeType = (value: string) => {
        if (value === props.type) return;
        props.onChange && props.onChange(value);
    }
    const onClear = () => {
        props.onClear && props.onClear();
    }
    return (<div className='web-setting'>
        <p>{props.number}项{props.type !== '1' ? '未完成' : '已完成'}</p>
        <ul>
            {
                options.map(({value, label}: { value: string, label: string }) => {
                    return <li className={props.type === value ? 'selected' : ''} key={value}
                               onClick={() => changeType(value)}>{label}</li>
                })
            }
        </ul>
        <p className='clear' onClick={onClear}>清楚已完成项</p>
    </div>)

}