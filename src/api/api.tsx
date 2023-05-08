import axios from "axios";
import {data} from "autoprefixer";

interface field {
    id: number;
    field: string;
    operator: string;
    value: string;
    fieldID: number;
    operatorID: number;
    valueID: number;
}

interface pricing {
    BookingFeeAbsolute: number,
    BookingFeePercent: number,
    PriceSelling: number,
    InsideCommission: number
}

interface Ruleset {
    id: number;
    priority: number;
    number: number;
    note: string;
    fields: [field];
    pricing: [pricing],
    offerCode: string,
}
/*
export default function api() {
    function getRuleset(id: number): Ruleset[] {
        axios.get("/" + id)
            .then(function (response) {
                return JSON.parse(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return []
            })
            .finally(function () {
                // always executed
                console.log("done");
            });
    }
}
 */
export default async function api() {
    async function getRuleset(id: number): Promise<Ruleset[]> {
        const response = await axios.get("/" + id);
        return JSON.parse(response.data);
    }

    const ruleset = await getRuleset(123);
    console.log(ruleset);
}
