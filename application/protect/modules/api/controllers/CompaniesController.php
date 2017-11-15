<?php

class CompaniesController extends ApiBaseController
{
	public function actionIndex() {
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$this->sendResponse(["success" => 1, "data" => ["companies" => []]]);
	}


	public function actionAdd(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		/*
		$required_params = ["device_id"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}
		*/
		$this->sendResponse(["success" => 1, "data" => ["update" => []]]);
	}

	public function actionUpdate(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		/*
		$required_params = ["id", "name", "quota"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}
		*/
		$this->sendResponse(["success" => 1, "data" => ["update" => []]]);
	}

	public function actionDelete(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		/*
		$required_params = ["id"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}
		*/
		$this->sendResponse(["success" => 1, "data" => ["update" => []]]);
	}

}