package hsr

import (
	"api/internals/config"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type HSRRepository interface {
	Calc(*HSRCalcBody) (*HSRCalcResponse, error)
}

func NewRepo(client *http.Client, conf *config.Config) HSRRepository {
	return &HSRRepo{client, conf}
}

type HSRRepo struct {
	client *http.Client
	conf   *config.Config
}

func (r *HSRRepo) Calc(req *HSRCalcBody) (*HSRCalcResponse, error) {
	log.Printf("HSRRepo.Calc request: %#v\n", req)

	bodyString, err := json.Marshal(req)
	if err != nil {
		log.Println("HSRRepo.Calc.Marshal err: ", err)
		return nil, err
	}

	body := bytes.NewBuffer(bodyString)
	resp, err := r.client.Post(
		fmt.Sprintf("%s/%s/%s/%s", r.conf.HSRServiceURL, "api", "v1", "hsr/calc"),
		"application/json",
		body,
	)
	if err != nil {
		log.Printf("HSRRepo.Calc.Post err: %v. Request: %#v\n", err, req)
		return nil, err
	}

	defer resp.Body.Close()
	respBuf, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("HSRRepo.Calc.ReadAll err: ", err)
		return nil, err
	}
	log.Println("HSRRepo.Calc.Post success. Response: ", string(respBuf))

	respData := &HSRCalcResponse{}
	if err := json.Unmarshal(respBuf, respData); err != nil {
		log.Printf("HSRRepo.Calc.Unmarshal err: %v. Value: %v\n", err, string(respBuf))
		return nil, err
	}

	return respData, nil
}

type HSRIntakeRepository interface {
	Find(*HSRIntakeQuery) ([]HSRIntake, error)
	Insert(*HSRIntakeBody) error
}
