package food

import (
	"github.com/pocketbase/dbx"
)

type FoodRepo struct {
	db *dbx.DB
}

func (r *FoodRepo) Delete(req *Food) error {
	return r.db.Model(req).Delete()
}

func (r *FoodRepo) Find(query *FoodQuery) ([]Food, error) {
	resp := make([]Food, 0, query.GetPageSize())
	q := r.db.Select("*").
		From("food_rate_nutrients").
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

func (r *FoodRepo) FindOne(req *Food) error {
	return r.db.Select().Model(req.Id, req)
}

func (r *FoodRepo) Insert(req *Food) error {
	return r.db.Model(req).Insert()
}

func (r *FoodRepo) Update(req *Food) error {
	return r.db.Model(req).Update()
}

func NewRepo(db *dbx.DB) FoodRepository {
	return &FoodRepo{db}
}
