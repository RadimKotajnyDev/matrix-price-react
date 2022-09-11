import "./App.css";
import Field1 from "./components/Field1";
import Field2 from "./components/Field2";
import Field3 from "./components/Field3";
import Field4 from "./components/Field4";
import Field5 from "./components/Field5";
import Field6 from "./components/Field6";

/*
Rule[] - kolekce pravidel (rules) viz níže

 

PriceSelling - desetinné číslo

BookingFeeAbsolute - desetinné číslo

BookingFeeRelative - desetinné číslo

InsideCommission - desetinné číslo

Offer Code - string

Note - string

Priority - číslo

Rule má následující properties

FieldId - položka kolekce fieldů - viz níže

CompareOperatorId - položka kolekce operátorů - viz níže

Value - string
*/

function App() {
    return (
        <div className="text-center mt-10 font-Inter text-3xl">
            <h1 className="underline underline-offset-8 decoration-1 font-normal">Price Matrix Forms</h1>
            <p className="font-light text-sm p-2 bg-gray-200 text-gray-700 m-2 rounded w-fit mt-5 ml-auto mr-auto block">Improve
                this page as you wish.</p>
            <Field1 />
        </div>
    );
}

export default App;