import "./App.css";
import PerformanceTime from "./Fields/PerformanceTime";
import PerformanceDate from "./Fields/PerformanceDate";
import PerformanceDayOfWeek from "./Fields/PerformanceDayOfWeek";
import PriceBandCode from "./Fields/PriceBandCode";
import BookingDate from "./Fields/BookingDate";
import FaceValue from "./Fields/FaceValue";


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

const name = "Name of ticket"; //TODO: přidat operaci z API

function App() {

    /*
    API
    GET pricematrix/{matrixId} – vratí kompletní price matrix (kolekce rulesetů) – vrací 200
    POST pricematrix/{matrixId}/ruleset – vytvoření nového rulesetu – vrací 201
    PUT pricematrix/{matrixId}/ruleset/{id} – update existujícího rulesetu – vrací 200
    DELETE pricematrix/{matrixId}/ruleset/{id} – smazání rulesetu – vrací 204
    */
    

    return (
        <div className="text-center mt-10 font-Inter text-3xl">
            <h1 className="underline underline-offset-8 decoration-1 font-normal">Price Matrix Forms</h1>
            <div className="m-12 border-2 rounded-lg w-fit shadow-2xl ml-auto mr-auto block px-5">
                <h2 className="block uppercase text-gray-700 text-xl font-bold mt-4">{name}</h2>
 

                <div className="grid md:grid-cols-3">
                    <PerformanceTime/>
                    <PerformanceDate/>
                    <PerformanceDayOfWeek/>
                    <PriceBandCode/>
                    <BookingDate/>
                    <FaceValue/>
                </div>
                <div className="m-5">
                    <input type="submit" value="submit"
                           className="w-fit font-light cursor-pointer border-2 p-2 px-10 uppercase bg-slate-900 text-white rounded-xl hover:opacity-75 duration-700"/>
                </div>
            </div>
        </div>
    );
}

export default App;