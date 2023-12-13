package handler

import (
	"api/internals/config"
	"api/internals/server"
	"log"
	"net/http"

	"github.com/gofiber/adaptor/v2"
	_ "github.com/libsql/libsql-client-go/libsql"
	"github.com/pocketbase/dbx"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	r.RequestURI = r.URL.String()

	cfg, err := config.New()
	if err != nil {
		log.Panicln("config.New err: ", err)
	}

	db, err := dbx.MustOpen("libsql", cfg.DBURL)
	if err != nil {
		panic("failed to connect database")
	}

	handler(db).ServeHTTP(w, r)
}

func handler(db *dbx.DB) http.HandlerFunc {
	app := server.New(db)

	return adaptor.FiberApp(app)
}
