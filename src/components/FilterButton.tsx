import { Button } from "@mui/material";
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
            <Button variant="contained" color="primary" onClick={()=>onClickFilterHandler('all')} >
                all
            </Button>
            <Button variant="contained" color="primary" onClick={()=>onClickFilterHandler('active')} >
                active
            </Button>
            <Button variant="contained" color="primary" onClick={()=>onClickFilterHandler('completed')} >
                completed
            </Button>
        </>
    )
}



