package migrate

import (
	"log"
	"strconv"

	"github.com/spf13/cobra"
)

func DownCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "down",
		Short: "Migrate the database down - given the number of steps",
		Long:  ``,
		Args: func(cmd *cobra.Command, args []string) error {
			if _, err := strconv.Atoi(args[0]); err != nil {
				return err
			}
			return nil
		},
		Run: func(cmd *cobra.Command, args []string) {
			log.Println("Migrating down")
		},
	}

	return cmd
}
