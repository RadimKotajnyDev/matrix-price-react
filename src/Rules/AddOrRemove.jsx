import Field from "./Field";
import Operator from "./Operator";
import Value from "./Value";

const buttonClass = "w-fit h-fit p-5 text-white rounded bg-slate-900 hover:opacity-75 duration-700"

function AddRule() {
    return (
        <>
            <Field />
            <Operator />
            <Value />
            <AddOrRemove />
        </> 
    );
}

function RemoveRule() {
    return (
        <>
            {/* TODO: add remove algoritmus */}
        </>
    );
}

const AddOrRemove = () => {
    return (
        <div className="grid grid-flow-row ml-[30vw]">
            {/* FIXME: fix position */}
            <button onClick={() => RemoveRule()} className={buttonClass}>-</button>
            <button onClick={() => AddRule()} className={buttonClass}>+</button>                
        </div>
    );
}

export default AddOrRemove;