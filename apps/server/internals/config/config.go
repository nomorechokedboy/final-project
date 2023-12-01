package config

import "github.com/ilyakaznacheev/cleanenv"

type Database struct {
	DB_URL string `env:"DB_URL"`
}

type Config struct {
	Env   string `env:"ENV"    env-default:"dev"`
	DBURL string `env:"DB_URL"`
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
