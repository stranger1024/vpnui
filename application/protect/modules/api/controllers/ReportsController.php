<?php

class ReportsController extends ApiBaseController
{

	public function actionIndex(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$this->sendResponse(["success" => 1, "data" => ["reports" => []]]);
	}

	public function actionGenerateData(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$this->sendResponse(["success" => 1, "data" => ["generate" => []]]);
	}

	public function actionTransferLogs(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		/*
		$required_params = ["month"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}
		*/
		$this->sendResponse(["success" => 1, "data" => ["transfers" => []]]);
	}


}