package hsr

import "github.com/pocketbase/dbx"

type HSRIntakeRepo struct {
	db *dbx.DB
}

func NewHSRIntakeRepo(db *dbx.DB) HSRIntakeRepository {
	return &HSRIntakeRepo{db}
}

func (r *HSRIntakeRepo) Find(query *HSRIntakeQuery) ([]HSRIntake, error) {
	resp := make([]HSRIntake, 0, query.GetPageSize())
	q := r.db.Select(
		"hsr_intakes.id as id",
		"food.id as food_id",
		"food.name as name",
		"food.calories as calories",
		"food.total_fat as total_fat",
		"food.saturated as saturated",
		"food.cholesterol as cholesterol",
		"food.sodium as sodium",
		"food.total_carbohydrate as total_carbohydrate",
		"food.fiber as fiber",
		"food.sugar as sugar",
		"food.protein as protein",
		"food.vitamin_d as vitamin_d",
		"food.calcium as calcium",
		"food.iron as iron",
		"food.potassium as potassium",
		"food.category as category",
		"food.concentrated as concentrated",
		"food.fnvl as fnvl",
		"food.rate as rate",
	).
		From("hsr_intakes").
		Where(dbx.HashExp{"hsr_intakes.user_id": query.UserId}).
		LeftJoin("food_rate_nutrients as food", dbx.NewExp("hsr_intakes.food_id = food.id")).
		Offset(query.GetOffset()).
		Limit(query.GetPageSize()).
		OrderBy("id desc")
	if query.Search != "" {
		q = q.Where(dbx.Like("name", query.Search))
	}

	if err := q.All(&resp); err != nil {
		return nil, err
	}

	return resp, nil
}

func (r *HSRIntakeRepo) Insert(req *HSRIntakeBody) error {
	return r.db.Model(req).Insert()
}
