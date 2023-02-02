const InputField = (props: any) => {
    return (
        <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full px-3 ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor={props.for}>
                            {props.label}
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={props.for} type="text" placeholder={props.placeholder}/>
            </div>
        </div>
    );
}

export default InputField;