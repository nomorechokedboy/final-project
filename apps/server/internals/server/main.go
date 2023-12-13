package server

import (
	"api/internals/food"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/swagger"
	"github.com/pocketbase/dbx"

	_ "api/docs"
)

var startTime = time.Now()

type HealthCheckResonse struct {
	Message   string `json:"message"`
	Uptime    uint64 `json:"uptime"`
	Timestamp uint64 `json:"timestamp"`
}

func getHealthCheckResonse() *HealthCheckResonse {
	elapsedTime := time.Since(startTime)
	uptime := uint64(elapsedTime.Seconds())
	timestamp := uint64(time.Now().UnixNano() / int64(time.Millisecond))

	return &HealthCheckResonse{Message: "Not dead yet", Uptime: uptime, Timestamp: timestamp}
}

func healthz(c *fiber.Ctx) error {
	return c.JSON(getHealthCheckResonse())
}

func index(c *fiber.Ctx) error {
	return c.Redirect("/docs")
}

// @title Fiber Example API
// @version 1.0
// @description This is a sample swagger for Fiber
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email fiber@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @BasePath /api/v1
func New(db *dbx.DB) *fiber.App {
	app := fiber.New()

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/docs/*", swagger.HandlerDefault)
	app.Get("/healthz", healthz)
	app.Get("/", index)

	v1 := app.Group("/api/v1")
	v1.Get("/foods", func(c *fiber.Ctx) error {
		query := &food.FoodQuery{}
		if err := c.QueryParser(query); err != nil {
			log.Println("GetFoods.QueryParser err: ", err)
			return fiber.ErrBadRequest
		}

		log.Printf("GetFoods request: %#v\n", query)

		resp := make([]food.Food, 0, query.GetPageSize())
		q := db.Select("*").
			From("food_rate_nutrients").
			Offset(query.GetOffset()).
			Limit(query.GetPageSize())
		if query.Search != "" {
			q = q.Where(dbx.Like("name", query.Search))
		}

		if err := q.All(&resp); err != nil {
			log.Println("GetFoods.All err: ", err)
			return fiber.ErrInternalServerError
		}

		log.Printf("GetFoods success. Response: %#v\n", resp)

		return c.JSON(resp)
	})

	v1.Get("/foods/:id<int,min(1)>", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			log.Println("GetFoodDetails.ParamsInt err: ", err)
			return fiber.ErrBadRequest
		}

		log.Println("GetFoodDetails id: ", id)

		resp := &food.Food{}
		if err := db.Select().Model(id, resp); err != nil {
			log.Println("GetFoodDetails.Query err: ", err)
			if err.Error() == "sql: no rows in result set" {
				return fiber.ErrNotFound
			}

			return fiber.ErrInternalServerError
		}

		log.Printf("GetFoodDetails success. Response: %#v\n", resp)

		return c.JSON(resp)
	})

	v1.Post("/foods", func(c *fiber.Ctx) error {
		body := new(food.WriteFood)
		if err := c.BodyParser(body); err != nil {
			log.Println("InsertFood.BodyParser err: ", err)
			return fiber.ErrBadRequest
		}

		log.Printf("InsertFood request: %#v\n", body)
		req := &food.Food{WriteFood: *body}
		if err := db.Model(req).Insert(); err != nil {
			log.Println("InsertFood.Insert err: ", err)
			return fiber.ErrInternalServerError
		}

		log.Printf("InsertFood success. Response: %#v\n", body)

		return c.JSON(body)
	})

	v1.Put("/foods/:id<int,min(1)>", func(c *fiber.Ctx) error {
		body := new(food.WriteFood)
		if err := c.BodyParser(body); err != nil {
			log.Println("UpdateFood.BodyParser err: ", err)
			return fiber.ErrBadRequest
		}

		id, err := c.ParamsInt("id")
		if err != nil {
			log.Println("UpdateFood.ParamsInt err: ", err)
			return fiber.ErrBadRequest
		}

		log.Printf("UpdateFood request: %#v\n", body)
		req := &food.Food{WriteFood: *body, Id: id}
		if err := db.Model(req).Update(); err != nil {
			log.Println("UpdateFood.Update err: ", err)
			return fiber.ErrInternalServerError
		}

		log.Printf("UpdateFood success. Response: %#v\n", body)

		return c.JSON(body)
	})

	v1.Delete("/foods/:id<int,min(1)>", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			log.Println("DeleteFood.ParamsInt err: ", err)
			return fiber.ErrBadRequest
		}

		req := &food.Food{Id: id}
		if err := db.Model(req).Delete(); err != nil {
			log.Println("DeleteFood.Delete err: ", err)
			return fiber.ErrInternalServerError
		}

		log.Printf("DeleteFood success. Response: %#v\n", req)

		return c.JSON(req)
	})

	return app
}
