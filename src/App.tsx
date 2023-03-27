import React, {useEffect, useState} from "react";
//Icons (MIT License)
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {GoChevronDown, GoChevronUp} from "react-icons/go";
//Components
import Pricing from "./components/Pricing";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import Offer from "./components/Offer";

export default function App() {
    const rulesetClass = "mb-5 uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2";

    const fieldOptions = [
        {name: "PerformanceTime", id: 0},
        {name: "PerformanceDate", id: 1},
        {name: "PerformanceDayOfWeek", id: 2},
        {name: "PriceBandCode", id: 3},
        {name: "BookingDate", id: 4},
        {name: "FaceValue", id: 5},
    ];

    const operatorOptions = [
        {name: "", id: 0},
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
            note: "",
            fields: [
                {
                    id: 1,
                    field: "PerformanceTime",
                    operator: "",
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
    defaultOperators.push(operatorOptions[0]);
    defaultOperators.push(operatorOptions[2]);
    defaultOperators.push(operatorOptions[4]);

    const [mappedOperatorArr, setMappedOperatorArr] = useState(defaultOperators);

    /** Mapping **/
    function mapOperators(name: string) {
        switch (name) {
            case "PerformanceTime": //1
                tmpArray = []
                tmpArray.push(operatorOptions[0])
                tmpArray.push(operatorOptions[2])
                tmpArray.push(operatorOptions[4])
                setMappedOperatorArr(tmpArray);
                break;
            case "PerformanceDate": //2
            case "BookingDate": //5
            case "FaceValue": //6
                tmpArray = []
                tmpArray = [...operatorOptions]
                tmpArray.pop();
                setMappedOperatorArr(tmpArray);
                break;
            case "PerformanceDayOfWeek": //3
                tmpArray = []
                tmpArray.push(operatorOptions[0])
                tmpArray.push(operatorOptions[1]);
                tmpArray.push(operatorOptions[2]);
                tmpArray.push(operatorOptions[4]);
                tmpArray.push(operatorOptions[6]);
                setMappedOperatorArr(tmpArray);
                break;
            case "PriceBandCode": //4
                tmpArray = []
                tmpArray.push(operatorOptions[0])
                tmpArray.push(operatorOptions[1]);
                tmpArray.push(operatorOptions[6]);
                tmpArray.push(operatorOptions[7]);
                setMappedOperatorArr(tmpArray);
                break;
            //note: case 5 and 6 are the same as 2
            default:
                alert("Map operator error");
                break;
        }
        return name;
    }

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
    const remapFieldsIds = (fields: any[]) => {
        return fields.map((field, index) => {
            return {
                ...field,
                id: index + 1,
                fieldID: index + 1,
                operatorID: index + 1,
                valueID: index + 1,
            };
        });
    }
    const deleteFieldHandler = (rulesetIndex: number, fieldId: number) => {
        const updatedRuleset = [...Ruleset];
        const updatedFields = updatedRuleset[rulesetIndex].fields.filter(field => field.id !== fieldId);
        updatedRuleset[rulesetIndex].fields = remapFieldsIds(updatedFields);
        setRuleset(updatedRuleset);
    };
    const handleChange = (event: any, rulesetId: number, fieldId: number) => {
        const { name, value } = event.target;
        setRuleset(prevState => {
            const rulesetIndex = prevState.findIndex(item => item.id === rulesetId);
            const fieldIndex = prevState[rulesetIndex].fields.findIndex(item => item.id === fieldId);
            const isNote = name === 'note';
            const isField = name === 'field';
            const isOperator = name === 'operator';
            const isValue = name === 'value';
            return [
                ...prevState.slice(0, rulesetIndex),
                {
                    ...prevState[rulesetIndex],
                    note: isNote ? value : prevState[rulesetIndex].note,
                    fields: [
                        ...prevState[rulesetIndex].fields.slice(0, fieldIndex),
                        {
                            ...prevState[rulesetIndex].fields[fieldIndex],
                            field: isField ? mapOperators(value) : prevState[rulesetIndex].fields[fieldIndex].field,
                            operator: isOperator ? value : prevState[rulesetIndex].fields[fieldIndex].operator,
                            value: isValue ? value : prevState[rulesetIndex].fields[fieldIndex].value,
                        },
                        ...prevState[rulesetIndex].fields.slice(fieldIndex + 1),
                    ],
                },
                ...prevState.slice(rulesetIndex + 1),
            ];
        });
    };

    //TODO: delete code before deploy
    useEffect(() => {
        console.log(Ruleset)
    }, [Ruleset])


    const deleteRulesetHandler = (id: number) => {
        const filteredRulesets = Ruleset
            .filter((oneRuleset) => oneRuleset.id !== id)
            .map((oneRuleset, index) => ({...oneRuleset, id: index + 1}))
        setRuleset(filteredRulesets);
    }
    const AddRulesetHandler = () => {
        Ruleset.push({
            id: Ruleset.length + 1,
            number: Math.floor(Math.random() * 9000) + 1000,
            note: "",
            fields: [
                {
                    id: 1, field: "PerformanceTime", operator: "", value: "",
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
    function Reset() {
        //Reset Ruleset Array
        if(confirm("Are you sure you want to reset all rulesets?")) {
            window.location.reload();
            setRuleset(
                [
                    {
                        id: 1,
                        number: Math.floor(Math.random() * 9000) + 1000,
                        note: "",
                        fields: [
                            {
                                id: 1,
                                field: "PerformanceTime",
                                operator: "",
                                value: "",
                                fieldID: 1,
                                operatorID: 1,
                                valueID: 1
                            },
                        ],
                    }
                ]
            );
        }
    }
    function Submit(e: any) {
        e.preventDefault()
    }
    return (
        <>
            {
                Ruleset.map((oneRuleset) => {
                    const {id, number} = oneRuleset;
                    return <div key={id}
                                className="flex ml-auto mr-auto mt-14 w-fit p-5 outline outline-1
                                 rounded outline-gray-200 shadow-lg">
                        <form
                            className="w-full mr-auto ml-auto px-5">
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <p className={rulesetClass}>Ruleset&nbsp;#{number}&nbsp;|&nbsp;Priority:&nbsp;#{id}</p>
                                <button onClick={() => deleteRulesetHandler(id)}
                                        className="cursor-pointer p-3 uppercase rounded-md text-white
                                         bg-slate-900 hover:opacity-75 duration-700 disabled:opacity-75"
                                        disabled={Ruleset.length <= 1}>Remove ruleset
                                </button>
                            </div>
                            <div>
                                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">Change
                                    ruleset priority</p>
                                <button
                                    type="button"
                                    className="w-fit mr-5 my-2 h-fit rounded text-white bg-slate-900
                                     duration-200 hover:text-slate-900 hover:bg-white disabled:opacity-75"
                                    title="priority up"
                                    disabled={Ruleset.length <= 1 || oneRuleset.id == 1}
                                    onClick={() => {
                                        PriorityUP(oneRuleset.id)
                                    }}>
                                    <GoChevronUp size="30"/>
                                </button>
                                <button
                                    type="button"
                                    className="w-fit h-fit my-2 rounded text-white bg-slate-900 duration-200
                                     hover:text-slate-900 hover:bg-white disabled:opacity-75"
                                    title="priority down"
                                    disabled={Ruleset.length <= 1 || oneRuleset.id == Ruleset.length}
                                    onClick={() => {
                                        PriorityDown(oneRuleset.id)
                                    }}>
                                    <GoChevronDown size="30"/>
                                </button>
                                <hr className="my-2"/>
                                <InputField label="note"
                                            name="note"
                                            className="w-full"
                                            //componentID={oneRuleset.id}
                                            //inputValue={undefined}
                                            inputType="text"
                                            onInputChange={(e: any) => handleChange(e, oneRuleset.id, 1)}
                                            placeholder="type something..."/>
                            </div>
                            <div>
                                {oneRuleset.fields.map((index) => {
                                    //item: string
                                    return <div key={index.id}
                                                className="grid grid-flow-row md:grid-flow-col"
                                    >
                                        <React.Fragment key={index.id}>
                                            <SelectField label="field"
                                                         name="field"
                                                         options={fieldOptions}
                                                         onSelectChange={(e: any) =>
                                                             handleChange(e,
                                                                 oneRuleset.id,
                                                                 oneRuleset.fields[index.id - 1].fieldID)
                                                         }
                                                         componentID={index.fieldID}
                                                         fieldValue={undefined}
                                            />
                                            <SelectField label="operator"
                                                         name="operator"
                                                         componentID={index.operatorID}
                                                         options={mappedOperatorArr}
                                                         fieldValue={undefined}
                                                         onSelectChange={(e: any) => handleChange(e,
                                                             oneRuleset.id,
                                                             oneRuleset.fields[index.id - 1].operatorID)}
                                            />
                                            {/* TODO: map value depending on field */}
                                            <InputField label="value"
                                                        name="value"
                                                        componentID={index.valueID}
                                                        inputValue={index.value}
                                                        inputType="text"
                                                        onInputChange={(e: any) => handleChange(e,
                                                            oneRuleset.id,
                                                            oneRuleset.fields[index.id - 1].valueID)}
                                            />
                                            <button type="button"
                                                onClick={() => deleteFieldHandler(oneRuleset.id - 1,
                                                    oneRuleset.fields[index.id-1].id)}
                                                disabled={oneRuleset.fields.length <= 1}
                                                    className="disabled:opacity-75 duration-500"
                                            >
                                                <AiOutlineMinus
                                                    size="45"
                                                    className="ml-2 rounded text-white bg-slate-900 duration-200
                                                     hover:text-slate-900 hover:bg-white disabled:cursor-not-allowed"

                                                />
                                            </button>
                                        </React.Fragment>
                                    </div>
                                })
                                }
                                <button type="button" onClick={() => addFieldHandler(oneRuleset.id)}
                                        className="float-right mt-0">
                                    <AiOutlinePlus size="45"
                                                   className="rounded text-white bg-slate-900 duration-200
                                                    hover:text-slate-900 hover:bg-white "/>
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
                    className="block ml-auto mr-auto mt-5 mb-14 cursor-pointer p-3 uppercase rounded-md
                     text-white bg-slate-900 hover:opacity-75 duration-700">add
                ruleset
            </button>
            {/* submit and reset buttons*/}
            <div className="flex flex-row justify-center mt-5">
                <div className="m-5">
                    <button type="submit" value="submit" onClick={(e) => Submit(e)}
                            className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase
                             bg-slate-900 text-white rounded-xl hover:opacity-75 duration-700">submit
                    </button>
                </div>
                <div className="m-5">
                    <button type="reset" value="reset" onClick={Reset}
                            className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase
                             bg-white text-black rounded-xl hover:bg-red-900 hover:text-white duration-700">reset
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
