const labelClass = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
// Tady můžeš zjednodušit psaní kódu tříd, když jsou stejné 😉

const name = "Name of ticket"; //TODO: přidat operaci z API
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
        <div className="m-12 border-2 rounded-lg shadow-xl w-fit ml-auto mr-auto block px-5">
            <h2 className="block uppercase text-gray-700 text-xl font-bold mt-2">{name}</h2>
            <form className="max-w-lg m-5 p-2 ml-auto mr-auto block">
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-state">
                            {label}
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PerformanceTime;