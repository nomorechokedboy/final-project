package hsr

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type FindHSRIntakeResp struct {
	Data []HSRIntake `json:"data"`
	Page int64       `json:"page"`
}

// @FindHSRIntake godoc
// @Summary Get list hsr intake api
// @Description Get list hsr intake
// @Tags HSR
// @Accept json
// @Param  page query int false "Page"
// @Param  pageSize query int false "Page Size"
// @Param  userId query string true "UserId"
// @Param  search query string false "Search term"
// @Success 200 {object} FindHSRIntakeResp
// @Failure 500 {string} string
// @Router /hsr/intakes [get]
func (h *HSRHandler) Find(c *fiber.Ctx) error {
	query := &HSRIntakeQuery{}
	if err := c.QueryParser(query); err != nil {
		log.Println("GetHSRIntakes.QueryParser err: ", err)
		return fiber.ErrBadRequest
	}

	if query.UserId == "" {
		log.Println("GetHSRIntakes.QueryParser err: UserId is required!")
		return fiber.ErrBadRequest
	}

	log.Printf("GetHSRIntakes request: %#v\n", query)

	data, err := h.intakeRepo.Find(query)
	if err != nil {
		log.Println("GetHSRIntakes.All err: ", err)
		return fiber.ErrInternalServerError
	}

	resp := FindHSRIntakeResp{Data: data, Page: query.GetPage()}
	log.Printf("GetHSRIntakes success. Response: %#v\n", resp)

	return c.JSON(resp)
}
