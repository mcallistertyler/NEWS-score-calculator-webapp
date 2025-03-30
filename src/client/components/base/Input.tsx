import React, { ChangeEvent, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

function Input({
                   onChange,
                   id,
                   type,
                   required,
                   'aria-describedby': ariaDescribedBy,
                   'aria-labelledby': ariaLabelledBy
               }: InputProps) {


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <input
            className="indent-[24px] w-full h-[41px] border border-[#7424DA0D] bg-[#FAF6FF] px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={handleChange}
            data-testid={id}
            id={id}
            type={type}
            required={required}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
        />
    );
}

export default Input;
