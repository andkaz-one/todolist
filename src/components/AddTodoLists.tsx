import {Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {ChangeEvent, useState} from "react";

type PropsType = {
    callback: (title: string) => void
}

export const AddTodoLists = (props: PropsType) => {

    let [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onClickHandler = () => {
        props.callback(title)
        setTitle('')
    }

    return <div>
        <TextField onChange={onChangeHandler} id="standard-basic" label="Add new todolist"
                   value={title} variant="standard" />
        <Button
            onClick={onClickHandler}
            style={{maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}
            variant="text" endIcon={<AddIcon/>}>

        </Button>

    </div>
}