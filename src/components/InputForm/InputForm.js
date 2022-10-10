import "./InputForm.css";

const InputForm = ({
  name,
  placeholder,
  type,
  label,
  value,
  onChange,
  className,
  reff,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={className}
        ref={reff}
      />
    </div>
  );
};

export default InputForm;
