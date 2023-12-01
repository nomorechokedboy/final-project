package migrate

import (
	"log"

	"github.com/spf13/cobra"
)

func UpCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "up",
		Short: "Migrate the database up",
		Long:  "Running all migrations to bring the database up to date",
		Run: func(cmd *cobra.Command, args []string) {
			log.Println("Migrating database up")
		},
	}

	return cmd
}
