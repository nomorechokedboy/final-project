package food

type FoodHandler struct {
	repo FoodRepository
}

func New(repo FoodRepository) *FoodHandler {
	return &FoodHandler{repo}
}
