package hsr

import (
	"api/internals/config"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"path/filepath"
)

type HSRRepository interface {
	Calc(*HSRCalcBody) (*HSRCalcResponse, error)
	Detect(*HSRDetectBody) (*HSRDetectResponse, error)
}

type HSRIntakeRepository interface {
	Find(*HSRIntakeQuery) ([]HSRIntake, error)
	Insert(*HSRIntakeBody) error
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

func (r HSRRepo) Detect(rq *HSRDetectBody) (*HSRDetectResponse, error) {
	file, err := rq.Image.Open()
	if err != nil {
		log.Println("HSRRepo.Detect.Open err: ", err)
		return nil, err
	}
	defer file.Close()

	// Create a buffer to store the file content
	var buffer bytes.Buffer

	// Create a multipart writer
	writer := multipart.NewWriter(&buffer)

	// Create a form file field
	part, err := writer.CreateFormFile("image", filepath.Base(rq.Image.Filename))
	if err != nil {
		log.Println("HSRRepo.Detect.CreateFormFile err: ", err)
		return nil, err
	}

	// Copy the file content to the form file field
	if _, err = io.Copy(part, file); err != nil {
		log.Println("HSRRepo.Detect.Copy err: ", err)
		return nil, err
	}
	writer.Close()

	// Perform the request
	resp, err := r.client.Post(
		fmt.Sprintf("%s/%s/%s/%s", r.conf.HSRServiceURL, "api", "v1", "hsr/detect"),
		writer.FormDataContentType(),
		&buffer,
	)
	if err != nil {
		log.Println("HSRRepo.Detect.Post err: ", err)
		return nil, err
	}
	defer resp.Body.Close()

	respBuf, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("HSRRepo.Detect.ReadAll err: ", err)
		return nil, err
	}

	// Check the response status and handle it accordingly
	if resp.StatusCode != http.StatusOK {
		log.Printf(
			"HSRRepo.Detect status code is not ok: %v. Err: %#v\n",
			resp.StatusCode,
			string(respBuf),
		)
		return nil, errors.New("Not ok")
	}

	respData := &HSRDetectResponse{}
	if err := json.Unmarshal(respBuf, respData); err != nil {
		log.Println("HSRRepo.Detect.Unmarshal err: ", err)
		return nil, err
	}

	return respData, nil
}
