import './App.css';

function App() {
    return (
        <div className="text-center mt-10 text-3xl">
            <h1 className="underline underline-offset-8 decoration-1">Price Matrix Forms</h1>
             
             <div className="m-5 border-2 rounded-t-lg">
                <form>
                    <div className='relative z-0 mb-6 w-full group mt-12'>
                        <label className='m-3 p-2'>
                            Label:
                            <input type="text" name="name" className='border-2 m-2 rounded' />
                        </label>
                    </div>

                    <div className='relative z-0 mb-6 w-full group mt-12'>
                        <label className='m-3 p-2'>
                            Label:
                            <input type="text" name="name" className='border-2 m-2 rounded' />
                        </label>
                    </div>

                    <div className='relative z-0 mb-6 w-full group mt-12'>
                        <label className='m-3 p-2'>
                            Label:
                            <input type="text" name="name" className='border-2 m-2 rounded' />
                        </label>
                    </div>

                    <div className='relative z-0 mb-6 w-full group mt-12'>
                            <input type="submit" name="submit" value="submit" className=' bg-slate-700 hover:bg-slate-500 duration-500 rounded-lg p-2 text-white text-bold cursor-pointer text-bold' />
                    </div>
                </form>
             </div>
        
        </div>
    );
}

export default App;