import React from "react";
import {FilterValuesType} from "../App";

type PropsType = {
    callBack: (value: FilterValuesType) => void


}

export const FilterButton = ({callBack}: PropsType) => {


    //handler for filter buttons
    const onClickFilterHandler = (value: FilterValuesType) => callBack(value)

    return(
        <>
            <button onClick={()=>onClickFilterHandler('all')}>all</button>
            <button onClick={()=>onClickFilterHandler('active')}>active</button>
            <button onClick={()=>onClickFilterHandler('completed')}>completed</button>

        </>
    )
}



