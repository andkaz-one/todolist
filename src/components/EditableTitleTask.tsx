import React, {useState, ChangeEvent} from 'react'


type PropsType = {
    title: string
    callBack: (tID: string, title: string) => void
    tID: string

}




export const EditableTitleTask = ({title, callBack,...props}: PropsType) => {
    const [edited, setEdited] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onTitleHandler = () => {
        setNewTitle(title)
        setEdited(true)
    }

    const onBlurHandler = () => {
        callBack(props.tID, newTitle)
        setEdited(false)

    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return (
        <>
            {edited
            ? <input onBlur={onBlurHandler} value={newTitle} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={onTitleHandler}>{title}</span>}

        </>
    )
}