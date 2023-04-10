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

  const initialRuleset = [
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
      ]
    }
  ]

  // Ruleset
  //TODO: load initial rulesets from API
  const [Ruleset, setRuleset] = useState(initialRuleset);

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
  function mapOperators(name: string, Ruleset: number, Field: number) {
    switch (name) {
      case "PerformanceTime": //1
        tmpArray = []
        tmpArray.push(operatorOptions[0])
        tmpArray.push(operatorOptions[2])
        tmpArray.push(operatorOptions[4])
        //setMappedOperatorArr([...operatorsInRuleset[Ruleset].OperatorsPerField[Field].operators.push(tmpArray)]);
        break;
      case "PerformanceDate": //2
      case "BookingDate": //5
      case "FaceValue": //6
        tmpArray = []
        tmpArray = [...operatorOptions]
        tmpArray.pop();
        //setMappedOperatorArr(tmpArray);
        break;
      case "PerformanceDayOfWeek": //3
        tmpArray = []
        tmpArray.push(operatorOptions[0])
        tmpArray.push(operatorOptions[1]);
        tmpArray.push(operatorOptions[2]);
        tmpArray.push(operatorOptions[4]);
        tmpArray.push(operatorOptions[6]);
        //setMappedOperatorArr([...operatorsInRuleset[Ruleset].OperatorsPerField[Field].operators.push(tmpArray)]);
        break;
      case "PriceBandCode": //4
        tmpArray = []
        tmpArray.push(operatorOptions[0])
        tmpArray.push(operatorOptions[1]);
        tmpArray.push(operatorOptions[6]);
        tmpArray.push(operatorOptions[7]);
        //setMappedOperatorArr([...operatorsInRuleset[Ruleset].OperatorsPerField[Field].operators.push(tmpArray)]);
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

  //TODO: remap also operators
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
    setRuleset([...updatedRuleset]);
    //delete also operators obj from arr
    // const updatedOpArr = [...mappedOperatorArr]
    // updatedOpArr[rulesetIndex].OperatorsPerField.filter(current => current.id !== 1)
    //todo: remap
    const newOperatorState = [...mappedOperatorArr];
    newOperatorState[rulesetIndex].OperatorsPerField = newOperatorState[rulesetIndex].OperatorsPerField.filter(current => current.id !== fieldId);
    newOperatorState[rulesetIndex].OperatorsPerField.forEach((operatorsPerField, index) => {
      operatorsPerField.id = index;
    });
    setMappedOperatorArr([...newOperatorState]);
  };

  const handleChange = (event: any, rulesetId: number, fieldId: number) => {
    const {name, value} = event.target;
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
              field: isField ? mapOperators(value, rulesetId, fieldId) : prevState[rulesetIndex].fields[fieldIndex].field,
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
  /*useEffect(() => {
      console.log(Ruleset)
  }, [Ruleset]) */
  useEffect(() => console.log(mappedOperatorArr), [mappedOperatorArr])

  const deleteRulesetHandler = (priority: number) => {
    const filteredRulesets = Ruleset
      .filter((oneRuleset) => oneRuleset.priority !== priority)
      .map((oneRuleset, index) => ({...oneRuleset, priority: index + 1}))
    setRuleset(filteredRulesets);
    //FIXME Uncaught TypeError: can't access property "OperatorsPerField", mappedOperatorArr[(oneRuleset.priority - 1)] is undefined
    const filteredOptions = operatorsInRuleset
      .filter((oneOperatorField) => oneOperatorField.Ruleset !== priority - 1)
      .map((oneOperatorField, index) => ({...oneOperatorField, Ruleset: index}))
    setMappedOperatorArr(filteredOptions)
  }
  const AddRulesetHandler = () => {
    // check if IDs are duplicated
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
      ]
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

  function Reset() {
    /* TODO: delete current ruleset, not all
    //Reset Ruleset Array
    if (confirm("Are you sure you want to reset all rulesets?")) {
        window.location.reload();
        setRuleset(initialRuleset);
    }
     */
  }

  function Submit(e: any) {
    e.preventDefault()
  }

  return (
    <>
      {
        Ruleset.map((oneRuleset) => {
          const {id, priority} = oneRuleset;
          return <div key={priority}
                      className="scale-[90%] sm:scale-100
                       flex ml-auto mr-auto mt-14 w-fit p-5 outline outline-1
                                 rounded outline-gray-200 shadow-lg">
            <form
              className="w-full mr-auto ml-auto px-5">
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="mb-5 uppercase tracking-wide
                                 text-gray-700 text-2xl font-bold mb-2"
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
                            onInputChange={(e: any) => handleChange(e, oneRuleset.id, 0)}
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
                                       oneRuleset.fields[index.id].fieldID
                                     )}
                                   componentID={index.fieldID}
                                   fieldValue={undefined}
                      />
                      <SelectField label={mappedOperatorArr[oneRuleset.priority - 1].OperatorsPerField[index.id]?.id}
                                   name="operator"
                                   componentID={index.operatorID}
                                   //because priority cannot be 0
                                   options={mappedOperatorArr[oneRuleset.priority - 1].OperatorsPerField[index.id]?.operators || []}
                                   fieldValue={undefined}
                                   onSelectChange={(e: any) => handleChange(
                                     e,
                                     oneRuleset.id,
                                     oneRuleset.fields[index.id].operatorID)}
                      />
                      {/* TODO: map value depending on field */}
                      <InputField label="value"
                                  name="value"
                                  componentID={index.valueID}
                                  inputValue={index.value}
                                  inputType="text"
                                  onInputChange={(e: any) => handleChange(
                                    e,
                                    oneRuleset.id,
                                    oneRuleset.fields[index.id].valueID)}
                      />
                      <button type="button"
                              onClick={() => deleteFieldHandler(
                                oneRuleset.priority - 1,
                                oneRuleset.fields[index.id].id)}
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
                <Pricing onPricingDataSubmit={(pricingData: any) => console.log(pricingData)}/>
                <Offer/>
              </div>
              {/* submit and reset buttons*/}
              {/* TODO: submit (PUT method) and delete (DELETE method), pass current ruleset to method argument */}
              <div className="flex flex-row justify-center mt-5">
                <div className="m-5">
                  <button type="submit" value="submit" onClick={(e) => Submit(e)}
                          className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase
                             bg-slate-900 text-white rounded-lg hover:opacity-75 duration-700">save
                  </button>
                </div>
                <div className="m-5">
                  <button type="reset" value="reset" onClick={Reset}
                          className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase
                             bg-white text-black rounded-lg hover:bg-red-900 hover:text-white duration-700">reset
                  </button>
                </div>
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
    </>
  );
}