const label = "Face Value";

const FaceValue = () => {
    return (
        <div>
            <form className="max-w-lg m-5 p-2 ml-auto mr-auto block">
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-state">
                            {label}
                        </label>
                        <div className="grid grid-cols-2">
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state">
                                    <option>Equal</option>
                                    <option>LessThanOrEqual</option>
                                    <option>LessThan</option>
                                    <option>GreaterThanOrEqual</option>
                                    <option>GreaterThan</option>
                                    <option>NotEquals</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                            <input type="text"
                                   className="relative w-1/2 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white focus:border-gray-500 hover:border-gray-500">

                            </input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FaceValue;