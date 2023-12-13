package food

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

// @UpdateFood godoc
// @Summary Update food api
// @Description Update food nutrients and rate for custom HSR
// @Tags Food
// @Accept json
// @Param post body WriteFood true "Update food body"
// @Param id path int true "Food ID"
// @Success 200 {object} Food
// @Failure 500 {string} string
// @Router /foods/{id} [put]
func (h *FoodHandler) Update(c *fiber.Ctx) error {
	body := new(WriteFood)
	if err := c.BodyParser(body); err != nil {
		log.Println("UpdateFood.BodyParser err: ", err)
		return fiber.ErrBadRequest
	}

	id, err := c.ParamsInt("id")
	if err != nil {
		log.Println("UpdateFood.ParamsInt err: ", err)
		return fiber.ErrBadRequest
	}

	log.Printf("UpdateFood request: %#v\n", body)
	req := &Food{WriteFood: *body, Id: id}
	if err := h.repo.Update(req); err != nil {
		log.Println("UpdateFood.Update err: ", err)
		return fiber.ErrInternalServerError
	}

	log.Printf("UpdateFood success. Response: %#v\n", body)

	return c.JSON(body)
}
