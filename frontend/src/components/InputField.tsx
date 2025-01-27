import { InputFieldProps } from '../types/InputFieldTypes'


const InputField = ({label,type,id, name, placeholder,className,register}:any) => {
  return (
    <div className="flex flex-col">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
      {...register} 
    />
  </div>
  )
}

export default InputField;