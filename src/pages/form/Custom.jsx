import React, {useState} from 'react';
import {Input} from "antd";

function Custom(props) {
  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')

  const onInputChange = (v, type) => {
    if(type === 1) {
      setInputValue1(v)
      if(v && inputValue2) {
        props.onChange([v, inputValue2])
      }
      if(!v && !inputValue2) {
        props.onChange(undefined)
      }
    }
    if(type === 2) {
      setInputValue2(v)
      if(v && inputValue1) {
        props.onChange([v, inputValue1])
      }
      if(!v && !inputValue1) {
        props.onChange(undefined)
      }
    }
  }

  return <div>
    <Input value={inputValue1} onChange={(e)=>onInputChange(e.target.value, 1)} />
    <Input value={inputValue2} onChange={(e)=>onInputChange(e.target.value, 2)} />
  </div>
}

export default Custom
