import "./App.css";
import PerformanceTime from "./components/PerformanceTime";
import PerformanceDate from "./components/PerformanceDate";
import PerformanceDayOfWeek from "./components/PerformanceDayOfWeek";
import PriceBandCode from "./components/PriceBandCode";
import BookingDate from "./components/BookingDate";
import FaceValue from "./components/FaceValue";

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
            <PerformanceTime />
        </div>
    );
}

export default App;