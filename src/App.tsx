import React, {useEffect, useState} from "react";
//Icons (MIT License)
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {GoChevronDown, GoChevronUp} from "react-icons/go";
//Components
//import Pricing from "./components/Pricing";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

export default function App() {

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

    // fieldID, operatorID and valueID was added due errors
    const initialRuleset =
        {
            id: Math.floor(Math.random() * 9000) + 1000,
            priority: 1,
            note: "",
            fields: [
                {
                    id: 0,
                    field: "PerformanceTime",
                    operator: "",
                    value: "",
                    fieldID: 0,
                    operatorID: 0,
                    valueID: 0
                },
            ],
            offerCode: "",
            pricing: {
                BookingFeeAbsolute: 0,
                BookingFeePercent: 0,
                PriceSelling: 0,
                InsideCommission: 0,
                BFAid: 0,
                BFPid: 0,
                PSid: 0,
                ICid: 0
            }
        }

    // Ruleset
    //TODO: load initial rulesets from API
    const [Ruleset, setRuleset] = useState([initialRuleset]);

    let tmpArray: any = []
    const defaultOperators: any = []
    defaultOperators.push(operatorOptions[0]);
    defaultOperators.push(operatorOptions[2]);
    defaultOperators.push(operatorOptions[4]);

    const operatorsInRuleset = [
        {
            Ruleset: 0,
            OperatorsPerField: [
                {id: 0, operators: defaultOperators},
            ]
        }
    ]

    const [mappedOperatorArr, setMappedOperatorArr] = useState(operatorsInRuleset);

    /** Mapping **/
    function mapOperators(name: string, RulesetID: number, Field: number, RulesetPriority: number) {
        switch (name) {
            case "PerformanceTime": //1
                tmpArray = []
                tmpArray.push(operatorOptions[0])
                tmpArray.push(operatorOptions[2])
                tmpArray.push(operatorOptions[4])
                mappedOperatorArr[RulesetPriority - 1].OperatorsPerField[Field].operators = [...tmpArray]
                setMappedOperatorArr([...mappedOperatorArr])
                break;
            case "PerformanceDate": //2
            case "BookingDate": //5
            case "FaceValue": //6
                tmpArray = []
                tmpArray = [...operatorOptions]
                tmpArray.pop();
                mappedOperatorArr[RulesetPriority - 1].OperatorsPerField[Field].operators = [...tmpArray]
                setMappedOperatorArr([...mappedOperatorArr])
                break;
            case "PerformanceDayOfWeek": //3
                tmpArray = []
                tmpArray.push(operatorOptions[0])
                tmpArray.push(operatorOptions[1]);
                tmpArray.push(operatorOptions[2]);
                tmpArray.push(operatorOptions[4]);
                tmpArray.push(operatorOptions[6]);
                mappedOperatorArr[RulesetPriority - 1].OperatorsPerField[Field].operators = [...tmpArray]
                setMappedOperatorArr([...mappedOperatorArr])
                break;
            case "PriceBandCode": //4
                tmpArray = []
                tmpArray.push(operatorOptions[0])
                tmpArray.push(operatorOptions[1]);
                tmpArray.push(operatorOptions[6]);
                tmpArray.push(operatorOptions[7]);
                mappedOperatorArr[RulesetPriority - 1].OperatorsPerField[Field].operators = [...tmpArray]
                setMappedOperatorArr([...mappedOperatorArr])
                break;
            //note: case 5 and 6 are the same as 2
            default:
                alert("Map operator error");
                break;
        }
        return name;
    }

    //index is priority - 1
    const addFieldHandler = (index: number) => {
        const newField: any = {
            id: Ruleset[index].fields.length,
            field: "PerformanceTime",
            operator: "",
            value: "",
            fieldID: Ruleset[index].fields.length,
            operatorID: Ruleset[index].fields.length,
            valueID: Ruleset[index].fields.length,
        };
        Ruleset[index].fields.push(newField);
        setRuleset([...Ruleset]);
        //operators
        const newOperators: any = {
            id: Ruleset[index].fields.length - 1, operators: defaultOperators
        }
        mappedOperatorArr[index].OperatorsPerField.push(newOperators)
        setMappedOperatorArr([...mappedOperatorArr])
    }

    const remapFieldsIds = (fields: any[]) => {
        return fields.map((field, index) => {
            return {
                ...field,
                id: index,
                fieldID: index,
                operatorID: index,
                valueID: index,
            };
        });
    }

    const deleteFieldHandler = (rulesetIndex: number, fieldId: number) => {
        const updatedRuleset = [...Ruleset];
        const updatedFields = updatedRuleset[rulesetIndex].fields.filter(field => field.id !== fieldId);
        updatedRuleset[rulesetIndex].fields = remapFieldsIds(updatedFields);
        setRuleset([...updatedRuleset]);
        // delete and remap also operators
        const newOperatorState = [...mappedOperatorArr];
        newOperatorState[rulesetIndex].OperatorsPerField = newOperatorState[rulesetIndex].OperatorsPerField.filter(current => current.id !== fieldId);
        newOperatorState[rulesetIndex].OperatorsPerField.forEach((operatorsPerField, index) => {
            operatorsPerField.id = index;
        });
        setMappedOperatorArr([...newOperatorState]); //*/
    };
    const handleChange = (event: any, rulesetId: number, fieldId: number, rulesetPriority: number) => {
        const {name, value} = event.target;
        setRuleset(prevState => {
            const rulesetIndex = prevState.findIndex(item => item.id === rulesetId);
            const fieldIndex = prevState[rulesetIndex].fields.findIndex(item => item.id === fieldId);
            const isNote = name === 'note';
            const isField = name === 'field';
            const isOperator = name === 'operator';
            const isValue = name === 'value';
            const isOffer = name === 'offer';
            const isBFA = name === 'BookingFeeAbsolute';
            const isBFP = name === 'BookingFeePercent';
            const isPS = name === 'PriceSelling';
            const isIC = name === 'InsideCommission';
            return [
                ...prevState.slice(0, rulesetIndex),
                {
                    ...prevState[rulesetIndex],
                    note: isNote ? value : prevState[rulesetIndex].note,
                    fields: [
                        ...prevState[rulesetIndex].fields.slice(0, fieldIndex),
                        {
                            ...prevState[rulesetIndex].fields[fieldIndex],
                            field: isField ? mapOperators(value, rulesetId, fieldId, rulesetPriority) : prevState[rulesetIndex].fields[fieldIndex].field,
                            operator: isOperator ? value : prevState[rulesetIndex].fields[fieldIndex].operator,
                            value: isValue ? value : prevState[rulesetIndex].fields[fieldIndex].value,
                        },
                        ...prevState[rulesetIndex].fields.slice(fieldIndex + 1),
                    ],
                    offerCode: isOffer ? value : prevState[rulesetIndex].offerCode,
                    pricing: {
                        BookingFeeAbsolute: isBFA ? parseInt(value) : prevState[rulesetIndex].pricing.BookingFeeAbsolute,
                        BookingFeePercent: isBFP ? parseInt(value) : prevState[rulesetIndex].pricing.BookingFeePercent,
                        PriceSelling: isPS ? parseInt(value) : prevState[rulesetIndex].pricing.PriceSelling,
                        InsideCommission: isIC ? parseInt(value) : prevState[rulesetIndex].pricing.InsideCommission,
                        BFAid: rulesetPriority - 1,
                        BFPid: rulesetPriority - 1,
                        PSid: rulesetPriority - 1,
                        ICid: rulesetPriority - 1,
                    }
                },
                ...prevState.slice(rulesetIndex + 1),
            ];
        });
    };
    /*
    //TODO: delete code before deploy
    useEffect(() => {
        console.log(Ruleset)
    }, [Ruleset])
    /* useEffect(() => console.log(mappedOperatorArr), [mappedOperatorArr]) */

    const deleteRulesetHandler = (priority: number) => {
        const filteredRulesets = Ruleset
            .filter((oneRuleset) => oneRuleset.priority !== priority)
            .map((oneRuleset, index) => ({...oneRuleset, priority: index + 1}))
        // fixed: There was incorrectly set an array from original operatorsInRuleset instead of mappedOperatorArr
        const filteredOptions = [...mappedOperatorArr]
            .filter((oneOperatorField) => oneOperatorField.Ruleset !== priority)
            .map((oneOperatorField, index) => ({...oneOperatorField, Ruleset: index}))
        setMappedOperatorArr([...filteredOptions])
        setRuleset([...filteredRulesets]);
    }
    const AddRulesetHandler = () => {
        // check if IDs aren't duplicated
        let newID = Math.floor(Math.random() * 9000) + 1000;
        for (let i = 0; i < Ruleset.length; i++) {
            //console.log(i)
            if (Ruleset[i].id === newID) {
                newID = Math.floor(Math.random() * 9000) + 1000;
                i = 0;
            }
        }
        Ruleset.push({
            id: newID,
            priority: Ruleset.length + 1,
            note: "",
            fields: [
                {
                    id: 0, field: "PerformanceTime", operator: "", value: "",
                    fieldID: 0, operatorID: 0, valueID: 0
                },
            ],
            offerCode: "",
            pricing: {
                BookingFeeAbsolute: 0,
                BookingFeePercent: 0,
                PriceSelling: 0,
                InsideCommission: 0,
                BFAid: 0,
                BFPid: 0,
                PSid: 0,
                ICid: 0
            }
        });
        setRuleset([...Ruleset]);
        //SET OPERATORS
        mappedOperatorArr.push({
            Ruleset: Ruleset.length - 1,
            OperatorsPerField: [
                {id: 0, operators: defaultOperators}
            ]
        })
        setMappedOperatorArr([...mappedOperatorArr])
    }
    const PriorityUP = (priority: number) => {
        const index = Ruleset.findIndex(item => item.priority === priority);
        if (index > 0) {
            const item = Ruleset[index];
            Ruleset.splice(index, 1);
            Ruleset.splice(index - 1, 0, item);
            // swap Priorities
            const tempPriority = Ruleset[index].priority;
            Ruleset[index].priority = Ruleset[index - 1].priority;
            Ruleset[index - 1].priority = tempPriority;
            setRuleset([...Ruleset]);
            // swap operators
            const operatorIndex = mappedOperatorArr.findIndex(item => item.Ruleset === priority - 1);
            if (operatorIndex > 0) {
                const itemOperator = mappedOperatorArr[operatorIndex]
                mappedOperatorArr.splice(operatorIndex, 1)
                mappedOperatorArr.splice(operatorIndex - 1, 0, itemOperator);
                const tempRuleset = mappedOperatorArr[operatorIndex].Ruleset;
                mappedOperatorArr[operatorIndex].Ruleset = mappedOperatorArr[operatorIndex - 1].Ruleset;
                mappedOperatorArr[operatorIndex - 1].Ruleset = tempRuleset;
                setMappedOperatorArr([...mappedOperatorArr])
            }
        }
    }
    const PriorityDown = (priority: number) => {
        const index = Ruleset.findIndex(item => item.priority === priority);
        if (index < Ruleset.length - 1) {
            const item = Ruleset[index];
            Ruleset.splice(index, 1);
            Ruleset.splice(index + 1, 0, item);
            // swap Priorities
            const tempPriority = Ruleset[index].priority;
            Ruleset[index].priority = Ruleset[index + 1].priority;
            Ruleset[index + 1].priority = tempPriority;
            setRuleset([...Ruleset]);
        }    // swap operators
        const operatorIndex = mappedOperatorArr.findIndex(item => item.Ruleset === priority - 1);
        if (operatorIndex < mappedOperatorArr.length) {
            const itemOperator = mappedOperatorArr[operatorIndex]
            mappedOperatorArr.splice(operatorIndex, 1)
            mappedOperatorArr.splice(operatorIndex + 1, 0, itemOperator);
            const tempRuleset = mappedOperatorArr[operatorIndex].Ruleset;
            mappedOperatorArr[operatorIndex].Ruleset = mappedOperatorArr[operatorIndex + 1].Ruleset;
            mappedOperatorArr[operatorIndex + 1].Ruleset = tempRuleset;
            setMappedOperatorArr([...mappedOperatorArr])
        }
    }

    function Reset(rulesetID: number, rulesetPriority: number) {
        if (confirm("This action will reset Ruleset #" + rulesetID + ".")) {
            const remappedRuleset = Ruleset.map(oneRuleset => {
                if (oneRuleset.id === rulesetID) {
                    return {
                        id: rulesetID,
                        priority: rulesetPriority,
                        note: "",
                        fields: [
                            {
                                id: 0,
                                field: "PerformanceTime",
                                operator: "",
                                value: "",
                                fieldID: 0,
                                operatorID: 0,
                                valueID: 0
                            },
                        ],
                        offerCode: "",
                        pricing: {
                            BookingFeeAbsolute: 0,
                            BookingFeePercent: 0,
                            PriceSelling: 0,
                            InsideCommission: 0,
                            BFAid: 0,
                            BFPid: 0,
                            PSid: 0,
                            ICid: 0
                        }
                    }
                }
                return oneRuleset;
            })
            setRuleset([...remappedRuleset])
        }
    }

    function SubmitSave(e: any, Ruleset: any, RulesetPriority: number) {
        e.preventDefault()
        console.log(Ruleset[RulesetPriority - 1])
    }

    return (
        <>
            {
                Ruleset.map((oneRuleset) => {
                    const {id, priority} = oneRuleset;
                    return <form key={priority}
                                 className="scale-[70%] sm:scale-100
                       flex ml-auto mr-auto mt-14 w-fit p-5 outline outline-1
                                 rounded outline-gray-200 shadow-lg">
                        <div
                            className="w-full mr-auto ml-auto px-5">
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <p className="mb-5 uppercase tracking-wide
                                 text-gray-700 text-2xl font-bold"
                                >Ruleset&nbsp;#{id}&nbsp;
                                    <span className="font-light">|</span>
                                    &nbsp;Priority:&nbsp;#{priority}</p>
                                <button onClick={() => deleteRulesetHandler(priority)}
                                        className="cursor-pointer p-3 uppercase rounded-md text-white w-fit mb-5 md:mb-0
                                         bg-slate-900 hover:opacity-75 duration-700 disabled:opacity-75"
                                        disabled={Ruleset.length <= 1}>Remove ruleset
                                </button>
                            </div>
                            <div className="block relative">
                                <div className="flex flex-col absolute -left-14">
                                    <button
                                        type="button"
                                        className="w-fit mr-5 my-2 h-fit rounded text-white bg-slate-900
                                     duration-200 hover:text-slate-900 hover:bg-white disabled:opacity-75"
                                        title="priority up"
                                        disabled={Ruleset.length <= 1 || oneRuleset.priority == 1}
                                        onClick={() => {
                                            PriorityUP(oneRuleset.priority)
                                        }}>
                                        <GoChevronUp size="30"/>
                                    </button>
                                    <button
                                        type="button"
                                        className="w-fit h-fit my-2 rounded text-white bg-slate-900 duration-200
                                     hover:text-slate-900 hover:bg-white disabled:opacity-75"
                                        title="priority down"
                                        disabled={Ruleset.length <= 1 || oneRuleset.priority == Ruleset.length}
                                        onClick={() => {
                                            PriorityDown(oneRuleset.priority)
                                        }}>
                                        <GoChevronDown size="30"/>
                                    </button>
                                </div>
                                <hr className="mt-5 mb-2"/>
                                <InputField label="note"
                                            name="note"
                                            className="w-full"
                                    //componentID={oneRuleset.id}
                                    //inputValue={undefined}
                                            inputType="text"
                                            onInputChange={(e: any) =>
                                                handleChange(e, oneRuleset.id, 0, oneRuleset.priority)}
                                            placeholder="type something..."/>
                            </div>
                            <div>
                                {oneRuleset.fields.map((index) => {
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
                                                                 oneRuleset.fields[index.id].fieldID,
                                                                 oneRuleset.priority
                                                             )}
                                                         componentID={index.fieldID}
                                                         fieldValue={undefined}
                                            />
                                            <SelectField label="operator"
                                                         name="operator"
                                                         componentID={index.operatorID}
                                                //because priority cannot be 0
                                                         options={mappedOperatorArr[oneRuleset.priority - 1]
                                                             .OperatorsPerField[index.id].operators || []}
                                                         fieldValue={undefined}
                                                         onSelectChange={(e: any) => handleChange(
                                                             e,
                                                             oneRuleset.id,
                                                             oneRuleset.fields[index.id].operatorID,
                                                             oneRuleset.priority
                                                         )}
                                            />
                                            <InputField label="value"
                                                        name="value"
                                                        componentID={index.valueID}
                                                        inputValue={index.value}
                                                        inputType="text"
                                                        onInputChange={(e: any) => handleChange(
                                                            e,
                                                            oneRuleset.id,
                                                            oneRuleset.fields[index.id].valueID,
                                                            oneRuleset.priority
                                                        )}
                                            />
                                            <button type="button"
                                                    onClick={() => {
                                                        deleteFieldHandler(
                                                            oneRuleset.priority - 1,
                                                            oneRuleset.fields[index.id].id);
                                                    }}
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
                                <button type="button" onClick={() => addFieldHandler(oneRuleset.priority - 1)}
                                        className="float-right mt-0">
                                    <AiOutlinePlus size="45"
                                                   className="rounded text-white bg-slate-900 duration-200
                                                    hover:text-slate-900 hover:bg-white "/>
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row space-x-6">
                                <div className="mt-14 border w-fit p-2 rounded text-sm">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold
                                     mb-2">Pricing</label>
                                    <div className="grid grid-cols-2 w-fit max-w-xs">
                                        <label htmlFor="BookingFeeAbsolute"
                                               className="font-light mt-1"
                                        >BookingFeeAbsolute (&#163;)</label>
                                        <input type="number" required name="BookingFeeAbsolute"
                                               value={oneRuleset.pricing.BookingFeeAbsolute}
                                               onChange={(e) => handleChange(e, oneRuleset.id, 0, oneRuleset.priority)}
                                               id={`BookingFeeAbsolute-${oneRuleset.pricing.BFAid}`}
                                               className="appearance-none text-gray-700 bg-gray-200 border rounded
                                                 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 w-fit max-w-xs">
                                        <label htmlFor="BookingFeePercent"
                                               className="font-light mt-1"
                                        >BookingFeePercent (%)</label>
                                        <input type="number" required name="BookingFeePercent"
                                               value={oneRuleset.pricing.BookingFeePercent}
                                               onChange={(e) => handleChange(e, oneRuleset.id, 0, oneRuleset.priority)}
                                               id={`BookingFeeAbsolute-${oneRuleset.pricing.BFPid}`}
                                               className="appearance-none text-gray-700 bg-gray-200 border rounded
                                                py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 w-fit max-w-xs">
                                        <label htmlFor="PriceSelling"
                                               className="font-light mt-1"
                                        >PriceSelling (&#163;)</label>
                                        <input type="number" required name="PriceSelling"
                                               value={oneRuleset.pricing.PriceSelling}
                                               onChange={(e) => handleChange(e, oneRuleset.id, 0, oneRuleset.priority)}
                                               id={`BookingFeeAbsolute-${oneRuleset.pricing.PSid}`}
                                               className="appearance-none text-gray-700 bg-gray-200 border
                                                rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 w-fit max-w-xs">
                                        <label htmlFor="InsideCommission"
                                               className="font-light mt-1"
                                        >InsideCommission (%)</label>
                                        <input type="number" required name="InsideCommission"
                                               value={oneRuleset.pricing.InsideCommission}
                                               onChange={(e) => handleChange(e, oneRuleset.id, 0, oneRuleset.priority)}
                                               id={`BookingFeeAbsolute-${oneRuleset.pricing.ICid}`}
                                               className="appearance-none text-gray-700 bg-gray-200 border
                                                rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        />
                                    </div>
                                </div>
                                {/* <Pricing onPricingDataSubmit={(pricingData: any) => console.log(pricingData)}/> */}
                                {/* <Offer/> */}
                                <div className="mt-14 border h-fit pb-5 w-fit p-2 rounded text-sm">
                                    <InputField label="offer code"
                                                name="offer"
                                                className=""
                                        //componentID={oneRuleset.id}
                                        //inputValue={undefined}
                                                inputType="text"
                                                onInputChange={(e: any) =>
                                                    handleChange(e, oneRuleset.id, 0, oneRuleset.priority)}
                                    />
                                </div>
                            </div>
                            {/* submit and reset buttons*/}
                            {/* TODO: submit (PUT method) and delete (DELETE method), pass current ruleset to method argument */}
                            <div className="flex flex-row justify-center mt-5">
                                <div className="m-5">
                                    <button type="submit" value="submit" onClick={(e) =>
                                        SubmitSave(e, Ruleset, oneRuleset.priority)}
                                            className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase
                             bg-slate-900 text-white rounded-lg hover:opacity-75 duration-700">save
                                    </button>
                                </div>
                                <div className="m-5">
                                    <button type="reset" value="reset"
                                            onClick={() => Reset(oneRuleset.id, oneRuleset.priority)}
                                            className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase
                             bg-white text-black rounded-lg hover:bg-red-900 hover:text-white duration-700">reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                })
            }
            <button type="button" onClick={AddRulesetHandler}
                    className="block ml-auto mr-auto mt-5 mb-14 cursor-pointer p-3 uppercase rounded-md
                     text-white bg-slate-900 hover:opacity-75 duration-700">add
                ruleset
            </button>
        </>
    );
}