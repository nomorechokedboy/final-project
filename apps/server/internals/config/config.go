package config

import "github.com/ilyakaznacheev/cleanenv"

type Config struct {
	Env           string `env:"ENV"         env-default:"dev"`
	DBURL         string `env:"DB_URL"`
	HSRServiceURL string `env:"HSR_SVC_URL" env-default:"http://localhost:5000"`
}

func New() (*Config, error) {
	config := &Config{}
	if err := cleanenv.ReadEnv(config); err != nil {
		return nil, err
	}

	if config.Env == "dev" {
		if err := cleanenv.ReadConfig(".env", config); err != nil {
			return nil, err
		}
	}

	return config, nil
}
