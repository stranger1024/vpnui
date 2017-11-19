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

		Yii::app()->db->createCommand('truncate transfers')->execute();

		$users = Users::model()->findAll();
		foreach ($users as $user){
			$randomCount = rand(50, 500);
			for($i = 0; $i < $randomCount; $i++) {

				$transfer = new Transfers();
				$transfer->user_id = $user->id;
				if(!$transfer->save()){
					//print_r($transfer->getErrors());
				}
			}
		}

		$this->sendResponse(["success" => 1, "data" => []]);
	}

	public function actionCompaniesBloked(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$required_params = ["month"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}

		$companies = Companies::model()->getBlockedCompanies(Yii::app()->request->getParam("month"));

		$this->sendResponse(["success" => 1, "data" => ["companies" => $companies]]);
	}

	public function actionTransferLog(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$required_params = ["month", "company"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}

		$log = Transfers::model()->getTransfersLog(Yii::app()->request->getParam("month"), Yii::app()->request->getParam("company"));

		$this->sendResponse(["success" => 1, "data" => ["log" => $log]]);
	}


}