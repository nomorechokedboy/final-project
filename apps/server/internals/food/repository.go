package food

type FoodRepository interface {
	Delete(*Food) error
	Find(*FoodQuery) ([]Food, error)
	FindOne(*Food) error
	Insert(*Food) error
	Update(*Food) error
}
