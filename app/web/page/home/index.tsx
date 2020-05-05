import * as React from 'react';
import Api from '../../api';

interface iState {
    dataList: Array<{ [key: string]: any }>;
    type: string;
}

export default class Home extends React.Component<any, any> {

    state: iState = {
        dataList: [],
        type: ''
    }

    componentDidMount() {
        this.initData();
    }

    // 初始化
    initData = async () => {
        const {type} = this.state;
        const data = await Api.list.find({is_completed: type});
        this.setState({dataList: data})
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
        console.log(type);
        this.setState({type}, this.initData);
    }
    onClear = async () => {
        await Api.list.del();
        this.initData();
    }

    render() {
        const {dataList = []} = this.state;
        return (
            <div className='wb-hone'>
                <h1>ToDo List</h1>
                <div className='wb-content'>
                    <div>
                        <Header onChange={this.handlerCreate}/>
                        {!!dataList.length && <List data={dataList} onChange={this.handlerUpdate}/>}
                        <Filter onChange={this.changeType} number={0} onClear={this.onClear}/>
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
        <input type="text" onKeyUp={handlerKeyUp}/>
    </div>)
}

// 列表渲染
interface iList {
    data: Array<{ [key: string]: any }>;
    onChange: Function;
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
        return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
    const onChange = (uuid: string, value: '0' | '1') => {
        props.onChange(uuid, value === '0' ? '1' : '0');
    }
    const {data} = props;
    return (<ul className='wb-list'>
        {
            data.map(({uuid, content, create_time, is_completed}: { [key: string]: any }) => (
                <li key={uuid} className={is_completed === '1' ? 'completed' : ''}>
                    <p>
                        <span className='icon' onClick={() => onChange(uuid, is_completed)}></span>
                        <span className='text'>{content}</span>
                    </p>

                    <span className='time'>{handlerTime(create_time)}</span>
                </li>
            ))
        }
    </ul>)
}

interface iFilter {
    onChange: Function;
    number: number;
    onClear: Function;
}

/**
 * 筛选器
 * @param {iFilter} iProps
 * @returns {any}
 * @constructor
 */
export function Filter(iProps: iFilter) {
    const options: Array<{ value: string, label: string }> = [
        {value: '', label: '全部'},
        {value: '0', label: '未完成'},
        {value: '1', label: '已完成'}
    ];
    const changeType = (value: string) => {
        iProps.onChange && iProps.onChange(value);
    }
    const onClear = () => {
        iProps.onClear && iProps.onClear();
    }
    return (<div>
        <p>{iProps.number}项未完成</p>
        <ul>
            {
                options.map(({value, label}: { value: string, label: string }) => {
                    return <li key={value} onClick={() => changeType(value)}>{label}</li>
                })
            }
        </ul>
        <p onClick={onClear}>清楚已完成项</p>
    </div>)

}