const label = "Field";

const PerformanceDate = () => {
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
                                    className="block appearance-none w-fit bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                                    id="grid-state">
                                    <option>PerformanceTime</option>
                                    <option>PerformanceDate</option>
                                    <option>PerformanceDayOfWeek</option>
                                    <option>PriceBandCode</option>
                                    <option>BookingDate</option>
                                    <option>FaceValue</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 -right-28 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default PerformanceDate;