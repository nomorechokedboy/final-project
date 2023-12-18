package food

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type FindFoodResp struct {
	Data []Food `json:"data"`
	Page int64  `json:"page"`
}

// @FindFood godoc
// @Summary Get list food details api
// @Description Get list food nutrients and rate
// @Tags Food
// @Accept json
// @Param  page query int false "Page"
// @Param  pageSize query int false "Page Size"
// @Param  sort query string false "Sort direction" Enums(asc, desc) default(desc)
// @Param  search query string false "Search term"
// @Success 200 {object} FindFoodResp
// @Failure 500 {string} string
// @Router /foods [get]
func (h *FoodHandler) Find(c *fiber.Ctx) error {
	query := &FoodQuery{}
	if err := c.QueryParser(query); err != nil {
		log.Println("GetFoods.QueryParser err: ", err)
		return fiber.ErrBadRequest
	}

	log.Printf("GetFoods request: %#v\n", query)

	data, err := h.repo.Find(query)
	if err != nil {
		log.Println("GetFoods.All err: ", err)
		return fiber.ErrInternalServerError
	}

	resp := FindFoodResp{Data: data, Page: query.GetPage()}
	log.Printf("GetFoods success. Response: %#v\n", resp)

	return c.JSON(resp)
}
