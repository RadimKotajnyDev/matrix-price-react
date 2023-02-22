import React, {useState, useEffect} from "react";
//Icons (MIT License)
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import {GoChevronUp, GoChevronDown} from "react-icons/go";
//Components
import Pricing from "./components/Pricing";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import Offer from "./components/Offer";

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

    // Ruleset
    //TODO: load initial rulesets from API
    const [Ruleset, setRuleset] = useState([
        {
            id: 1,
            number: Math.floor(Math.random() * 9000) + 1000,
            fields: [
                {
                    id: 1,
                    field: "PerformanceTime",
                    operator: "LessThanOrEqual",
                    value: "",
                    fieldID: 1,
                    operatorID: 1,
                    valueID: 1
                },
            ]
        }
    ]);

    let tmpArray: any = []
    const defaultOperators: any = []
    defaultOperators.push(operatorOptions[1]);
    defaultOperators.push(operatorOptions[3]);

    const [fieldValue, setFieldValue] = useState(1);
    const [mappedOperatorArr, setMappedOperatorArr] = useState(defaultOperators);

    //TODO: make mapping unique for field objects
    /** Mapping **/

    /*
    useEffect(() => {
        let tmp = parseInt(String(fieldValue)) //todo: check if this can be written easier
        switch (tmp) {
            case 1:
                tmpArray = []
                tmpArray.push(operatorOptions[2 - 1]) //array začíná od 0
                tmpArray.push(operatorOptions[4 - 1])
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
                tmpArray.push(operatorOptions[1 - 1]);
                tmpArray.push(operatorOptions[2 - 1]);
                tmpArray.push(operatorOptions[4 - 1]);
                tmpArray.push(operatorOptions[6 - 1]);
                setMappedOperatorArr(tmpArray);
                break;
            case 4:
                tmpArray = []
                tmpArray.push(operatorOptions[1 - 1]);
                tmpArray.push(operatorOptions[6 - 1]);
                tmpArray.push(operatorOptions[7 - 1]);
                setMappedOperatorArr(tmpArray);
                break;
            //note: case 5 and 6 are the same as 2
            default:
                alert("Map operator error");
                console.log(fieldValue);
                break;
        }
    }, [fieldValue])
     */
    function Reset() {
        //Reset Ruleset Array
        if(confirm("Are you sure you want to reset all rulesets?")) {
            setRuleset(
                [
                    {
                        id: 1,
                        number: Math.floor(Math.random() * 9000) + 1000,
                        fields: [
                            {
                                id: 1,
                                field: "PerformanceTime",
                                operator: "LessThanOrEqual",
                                value: "",
                                fieldID: 1,
                                operatorID: 1,
                                valueID: 1
                            },
                        ]
                    }
                ]
            );
        }
    }

    function Submit(e: any) {
        e.preventDefault()
    }

    //ADD + remove fields
    /*
    const [field, setField] = useState([
        {
            id: 1, field: "PerformanceTime", operator: "LessThanOrEqual", value: "",
            fieldID: 1, operatorID: 1, valueID: 1
        }
    ]);
     */

    /*
    //FIXME: Change Ruleset, not Field
    const handleChange = (event: any, id: number) => {
        const {name, value} = event.target;
        setField(prevState => {
            const fieldIndex = prevState.findIndex(item => item.id === id);
            if (name === 'field') {
                return [
                    ...prevState.slice(0, fieldIndex),
                    {...prevState[fieldIndex], field: value},
                    ...prevState.slice(fieldIndex + 1),
                ];
            }
            if (name === 'operator') {
                return [
                    ...prevState.slice(0, fieldIndex),
                    {...prevState[fieldIndex], operator: value},
                    ...prevState.slice(fieldIndex + 1),
                ];
            }
            if (name === 'value') {
                return [
                    ...prevState.slice(0, fieldIndex),
                    {...prevState[fieldIndex], value: value},
                    ...prevState.slice(fieldIndex + 1),
                ];
            }
            return prevState;
        });
    };
    */


    const addFieldHandler = (index: number) => {
        const newField: any = {
            id: Ruleset[index - 1].fields.length + 1,
            field: "PerformanceTime",
            operator: "LessThanOrEqual",
            value: "",
            fieldID: Ruleset[index - 1].fields.length + 1,
            operatorID: Ruleset[index - 1].fields.length + 1,
            valueID: Ruleset[index - 1].fields.length + 1,
        };
        Ruleset[index - 1].fields.push(newField);
        setRuleset([...Ruleset]);
    }
    /*
    const deleteFieldHandler = (id: number) => {
        const updatedField = field
            .filter(filterField => filterField.id !== id)
            .map((item, index) => ({...item, id: index + 1}));
        setField(updatedField);
    }
     */

    const handleChange = (event: any, rulesetId: number, fieldId: number) => {
        const {name, value} = event.target;
        setRuleset(prevState => {
            const rulesetIndex = prevState.findIndex(item => item.id === rulesetId);
            const fieldIndex = prevState[rulesetIndex].fields.findIndex(item => item.id === fieldId);
            if (name === 'field') {
                return [...prevState.slice(0, rulesetIndex), {
                    ...prevState[rulesetIndex],
                    fields: [
                        ...prevState[rulesetIndex].fields.slice(0, fieldIndex),
                        {...prevState[rulesetIndex].fields[fieldIndex], field: value},
                        ...prevState[rulesetIndex].fields.slice(fieldIndex + 1),
                    ]
                },
                    ...prevState.slice(rulesetIndex + 1),
                ];
            }
            if (name === 'operator') {
                return [...prevState.slice(0, rulesetIndex), {
                    ...prevState[rulesetIndex],
                    fields: [
                        ...prevState[rulesetIndex].fields.slice(0, fieldIndex),
                        {...prevState[rulesetIndex].fields[fieldIndex], operator: value},
                        ...prevState[rulesetIndex].fields.slice(fieldIndex + 1),
                    ]
                },
                    ...prevState.slice(rulesetIndex + 1),
                ];
            }
            if (name === 'value') {
                return [...prevState.slice(0, rulesetIndex), {
                    ...prevState[rulesetIndex],
                    fields: [
                        ...prevState[rulesetIndex].fields.slice(0, fieldIndex),
                        {...prevState[rulesetIndex].fields[fieldIndex], value: value},
                        ...prevState[rulesetIndex].fields.slice(fieldIndex + 1),
                    ]
                },
                    ...prevState.slice(rulesetIndex + 1),
                ];
            }
            return prevState;
        });
    };

    //TODO: delete code before deploy
    useEffect(() => {
        console.log(Ruleset)
    },[Ruleset])

    const deleteRulesetHandler = (id: number) => {
        const filteredRulesets = Ruleset
            .filter((oneRuleset) => oneRuleset.id !== id)
            .map((oneRuleset, index) => ({...oneRuleset, id: index + 1}))
        setRuleset(filteredRulesets);
    }
    const AddRulesetHandler = () => {
        Ruleset.push({
            id: Ruleset.length + 1,
            number: Math.floor(Math.random() * 9000) + 1000, fields: [
                {
                    id: 1, field: "PerformanceTime", operator: "LessThanOrEqual", value: "",
                    fieldID: 1, operatorID: 1, valueID: 1
                },
            ]
        });
        setRuleset([...Ruleset]);
    }
    const PriorityUP = (id: number) => {
        const index = Ruleset.findIndex(item => item.id === id);
        if (index > 0) {
            const item = Ruleset[index];
            Ruleset.splice(index, 1);
            Ruleset.splice(index - 1, 0, item);
            // swap IDs
            const tempID = Ruleset[index].id;
            Ruleset[index].id = Ruleset[index - 1].id;
            Ruleset[index - 1].id = tempID;
            setRuleset([...Ruleset]);
        }
    }
    const PriorityDown = (id: number) => {
        const index = Ruleset.findIndex(item => item.id === id);
        if (index < Ruleset.length - 1) {
            const item = Ruleset[index];
            Ruleset.splice(index, 1);
            Ruleset.splice(index + 1, 0, item);
            // swap IDs
            const tempID = Ruleset[index].id;
            Ruleset[index].id = Ruleset[index + 1].id;
            Ruleset[index + 1].id = tempID;
            setRuleset([...Ruleset]);
        }
    }

    return (
        <>
            {
                Ruleset.map((oneRuleset) => {
                    const {id, number} = oneRuleset;
                    return <div key={id}
                                className="flex ml-auto mr-auto mt-14 w-fit p-5 outline outline-1 rounded outline-gray-200 shadow-lg">
                        <form
                            className="w-full mr-auto ml-auto px-5">
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <p className={rulesetClass}>Ruleset&nbsp;#{number}&nbsp;|&nbsp;Priority:&nbsp;#{id}</p>
                                <button onClick={() => deleteRulesetHandler(id)}
                                        className="cursor-pointer p-3 uppercase rounded-md text-white bg-slate-900 hover:opacity-75 duration-700 disabled:opacity-75"
                                        disabled={Ruleset.length <= 1}>Remove ruleset
                                </button>
                            </div>
                            <div>
                                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">Change
                                    ruleset priority</p>
                                <button
                                    type="button"
                                    className="w-fit mr-5 my-2 h-fit rounded text-white bg-slate-900 duration-200 hover:text-slate-900 hover:bg-white disabled:opacity-75"
                                    title="priority up"
                                    disabled={Ruleset.length <= 1 || oneRuleset.id == 1}
                                    onClick={() => {
                                        PriorityUP(oneRuleset.id)
                                    }}>
                                    <GoChevronUp size="30"/>
                                </button>
                                <button
                                    type="button"
                                    className="w-fit h-fit my-2 rounded text-white bg-slate-900 duration-200 hover:text-slate-900 hover:bg-white disabled:opacity-75"
                                    title="priority down"
                                    disabled={Ruleset.length <= 1 || oneRuleset.id == Ruleset.length}
                                    onClick={() => {
                                        PriorityDown(oneRuleset.id)
                                    }}>
                                    <GoChevronDown size="30"/>
                                </button>
                                <hr className="my-2"/>
                                <InputField label="note" htmlFor="" className="w-full"
                                            placeholder="type something..."/>
                            </div>
                            <div>
                                {/* TODO: add/delete fieldset only on Ruleset's ID, not on every Ruleset!  */}
                                {oneRuleset.fields.map((index) => {
                                    //item: string
                                    return <div key={index.id}
                                                className="grid grid-flow-row md:grid-flow-col"
                                    >
                                        <React.Fragment key={index.id}>
                                            <SelectField label="field"
                                                         name="field"
                                                         options={fieldOptions}
                                                         onSelectChange={(e: any) => {
                                                             //setFieldValue(e.target.value) //TODO: unique setting
                                                             handleChange(e, oneRuleset.id, oneRuleset.fields[oneRuleset.id - 1].fieldID)
                                                         }}
                                                //onChange={(e: any) => handleChange(e, index.id)}
                                                         componentID={index.fieldID}
                                                         fieldValue={index.field}
                                            />

                                            <SelectField label="operator"
                                                         name="operator"
                                                         componentID={index.operatorID}
                                                         options={mappedOperatorArr}
                                                         fieldValue={index.operator}
                                                         onSelectChange={(e: any) => handleChange(e, oneRuleset.id, oneRuleset.fields[oneRuleset.id - 1].operatorID)}
                                            />
                                            {/* TODO: map value depending on field */}
                                            <InputField label="value"
                                                        name="value"
                                                        componentID={index.valueID}
                                                        inputValue={index.value}
                                                        onInputChange={(e: any) => handleChange(e, oneRuleset.id, oneRuleset.fields[oneRuleset.id - 1].valueID)}
                                            />
                                            <button type="button"
                                                //onClick={() => deleteFieldHandler(index.id)}
                                                //disabled={Ruleset[index.id - 1].fields.length <= 1} //FIXME
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
                                <button type="button" onClick={() => addFieldHandler(oneRuleset.id)}
                                        className="float-right mt-0">
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
            <button type="button" onClick={AddRulesetHandler}
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
