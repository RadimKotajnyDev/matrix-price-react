const label = "Perfomance Time";

/*
CompareOperatory následující

1             Equal

2             LessThanOrEqual

3             LessThan

4             GreaterThanOrEqual

5             GreaterThan

6             NotEquals

7             In


Field 1 – Operatory 2,4
*/

const PerformanceTime = () => {
    return (
        <div>
            <form className="max-w-lg m-5 p-2 ml-auto mr-auto block">
                <div className="flex flex-wrap -mx-2 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-state">
                            {label}
                        </label>
                        <div className="grid grid-cols-2">
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                                    id="grid-state">
                                    <option>LessThanOrEqual</option>
                                    <option>GreaterThanOrEqual</option>
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
                                   className="relative w-full border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white focus:border-gray-500 hover:border-gray-500 ml-auto">
                            </input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PerformanceTime;