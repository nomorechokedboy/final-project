package hsr

import (
	"api/internals/common"
	"api/internals/food"
	"mime/multipart"
)

type HSRCalcBody struct {
	Category         string  `json:"category"`
	ConcentratedFnvl float64 `json:"concentratedFnvl"`
	Energy           float64 `json:"energy"`
	Fibre            float64 `json:"fibre"`
	Fnvl             float64 `json:"fnvl"`
	Name             string  `json:"name"`
	Protein          float64 `json:"protein"`
	SaturatedFat     float64 `json:"saturatedFat"`
	Sodium           float64 `json:"sodium"`
	TotalSugars      float64 `json:"totalSugars"`
}

type HSRCalcResponse struct {
	Data float64 `json:"data"`
}

type HSRIntakeQuery struct {
	common.Pagination
	UserId string `query:"userId" json:"userId,omitempty" validate:"required"`
	Search string `query:"search" json:"search"`
}

type HSRIntakeBody struct {
	UserId string `json:"userId"`
	FoodId int    `json:"foodId"`
}

type HSRIntake struct {
	Id     int    `json:"id"`
	UserId string `json:"-"`
	FoodId int    `json:"-"`
	Image  string `json:"image"`
	food.Food
}

func (i HSRIntake) TableName() string {
	return "hsr_intakes"
}

func (i HSRIntakeBody) TableName() string {
	return "hsr_intakes"
}

type HSRDetectBody struct {
	Image *multipart.FileHeader
}

type HSRDetectResp struct {
	Prediction string `json:"prediction"`
	Url        string `json:"url"`
}

type HSRDetectResponse struct {
	Data string `json:"data"`
}
