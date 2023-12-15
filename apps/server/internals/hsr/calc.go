package hsr

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

// @CalculateHSR godoc
// @Summary Calculate food rate
// @Description Calculate food stars
// @Tags HSR
// @Accept json
// @Param post body HSRCalcBody true "HSR body"
// @Success 200 {object} HSRCalcResponse
// @Failure 500 {string} string
// @Router /hsr/calc [post]
func (h HSRHandler) Calc(c *fiber.Ctx) error {
	body := new(HSRCalcBody)
	if err := c.BodyParser(body); err != nil {
		log.Println("HSRHandler.Calc.BodyParser err: ", err)
		return fiber.ErrBadRequest
	}

	log.Printf("HSRHandler.Calc request: %#v\n", body)
	resp, err := h.repo.Calc(body)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	log.Printf("HSRHandler.Calc success. Response: %#v\n", resp)

	return c.JSON(resp)
}
