import React from 'react';

let input;
const LovePanel = ({who, onChange, onClick}) => {

    return (
        <form
            onSubmit={
                e => {
                    e.preventDefault();
                    onClick();
                    input.value = '';
                }}>

            <div>I Love : {who}</div>

            姓名：<input
            ref={node => {
                input = node
            }}
            onChange={
                () => onChange(input.value)
            }/>

            <button type="submit">
                清空
            </button>
        </form>
    );
};

export default LovePanel;
