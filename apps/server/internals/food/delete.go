package food

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

// @DeleteFood godoc
// @Summary Delete food api
// @Description Delete food nutrients and rate for custom HSR
// @Tags Food
// @Accept json
// @Param id path int true "Food ID"
// @Success 200 {object} Food
// @Failure 500 {string} string
// @Router /foods/{id} [delete]
func (h *FoodHandler) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		log.Println("DeleteFood.ParamsInt err: ", err)
		return fiber.ErrBadRequest
	}

	req := &Food{Id: id}
	if err := h.repo.Delete(req); err != nil {
		log.Println("DeleteFood.Delete err: ", err)
		return fiber.ErrInternalServerError
	}

	log.Printf("DeleteFood success. Response: %#v\n", req)

	return c.JSON(req)
}
