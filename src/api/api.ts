import axios from "axios";
import {Convert, Ruleset} from "./ruleset";
import {Converts, Rulesets} from "./rulesets";

export class Api {
    public static getRuleset(matrixId: number):any {
        axios.get("/" + matrixId)
            .then(function (response) {
                console.log(response.status)
                Converts.toRulesets(response.data)
            })
    }

    public static postRuleset(matrixId: number, ruleset: Ruleset) {
        axios.post("/" + matrixId + "ruleset", Convert.rulesetToJson(ruleset))
            .then(function (response) {
                console.log(response.status)
            })
    }

    public static putRuleset(matrixId: number, ruleset: Ruleset, id: number) {
        axios.put("/" + matrixId + "ruleset" + id, Convert.rulesetToJson(ruleset))
            .then(function (response) {
                console.log(response.status)
            })
    }

    public static deleteRuleset(matrixId: number, id: number) {
        axios.delete("/" + matrixId + "ruleset" + id)
            .then(function (response) {
                console.log(response.status)
            })
    }
}