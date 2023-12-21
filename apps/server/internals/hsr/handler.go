package hsr

import "github.com/cloudinary/cloudinary-go/v2"

type HSRHandler struct {
	repo       HSRRepository
	intakeRepo HSRIntakeRepository
	cld        *cloudinary.Cloudinary
}

func New(
	repo HSRRepository,
	intakeRepo HSRIntakeRepository,
	cld *cloudinary.Cloudinary,
) *HSRHandler {
	return &HSRHandler{repo, intakeRepo, cld}
}
