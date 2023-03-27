import axios from "axios";

interface field {
    id: number;
    field: string;
    operator: string;
    value: string;
    fieldID: number;
    operatorID: number;
    valueID: number;
}

interface Ruleset {
    id: number;
    priority: number;
    number: number;
    note: string;
    fields: [field];
}

export default function api() {
    function getRuleset(id: number): any {
            axios.get("/" + id)
                .then(function (response) {
                    return JSON.parse(response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    return null
                })
                .finally(function () {
                    // always executed
                    return null
                });
        }


}