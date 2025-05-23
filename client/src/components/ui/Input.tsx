import React from "react";

interface InputProps {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
  type?: string;
  name?: string;  
}

function Input({ placeholder, reference, type = "text", name }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={reference}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                             shadow-sm focus:border-indigo-500 focus:ring-4 
                             focus:ring-indigo-100 transition-all duration-200
                             hover:border-gray-300 bg-white"
        name={name}
      />
    </div>
  );
}

export default Input;