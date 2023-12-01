package handler

import (
	"api/src/server"
	"net/http"

	"github.com/gofiber/adaptor/v2"
	_ "github.com/libsql/libsql-client-go/libsql"
	"github.com/pocketbase/dbx"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	r.RequestURI = r.URL.String()

	dbURL := "libsql://turso-crm-nomorechokedboy.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJnaWQiOiI1OWQyMWEyYi03MjE3LTExZWUtOTRhOC1lNmQ5MDFkNTVjNzgiLCJpYXQiOiIyMDIzLTExLTMwVDAzOjQyOjQ1LjA0NDQyNjUxOFoifQ.oPtKUYrBGQkykPNe5qf2u3Fwzn0gfdt1hG8XIGNjcTwL-GDVHqr0lrJMLXePPoG0aCslmloVUZD9BV2BbLu2DA"
	_, err := dbx.Open("libsql", dbURL)
	if err != nil {
		panic("failed to connect database")
	}

	handler().ServeHTTP(w, r)
}

func handler() http.HandlerFunc {
	app := server.New()

	return adaptor.FiberApp(app)
}
