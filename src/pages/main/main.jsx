import React from 'react';
import {Link} from "react-router-dom";


export default function Main() {
    return  <div align="center">
        <h1 align="center">首页</h1>
        <h1 ><Link to={"/dic"} style={{color:"#BF3553"}}>字典</Link></h1>
    </div>;
}
