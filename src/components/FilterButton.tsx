import React from "react";
import {FilterValuesType} from "../App";

type PropsType = {
    callBack: (value: FilterValuesType) => void
    btnLabel: FilterValuesType
}

export const FilterButton = ({callBack, btnLabel}: PropsType) => {


    //handler for filter buttons
    const onClickFilterHandler = (value: FilterValuesType) => callBack(value)

    return(
        <>
            <button onClick={()=>onClickFilterHandler('all')}>{btnLabel}</button>
        </>
    )
}



