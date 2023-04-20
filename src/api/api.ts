import axios from "axios";
import { Convert, Ruleset } from "./ruleset";
import { Converts, Rulesets } from "./rulesets";

export class Api {
    public static getRuleset(id: number | null): any {
        let ruleset: Ruleset;
        let rulesets: Rulesets[];
        if(typeof id == "number") {
            axios.get("/" + id)
                .then(function (response) {
                    ruleset = Convert.toRuleset(response.data)
                    return ruleset
                })
        } else {
            axios.get("/")
                .then(function (response) {
                    rulesets = Converts.toRulesets(response.data)
                    return ruleset
                })
        }
    }
}