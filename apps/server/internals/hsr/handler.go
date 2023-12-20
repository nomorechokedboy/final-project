package hsr

type HSRHandler struct {
	repo       HSRRepository
	intakeRepo HSRIntakeRepository
}

func New(repo HSRRepository, intakeRepo HSRIntakeRepository) *HSRHandler {
	return &HSRHandler{repo, intakeRepo}
}
