const label = "Value";

const Value = () => {
    return (
        <>
            <form className="max-w-lg m-5 p-2 ml-auto mr-auto block">
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-state">
                            {label}
                        </label>
                        <div className="grid grid-cols-2">
                            <div className="relative">
                                <input type="text"
                                    className="block appearance-none w-fit bg-gray-200 border-2 hover:bg-white duration-200 border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                                    id="grid-state">
                                    
                                </input>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </>
    );
}

export default Value;