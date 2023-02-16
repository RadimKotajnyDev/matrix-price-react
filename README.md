# Price Matrixy

## Technologie
- React
- Vite
- TypeScript

Jedná se o tool pro úpravu tzv Price Matrixů.

Price matrix je sada "ruleSetů", které podle soustavy pravidel (rules) slouží pro cenotvorbu.

Každý ruleset obsahuje následující properties

## Rule[] - kolekce pravidel (rules) viz níže



* PriceSelling - desetinné číslo

* BookingFeeAbsolute - desetinné číslo

* BookingFeeRelative - desetinné číslo

* InsideCommission - desetinné číslo

* Offer Code - string

* Note - string

* Priority - číslo

### Rule má následující properties

* FieldId - položka kolekce fieldů - viz níže

* CompareOperatorId - položka kolekce operátorů - viz níže

* Value - string



### Fieldy jsou následující

* 1             PerformanceTime

* 2             PerformanceDate

* 3             PerformanceDayOfWeek

* 4             PriceBandCode

* 5             BookingDate

* 6             FaceValue



### CompareOperatory následující

* 1             Equal

* 2             LessThanOrEqual

* 3             LessThan

* 4             GreaterThanOrEqual

* 5             GreaterThan

* 6             NotEquals

* 7             In





## API operace, které budou prováděny nad price matrixy



* GET pricematrix/{matrixId} – vratí kompletní price matrix (kolekce rulesetů) – vrací 200

* POST pricematrix/{matrixId}/ruleset – vytvoření nového rulesetu – vrací 201

* PUT pricematrix/{matrixId}/ruleset/{id} – update existujícího rulesetu – vrací 200

* DELETE pricematrix/{matrixId}/ruleset/{id} – smazání rulesetu – vrací 204





poznámka: **matrixId bude existovat vždy**





## Mapování CompareOperátorů podle Fieldu

SelectField 1 – Operatory 2,4

SelectField 2 – Operatory 1,2,3,4,5,6

SelectField 3 – Operatory 1,2,4,6

SelectField 4 – Operatory 1,6,7

SelectField 5 – Operatory 1,2,3,4,5,6

SelectField 6 – Operatory 1,2,3,4,5,6
