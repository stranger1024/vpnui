<?php

class UsersController extends ApiBaseController
{

	public function actionIndex(){
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

	public function actionAdd(){
		if($this->getRequestType() !== "PUSH") {
			$this->requestError(405);
		}

		/*
		$required_params = ["id", "name", "email"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}
		*/
		$this->sendResponse(["success" => 1, "data" => ["create" => []]]);
	}

	public function actionUpdate(){
		if($this->getRequestType() !== "PUSH") {
			$this->requestError(405);
		}

		/*
		$required_params = ["id", "name", "email"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}
		*/
		$this->sendResponse(["success" => 1, "data" => ["update" => []]]);
	}

	public function actionDelete(){
		if($this->getRequestType() !== "PUSH") {
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
		$this->sendResponse(["success" => 1, "data" => ["delete" => []]]);
	}
}