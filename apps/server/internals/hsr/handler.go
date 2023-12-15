package hsr

type HSRHandler struct {
	repo HSRRepository
}

func New(repo HSRRepository) *HSRHandler {
	return &HSRHandler{repo}
}
