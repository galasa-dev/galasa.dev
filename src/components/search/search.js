import React from "react"

import "./search.scss"

const Search = ({keyword,setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     class="docsearch"
     value={keyword}
     placeholder={"Search..."}
     onChange={(e) => setKeyword(e.target.value)}
    ></input>
    );
}

export default Search
