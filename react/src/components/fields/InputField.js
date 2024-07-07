import React from "react";
import { InputNumber } from 'primereact/inputnumber';

const InputField = ({ label, value = 0.00, placeholder, icon, onClick }) => {
  return (
    <div className="p-inputgroup w-full md:w-30rem">
        {label && <span className="p-inputgroup-addon">
            {label}
        </span>}
        {icon && <span className="p-inputgroup-addon">
            <i className={`pi ${icon}`}></i>
        </span>}
        <InputNumber onClick={onClick} placeholder={ placeholder ?? label} value={value} />
        <span className="p-inputgroup-addon">.00</span>
    </div>
  );
};

export default InputField;