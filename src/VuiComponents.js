import "./stylesheets/VuiComponents.scss";
import React from "react";

export function TextInput(props) {
  const { onChange, placeholder = "", icon = "", required, type ="text", value, style, onKeyDown = {} } = props;
  return (
    <div className="inputwrapper" style={style}>
      <div className="text-input-wrapper">
        <div className="text-icon-left">
          <i className={icon} style={{ color: "#7fbde0" }} />
        </div>
        <input
          placeholder={placeholder}
          className="text-input"
          onChange={onChange}
          value={value}
          required={required}
          type={type}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}

export function Filters(props) {
  const { placeholder = "", icon = "", type ="text", value, style, onFilter } = props;
  return (
    <div className="inputwrapper" style={style}>
      <div className="text-input-wrapper">
        <label style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <input
          placeholder={placeholder}
          className="text-input"
          onChange={()=>onFilter("availability")}
          value="Available"
          label="Available"
          type="Checkbox"
          style={{width:30}}
        />
        Available
        </label>
        <div className="text-sort">
          <i className="icon-style fa fa-sort" onClick={()=>onFilter("rating")}/>
          Rating
        </div>
        <div className="text-sort">
          <i className="icon-style fa fa-sort" onClick={()=>onFilter("price")}/>
          Price
        </div>
        {/*<div className="text-sort">
          <i className="icon-style fa fa-sort" onClick={()=>onFilter("aisle")}/>
          Aisle
        </div>
        <div className="text-sort">
          <i className="icon-style fa fa-sort" onClick={()=>onFilter("bay")}/>
          Bay
        </div>*/}
      </div>
    </div>
  );
}
