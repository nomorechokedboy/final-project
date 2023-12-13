package food

import (
	"api/internals/common"
)

type FoodQuery struct {
	common.Pagination
	common.Sorter
	Search string `json:"search"`
}

type WriteFood struct {
	Name              string  `json:"name"`
	Calories          float64 `json:"calories"`
	TotalFat          float64 `json:"totalFat"`
	Saturated         float64 `json:"saturated"`
	Cholesterol       float64 `json:"cholesterol"`
	Sodium            float64 `json:"sodium"`
	TotalCarbohydrate float64 `json:"total_carbohydrate"`
	Fiber             float64 `json:"fiber"`
	Sugar             float64 `json:"sugar"`
	Protein           float64 `json:"protein"`
	VitaminD          float64 `json:"vitamin_d"`
	Calcium           float64 `json:"calcium"`
	Iron              float64 `json:"iron"`
	Potassium         float64 `json:"potassium"`
	Category          string  `json:"category"`
	Concentrated      int     `json:"concentrated"`
	Fnvl              int     `json:"fnvl"`
	Rate              float64 `json:"rate"`
}

type Food struct {
	WriteFood
	Id int `json:"id"`
}

func (f Food) TableName() string {
	return "food_rate_nutrients"
}
