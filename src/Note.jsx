const Note = () => {
    return (
        <form className="grid grid-flow-col mx-[35%] mt-10">
            <label className="block uppercase text-gray-700 text-xl font-bold mt-3">note:</label>
            <input type="text" className="block appearance-none ml-auto mr-auto w-fit hover:bg-white duration-200
             bg-gray-200 border-2 border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded focus:outline-none focus:bg-white
              focus:border-gray-500 cursor-pointer"></input>
        </form>
    );
}

export default Note;