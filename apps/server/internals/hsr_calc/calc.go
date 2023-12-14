package hsrcalc

import (
	"api/internals/food"
	"errors"
)

func Calc(req *food.Food) (float64, error) {
	switch req.Category {
	case "1":
		if req.Name == "Water" {
			return 5.0, nil
		} else if req.Name == "Unsweetened Flavoured Water" {
			return 4.5, nil
		} else {
			return 0, nil
		}
	case "1D":
		return 0, nil
	case "2":
		return 0, nil
	case "2D":
		return 0, nil
	case "3":
		return 0, nil
	case "3D":
		return 0, nil
	default:
		return 0, errors.New("Invalid Category")
	}
}
