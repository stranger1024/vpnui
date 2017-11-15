<?php

class ApiController extends ApiBaseController {

    public function actionUsers(){
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
		$this->sendResponse(["success" => 1, "data" => ["users" => []]]);
	}

    public function actionCompanies() {
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$this->sendResponse(["success" => 1, "data" => ["companies" => []]]);
	}
}
