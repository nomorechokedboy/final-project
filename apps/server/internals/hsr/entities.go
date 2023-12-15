package hsr

type HSRCalcBody struct {
	Category         string  `json:"category"`
	ConcentratedFnvl float64 `json:"concentrated_fnvl"`
	Energy           float64 `json:"energy"`
	Fibre            float64 `json:"fibre"`
	Fnvl             float64 `json:"fnvl"`
	Name             string  `json:"name"`
	Protein          float64 `json:"protein"`
	SaturatedFat     float64 `json:"saturated_fat"`
	Sodium           float64 `json:"sodium"`
	TotalSugars      float64 `json:"total_sugars"`
}

type HSRCalcResponse struct {
	Data float64
}
