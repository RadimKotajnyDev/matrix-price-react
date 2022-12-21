import "./App.css";
import Field from "./Rules/Field";
import Operator from "./Rules/Operator";
import Value from "./Rules/Value";
import AddOrRemove from "./Rules/AddOrRemove";
import Note from "./Note";


function App() {
    let id = "#1234"; //TODO: přidat operaci z API

    /*
    API
    GET pricematrix/{matrixId} – vratí kompletní price matrix (kolekce rulesetů) – vrací 200
    POST pricematrix/{matrixId}/ruleset – vytvoření nového rulesetu – vrací 201
    PUT pricematrix/{matrixId}/ruleset/{id} – update existujícího rulesetu – vrací 200
    DELETE pricematrix/{matrixId}/ruleset/{id} - smazání rulesetu – vrací 204
    */
    /*
        REUSABLE
        <h2 className="block uppercase text-gray-700 text-xl font-bold mt-4">{name}</h2>
    */
    function Submit() {
       /*
            
       */ 
    }

    function Reset() {
        /*

        */
    }
    return (
        <div className="text-center mt-10 text-xl">
            <h1 className="underline underline-offset-8 decoration-1 font-bold text-gray-700">Price Matrix Forms</h1>
            <div className="m-5 border-2  rounded-lg w-fit shadow-2xl ml-auto mr-auto block px-5">
                <h2 className="block uppercase text-gray-700 text-xl font-bold mt-4">Ruleset&nbsp;{id}</h2>
                <Note />
                <div className="grid md:grid-cols-5 rounded border-2 mt-5">
                    <Field />
                    <Operator />
                    <Value />
                    <AddOrRemove />
                </div>
                <div className="grid grid-flow-col ml-[30vw] mr-[30vw]">
                    <div className="m-5">
                        <input type="submit" value="submit" onSubmit={() => Submit()}
                               className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase bg-slate-900 text-white rounded-xl hover:opacity-75 duration-700"/>
                    </div>
                    <div className="m-5">
                        <input type="reset" value="reset" onReset={() => Reset()}
                        className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase bg-white text-black rounded-xl hover:bg-red-900 hover:text-white duration-700" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;