/*
  Offer Code
*/
const Offer = () => {
    return (
        <div className="mt-14 border w-fit p-2 rounded text-sm">
            <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Offer</h1>
            <div className="grid grid-flow-row">
                <div className="grid">
                    <label className="font-light mt-1 mb-3">Offer code:</label>
                    <input
                        className="appearance-none bg-gray-200 text-gray-700 border w-full border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    </input>
                </div>
            </div>
        </div>
    );
}

export default Offer;