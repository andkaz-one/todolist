import { Button } from "@mui/material";
import React from "react";
import {FilterValuesType} from "../App";

type PropsType = {
    id: string
    callBack: (value: FilterValuesType, todolistID: string) => void


}

export const FilterButton = ({callBack, ...props}: PropsType) => {

    //handler for filter buttons
    const onClickFilterHandler = (value: FilterValuesType, todolistID: string) => {
        callBack(value, todolistID )
    }


    return(
        <>
            <Button variant="contained" color="primary" onClick={()=>onClickFilterHandler('all', props.id)} >
                all
            </Button>
            <Button variant="contained" color="primary" onClick={()=>onClickFilterHandler('active', props.id)} >
                active
            </Button>
            <Button variant="contained" color="primary" onClick={()=>onClickFilterHandler('completed', props.id)} >
                completed
            </Button>
        </>
    )
}



