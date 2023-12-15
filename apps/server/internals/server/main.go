package server

import (
	"api/internals/config"
	"api/internals/food"
	"api/internals/hsr"
	"net/http"
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

func New(db *dbx.DB, conf *config.Config) *fiber.App {
	app := fiber.New()

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/docs/*", swagger.HandlerDefault)
	app.Get("/healthz", healthz)
	app.Get("/", index)

	foodRepo := food.NewRepo(db)
	foodHandler := food.New(foodRepo)

	client := &http.Client{Timeout: 30 * time.Second}
	hsrRepo := hsr.NewRepo(client, conf)
	hsrHandler := hsr.New(hsrRepo)

	v1 := app.Group("/api/v1")

	foods := v1.Group("/foods")
	foods.Get("", foodHandler.Find)
	foods.Get("/:id<int,min(1)>", foodHandler.FindOne)
	foods.Post("", foodHandler.Insert)
	foods.Put("/:id<int,min(1)>", foodHandler.Update)
	foods.Delete("/:id<int,min(1)>", foodHandler.Delete)

	hsr := v1.Group("/hsr")
	hsr.Post("/calc", hsrHandler.Calc)

	return app
}
