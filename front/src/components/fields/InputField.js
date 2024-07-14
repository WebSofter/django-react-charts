import React from "react";
import { InputText } from 'primereact/inputtext';

const InputField = ({ label, icon, ...props }) => {
  return (
    <div className="p-inputgroup w-full md:w-30rem">
        {label && <span className="p-inputgroup-addon">
            {label}
        </span>}
        {icon && <span className="p-inputgroup-addon">
            <i className={`pi ${icon}`}></i>
        </span>}
        <InputText {...props}/>
        {/* <InputText onClick={onClick} placeholder={ placeholder ?? label} value={value} onInput={onInput} onChange={onChange} name={name} /> */}
        {/* <span className="p-inputgroup-addon">.00</span> */}
    </div>
  );
};

export default InputField;