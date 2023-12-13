package food

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

// @InsertFood godoc
// @Summary Create food api
// @Description Insert food nutrients and rate for custom HSR
// @Tags Food
// @Accept json
// @Param post body WriteFood true "Create food body"
// @Success 200 {object} Food
// @Failure 500 {string} string
// @Router /foods [post]
func (h *FoodHandler) Insert(c *fiber.Ctx) error {
	body := new(WriteFood)
	if err := c.BodyParser(body); err != nil {
		log.Println("InsertFood.BodyParser err: ", err)
		return fiber.ErrBadRequest
	}

	log.Printf("InsertFood request: %#v\n", body)
	req := &Food{WriteFood: *body}
	if err := h.repo.Insert(req); err != nil {
		log.Println("InsertFood.Insert err: ", err)
		return fiber.ErrInternalServerError
	}

	log.Printf("InsertFood success. Response: %#v\n", body)

	return c.JSON(body)
}
