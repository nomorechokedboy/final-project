package cmd

import (
	"api/cmd/migrate"
	"api/cmd/serve"
	"log"

	"github.com/spf13/cobra"
)

func New() *cobra.Command {
	cmd := &cobra.Command{Use: "server"}

	cmd.AddCommand(migrate.NewMigrateCommand())
	cmd.AddCommand(serve.NewServeCommand())

	return cmd
}

func Exec() {
	cmd := New()
	if err := cmd.Execute(); err != nil {
		log.Fatalf("Exec err: %v\n", err)
	}
}
