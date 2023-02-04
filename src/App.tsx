import React, {useState, useEffect} from "react";
//Icons (MIT License)
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import {GoChevronUp, GoChevronDown} from "react-icons/go";
//Components
import Pricing from "./components/Pricing";
import InputField from "./components/InputField";
import Field from "./components/Field";
import Offer from "./components/Offer";
import Rulesets from "./Rulesets"; //TODO: load rulesets from API not component

export default function App() {
    const rulesetClass = "mb-5 uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2";

    const fieldOptions = [
        {name: "PerformanceTime", id: 1},
        {name: "PerformanceDate", id: 2},
        {name: "PerformanceDayOfWeek", id: 3},
        {name: "PriceBandCode", id: 4},
        {name: "BookingDate", id: 5},
        {name: "FaceValue", id: 6},
    ];

    const operatorOptions = [
        {name: "Equal", id: 1},
        {name: "LessThanOrEqual", id: 2},
        {name: "LessThan", id: 3},
        {name: "GreaterThanOrEqual", id: 4},
        {name: "GreaterThan", id: 5},
        {name: "NotEquals", id: 6},
        {name: "In", id: 7},
    ];

    let tmpArray: any = []
    const defaultOperators: any = []
    defaultOperators.push(operatorOptions[1]);
    defaultOperators.push(operatorOptions[3]);

    const [fieldValue, setFieldValue] = useState(1);
    const [mappedOperatorArr, setMappedOperatorArr] = useState(defaultOperators);

    /** Mapping **/
    useEffect(() => {
        //console.log(fieldValue)
        let tmp = parseInt(String(fieldValue))
        switch (tmp) {
            case 1:
                tmpArray = []
                tmpArray.push(operatorOptions[2-1]) //array začíná od 0
                tmpArray.push(operatorOptions[4-1])
                setMappedOperatorArr(tmpArray);
                break;
            case 2:
            case 5:
            case 6:
                tmpArray = []
                tmpArray = [...operatorOptions]
                tmpArray.pop();
                setMappedOperatorArr(tmpArray);
                break;
            case 3:
                tmpArray = []
                tmpArray.push(operatorOptions[1-1]);
                tmpArray.push(operatorOptions[2-1]);
                tmpArray.push(operatorOptions[4-1]);
                tmpArray.push(operatorOptions[6-1]);
                setMappedOperatorArr(tmpArray);
                break;
            case 4:
                tmpArray = []
                tmpArray.push(operatorOptions[1-1]);
                tmpArray.push(operatorOptions[6-1]);
                tmpArray.push(operatorOptions[7-1]);
                setMappedOperatorArr(tmpArray);
                break;
                //poznámka: Case 5 a 6 je stejný jako case 2.
            default:
                console.log("Map operator error");
                console.log(fieldValue);
                break;
        }
    }, [fieldValue])

    // TODO? Function Submit

    function Reset() {
        window.location.reload()
    }

    function Submit(e: any) {
        e.preventDefault()
    }

    //ADD + remove fields
    const [field, setField] = useState(['']);

    const handleChange = (value: number, index: number) => {
        const newField: any = field.map((fieldItem: string, fieldIndex: number) => {
            return fieldIndex === index ? value : fieldItem
        })
        setField(newField)
    }

    const addFields = () => {
        setField([...field, ''])
    }

    //Ruleset
    const [myRuleset, setMyRuleset] = useState(Rulesets);

    const handleAddRuleset = () => {
        let lastRuleset = myRuleset.length
        myRuleset.push({
            id: lastRuleset + 1,
            priority: lastRuleset + 1,
            number: Math.floor(Math.random() * 9000) + 1000,
        });
        setMyRuleset([...myRuleset]);
    }

    const rulesetsHandler = (id: number) => {
        const filteredRulesets = myRuleset.filter((oneRuleset) => {
            return oneRuleset.id !== id
        })
        setMyRuleset(filteredRulesets);
    }

    //TODO: make this function working
    function PriorityUp(id: number, priority: number, number: number) {
        if (myRuleset.length > 1) {
            myRuleset[priority] = {id: id, priority: priority + 1, number: number};
            setMyRuleset(myRuleset);
        }
    }


    function PriorityDown() {
        if (myRuleset.length > 1) {

        }
    }

    return (
        <>
            {
                myRuleset.map((oneRuleset) => {
                    const {id, priority, number} = oneRuleset;
                    return <div key={priority}
                                className="flex ml-auto mr-auto mt-14 w-fit p-5 outline outline-1 rounded outline-gray-200 shadow-lg">
                        <form
                            className="w-full mr-auto ml-auto px-5">
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <p className={rulesetClass}>Ruleset&nbsp;#{number}&nbsp;|&nbsp;Priority:&nbsp;#{priority}</p>
                                <button onClick={() => rulesetsHandler(id)}
                                        className="cursor-pointer p-3 uppercase rounded-md text-white bg-slate-900 hover:opacity-75 duration-700 disabled:opacity-75"
                                        disabled={myRuleset.length <= 1}>Remove ruleset
                                </button>
                            </div>
                            <div>
                                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">Set
                                    ruleset priority</p>
                                <button
                                    type="button"
                                    className="w-fit mr-5 my-2 h-fit rounded text-white bg-slate-900 duration-200 hover:text-slate-900 hover:bg-white"
                                    title="priority up"
                                    onClick={() => PriorityUp(id, priority, number)}>
                                    <GoChevronUp size="30"/>
                                </button>

                                <button
                                    type="button"
                                    className="w-fit h-fit my-2 rounded text-white bg-slate-900 duration-200 hover:text-slate-900 hover:bg-white"
                                    title="priority down"
                                    onClick={() => PriorityDown()}>
                                    <GoChevronDown size="30"/>
                                </button>
                                <hr className="my-2"/>
                                <InputField label="note" htmlFor="" className="w-full"
                                            placeholder="write your note here"/>
                            </div>
                            <div>
                                {/* TODO: add/delete fieldset only on Ruleset's ID, not on every Ruleset!  */}
                                {field.map((item, index) => {
                                    return <div key={index}
                                                className="grid grid-flow-row md:grid-flow-col"
                                    >
                                        <React.Fragment key={index}>
                                            <Field label="field"
                                                   options={fieldOptions}
                                                   value={item}
                                                   onSelectChange={(e: any) => setFieldValue(e.target.value)}
                                                   onChange={(e: any) => handleChange(e.target.value, index)}
                                                   fieldValue={fieldValue}
                                            />

                                            <Field label="operator"
                                                   options={mappedOperatorArr}
                                                   value={item}
                                                   onChange={(e: any) => handleChange(e.target.value, index)}
                                            />

                                            <InputField label="value"
                                                        htmlFor="grid-value"
                                                        value={item}
                                                        onChange={(e: any) => handleChange(e.target.value, index)}
                                            />

                                            <button type="button"
                                                    onClick={() => {
                                                        const newArr = field.filter((i, j) => {
                                                            return index !== j
                                                        })
                                                        setField(newArr)
                                                    }}
                                                    disabled={field.length <= 1}
                                                    className="disabled:opacity-75 duration-500"
                                            >
                                                <AiOutlineMinus size="45"
                                                                className="ml-2 rounded text-white bg-slate-900 duration-200 hover:text-slate-900 hover:bg-white disabled:cursor-not-allowed"

                                                />
                                            </button>
                                        </React.Fragment>
                                    </div>
                                })
                                }
                                <button type="button" onClick={addFields} className="float-right mt-0">
                                    <AiOutlinePlus size="45"
                                                   className="rounded text-white bg-slate-900 duration-200 hover:text-slate-900 hover:bg-white "/>
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row space-x-6">
                                <Pricing/>
                                <Offer/>
                            </div>
                        </form>
                    </div>
                })
            }
            <button type="button" onClick={handleAddRuleset}
                    className="block ml-auto mr-auto mt-5 mb-14 cursor-pointer p-3 uppercase rounded-md text-white bg-slate-900 hover:opacity-75 duration-700">add
                ruleset
            </button>
            {/* submit and reset buttons*/}
            <div className="flex flex-row justify-center mt-5">
                <div className="m-5">
                    <button type="submit" value="submit" onClick={(e) => Submit(e)}
                            className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase bg-slate-900 text-white rounded-xl hover:opacity-75 duration-700">submit
                    </button>
                </div>
                <div className="m-5">
                    <button type="reset" value="reset" onClick={Reset}
                            className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase bg-white text-black rounded-xl hover:bg-red-900 hover:text-white duration-700">reset
                    </button>
                </div>
            </div>
        </>
    );
}

/*
var name = "Radima" || "Suchánka";

let KOLEDA = "
    Na Štěpána Suchánek
    a Radim do kódu hledí,
    všude kaj se podívaj,
    Errory a bugy...

    Svítil měsíc a byl mráz,
    debuggoval jako divý.
    A v tom spatří {name}
    jak tam ztrácí nervy.
";
*/
