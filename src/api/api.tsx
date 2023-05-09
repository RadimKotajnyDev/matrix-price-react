import axios from "axios";
import {data} from "autoprefixer";
import {resolvePackageData} from "vite";

interface field {
  id: number;
  field: string;
  operator: string;
  value: string;
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

export default function api() {
  function getRuleset(matrixId: number): Ruleset[] {
    axios.get("/" + matrixId)
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

  function postRuleset(matrixId: number, newRuleset: object): Ruleset[] {
    axios.post("/" + matrixId + "/ruleset", {
      newRuleset
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  function putRuleset(matrixId: number, currentRuleset: object, currRulesetId: number): Ruleset[] {
    axios.put("/" + matrixId + "/ruleset/" + currRulesetId, {currentRuleset})
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function deleteRuleset(matrixId: number, currentRuleset: object, currRulesetId: number): Ruleset[] {
    axios.delete("/" + matrixId + "/ruleset/" + currRulesetId)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

/*
export default async function api() {
    async function getRuleset(id: number): Promise<Ruleset[]> {
        const response = await axios.get("/" + id);
        return JSON.parse(response.data);
    }
} */
