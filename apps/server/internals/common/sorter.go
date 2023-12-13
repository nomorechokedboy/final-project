package common

type Sorter struct {
	Sort   string `query:"sort"   validate:"oneof=asc ASC desc DESC"`
	SortBy string `query:"sortBy"`
}

func (s *Sorter) GetSort() string {
	if s.Sort == "" {
		s.Sort = "DESC"
	}

	return s.Sort
}

func (s *Sorter) GetSortBy() string {
	if s.SortBy == "" {
		s.SortBy = "created_at"
	}

	return s.SortBy
}
