const InputField = (props: any) => {
    return (
        <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor={props.componentID}>
                            {props.label}
                </label>
                <input onChange={props.onInputChange} name={props.name}
                       value={props.inputValue} readOnly={false}
                       className={props.inputClassName}
                    id={props.componentID} type={props.inputType} placeholder={props.placeholder}/>
            </div>
        </div>
    );
}

export default InputField;