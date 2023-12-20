package hsr

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

// @InsertHSRIntake godoc
// @Summary Create food api
// @Description Insert food nutrients and rate for custom HSR
// @Tags HSR
// @Accept json
// @Param post body HSRIntakeBody true "Create food body"
// @Success 200 {object} HSRIntake
// @Failure 500 {string} string
// @Router /hsr/intakes [post]
func (h *HSRHandler) Insert(c *fiber.Ctx) error {
	body := new(HSRIntakeBody)
	if err := c.BodyParser(body); err != nil {
		log.Println("InsertHSRIntake.BodyParser err: ", err)
		return fiber.ErrBadRequest
	}

	log.Printf("InsertHSRIntake request: %#v\n", body)
	if err := h.intakeRepo.Insert(body); err != nil {
		log.Println("InsertHSRIntake.Insert err: ", err)
		return fiber.ErrInternalServerError
	}

	log.Printf("InsertHSRIntake success. Response: %#v\n", body)

	return c.JSON(body)
}
