import React, {ChangeEvent, useState} from "react";

type PropsType = {
    callBack: (title: string) => void
}

export const InputForAddItems = (props: PropsType) => {
    //state fot input
    const [inputTitle, setInputTitle] = useState('')

    //handler for input
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value)

    }

    //handler for add-task button
    const onClickAddItemHandler = () => {
        if (inputTitle !== '') {
            props.callBack(inputTitle.trim())
        }
        setInputTitle('')
    }


    return(
        <div>
            <input onChange={onChangeHandler} value={inputTitle}/>
            <button onClick={onClickAddItemHandler}>+</button>
        </div>
    )
}