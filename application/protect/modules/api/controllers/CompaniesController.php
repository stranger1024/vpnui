<?php

class CompaniesController extends ApiBaseController
{
	public function actionIndex() {
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$companies = Companies::model()->findAll(["order" => 'quota desc']);

		$this->sendResponse(["success" => 1, "data" => $companies]);
	}


	public function actionAdd(){
		if($this->getRequestType() !== "POST") {
			$this->requestError(405);
		}

		$required_params = ["name", "quota"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}

		$company = new Companies();
		$company->name = Yii::app()->request->getParam("name");
		$company->quota = Yii::app()->request->getParam("quota");

		if($company->save()){
			$this->sendResponse(["success" => 1, "data" => []]);
		}else{
			$this->sendResponse(["success" => 0, "message" => $company->getErrors()]);
		}

	}

	public function actionUpdate(){
		if($this->getRequestType() !== "POST") {
			$this->requestError(405);
		}

		$required_params = ["id", "name", "quota"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}

		$company = Companies::model()->findByPk(Yii::app()->request->getParam("id"));
		if($company){
			$company->name = Yii::app()->request->getParam("name");
			$company->quota = Yii::app()->request->getParam("quota");

			if($company->save()){
				$this->sendResponse(["success" => 1, "data" => []]);
			}else{
				$this->sendResponse(["success" => 0, "message" => $company->getErrors()]);
			}
		}else{
			$this->sendResponse(["success" => 0, "message" => "Company not found"]);
		}
	}

	public function actionDelete(){
		if($this->getRequestType() !== "DELETE") {
			$this->requestError(405);
		}

		$required_params = ["id"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getRestParams($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}

		$company = Companies::model()->findByPk(Yii::app()->request->getRestParams("id"));
		if($company){
			$company->delete();
			$this->sendResponse(["success" => 1, "data" => []]);
		}else{
			$this->sendResponse(["success" => 0, "message" => "company not found"]);
		}
	}

}