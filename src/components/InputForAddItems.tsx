import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    callBack: (title: string) => void
}

export const InputForAddItems = ({callBack}: PropsType) => {
    //state fot input
    const [inputTitle, setInputTitle] = useState('')

    //handler for input
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value)
    }

    //handler for add-task button
    const onClickAddItemHandler = () => {
        if (inputTitle !== '') {
            callBack(inputTitle.trim())
        }
        setInputTitle('')
    }

    //handler for add task on press Enter key
    const addForPressKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (inputTitle !== '') {
            if (event.charCode === 13) {
                callBack(inputTitle.trim())
                setInputTitle('')
            }
        }
    }


    return (
        <div>
            <input onChange={onChangeHandler} value={inputTitle} onKeyPress={addForPressKey}/>
            <button onClick={onClickAddItemHandler}>+</button>
        </div>
    )
}