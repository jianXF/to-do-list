import * as React from 'react';

export default function Header(props: any) {
    const handlerKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            const value = e.target.value.trim();
            value && props.onChange(e.target.value)
        }
    }
    return (<div className='wb-header'>
        <input type="text" onKeyUp={handlerKeyUp}/>
    </div>)
}