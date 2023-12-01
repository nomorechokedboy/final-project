package server

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/swagger"

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
func New() *fiber.App {
	app := fiber.New()

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/docs/*", swagger.HandlerDefault)
	app.Get("/healthz", healthz)
	app.Get("/", index)

	return app
}
