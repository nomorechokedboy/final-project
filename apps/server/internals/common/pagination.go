package common

type Pagination struct {
	Page     int64 `query:"page"`
	PageSize int64 `query:"pageSize"`
}

func (p *Pagination) GetPage() int64 {
	if p.Page == 0 || p.Page < 0 {
		p.Page = 1
	}

	return p.Page
}

func (p *Pagination) GetPageSize() int64 {
	switch {
	case p.PageSize <= 0:
		p.PageSize = 10
	case p.PageSize >= 100:
		p.PageSize = 100
	}
	return p.PageSize
}

func (p *Pagination) GetOffset() int64 {
	return (p.GetPage() - 1) * p.GetPageSize()
}
