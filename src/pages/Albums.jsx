import React from "react";
import { useParams } from "react-router-dom";

function Albums(){
    const {id} = useParams();
    return(
        <div>
            <h1>Albums</h1>
        </div>
    )
}

export default Albums;