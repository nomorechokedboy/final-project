package serve

import (
	"api/internals/config"
	"api/internals/server"
	"log"
	"os"
	"os/signal"
	"syscall"

	_ "github.com/libsql/libsql-client-go/libsql"
	"github.com/pocketbase/dbx"
	"github.com/spf13/cobra"
)

func NewServeCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "serve",
		Args:  cobra.ArbitraryArgs,
		Short: "Start the web server (default to 127.0.0.1:5005 if no domain is specified)",
		Run: func(cmd *cobra.Command, args []string) {
			log.Println("Serving dinner...")
			cfg, err := config.New()
			if err != nil {
				log.Panicln("config.New err: ", err)
			}

			db, err := dbx.MustOpen("libsql", cfg.DBURL)
			if err != nil {
				log.Panic("failed to connect database")
			}
			db.LogFunc = log.Printf

			app := server.New(db)

			go func() {
				if err := app.Listen(":5005"); err != nil {
					log.Panicf("App.Listen err: %v\n", err)
				}
			}()

			c := make(chan os.Signal, 1)
			signal.Notify(
				c,
				os.Interrupt,
				syscall.SIGTERM,
			)

			_ = <-c
			log.Println("Gracefully shutting down...")
			_ = app.Shutdown()

			log.Println("Running cleanup tasks...")

			// Your cleanup tasks go here
			// db.Close()
			// redisConn.Close()
			log.Println("Fiber was successful shutdown.")
		},
	}

	return cmd
}
