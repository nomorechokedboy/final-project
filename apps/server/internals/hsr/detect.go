package hsr

import (
	"context"
	"log"
	"time"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gofiber/fiber/v2"
)

// @HSRDetect godoc
// @Summary Detect food
// @Description Detect food
// @Tags HSR
// @Accept json
// @Param image formData file true "HSR image"
// @Success 200 {object} HSRDetectResp
// @Failure 500 {string} string
// @Router /hsr/detect [post]
func (h HSRHandler) Detect(c *fiber.Ctx) error {
	image, err := c.FormFile("image")
	if err != nil {
		log.Println("HSRHandler.Detect.FormFile err: ", err)
		return fiber.ErrBadRequest
	}

	log.Printf("HSRHandler.Detect request: %#v\n", image.Filename)
	repoResp, err := h.repo.Detect(&HSRDetectBody{Image: image})
	if err != nil {
		log.Println("HSRHandler.Detect err: ", err)
		return fiber.ErrInternalServerError
	}

	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	file, err := image.Open()
	if err != nil {
		log.Println("HSRHandler.Detect.Open err: ", err)
		return fiber.ErrInternalServerError
	}

	uploaded, err := h.cld.Upload.Upload(ctx, file, uploader.UploadParams{PublicID: image.Filename})
	if err != nil {
		log.Println("HSRHandler.Detect.Upload err: ", err)
		return fiber.ErrInternalServerError
	}

	resp := HSRDetectResp{Prediction: repoResp.Data, Url: uploaded.SecureURL}

	log.Printf("HSRHandler.Detect success. Response: %#v\n", resp)

	return c.JSON(resp)
}
