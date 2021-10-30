import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

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
            <TextField size="small" id="outlined-basic" label="New task" variant="outlined"
                       onChange={onChangeHandler} value={inputTitle} onKeyPress={addForPressKey} />
            <Button style={{maxWidth: '50px', maxHeight: '40px', minWidth: '50px', minHeight: '40px'}}
                    variant="contained" onClick={onClickAddItemHandler}>ADD</Button>
        </div>
    )
}