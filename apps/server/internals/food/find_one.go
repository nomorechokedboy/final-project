package food

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

// @FindOneFood godoc
// @Summary Get food details api
// @Description Get food nutrients and rate
// @Tags Food
// @Accept json
// @Param id path int true "Food ID"
// @Success 200 {object} Food
// @Failure 500 {string} string
// @Router /foods/{id} [get]
func (h *FoodHandler) FindOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		log.Println("GetFoodDetails.ParamsInt err: ", err)
		return fiber.ErrBadRequest
	}

	log.Println("GetFoodDetails id: ", id)

	resp := &Food{Id: id}
	if err := h.repo.FindOne(resp); err != nil {
		log.Println("GetFoodDetails.Query err: ", err)
		if err.Error() == "sql: no rows in result set" {
			return fiber.ErrNotFound
		}

		return fiber.ErrInternalServerError
	}

	log.Printf("GetFoodDetails success. Response: %#v\n", resp)

	return c.JSON(resp)
}
