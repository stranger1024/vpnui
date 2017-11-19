<?php

/**
 * This is the model class for table "transfers".
 *
 * The followings are the available columns in table 'transfers':
 * @property integer $id
 * @property integer $user_id
 * @property string $bites
 * @property string $resourse
 * @property string $date
 *
 * The followings are the available model relations:
 * @property Users $user
 */
class Transfers extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'transfers';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id', 'required'),
			array('user_id', 'numerical', 'integerOnly'=>true),
			array('bites', 'length', 'max'=>20),
			array('resourse', 'length', 'max'=>1024),
			array('date', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, user_id, bites, resourse, date', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'user' => array(self::BELONGS_TO, 'Users', 'user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'user_id' => 'User',
			'bites' => 'Bites',
			'resourse' => 'Resourse',
			'date' => 'Date',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('bites',$this->bites,true);
		$criteria->compare('resourse',$this->resourse,true);
		$criteria->compare('date',$this->date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Transfers the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	protected function beforeSave() {
		if (!parent::beforeSave()) {
			return false;
		}

		$faker = Faker\Factory::create();
		$randomDateTime = $faker->dateTimeBetween("-6 month", "now");
		$max = $this->changeType(10, "B", "TB");
		$randomBite = $faker->numberBetween(100, $max);
		$randomResourse = $faker->url();

		$this->bites = $randomBite;
		$this->resourse = $randomResourse;
		$this->date = $randomDateTime->format("Y-m-d H:i:s");

		return true;
	}

	public function changeType($size, $type, $end){
		$arr = ['B', 'KB', 'MB', 'GB', 'TB'];
		$tSayi = array_search($type, $arr);
		$eSayi = array_search($end, $arr);
		$pow = $eSayi - $tSayi;
		return $size * pow(1024, $pow); // . ' ' . $end;
	}

	public function getTransfersLog($month, $company){
		$startDate = "2017-".$month."-01 00:00:00";
		$endDate = "2017-".$month."-".date("t", strtotime($startDate))." 23:59:59";

		$transfers = Yii::app()->db->createCommand('
			select u.name, tr.date, tr.resourse, tr.bites from users u
			left join transfers tr on u.id = tr.user_id
			where tr.date between "'.$startDate.'" and "'.$endDate.'" and u.company_id = '.$company.'
			order by tr.bites desc
		')->queryAll();

		$result = [];
		foreach ($transfers as $k => $v){
			$result[] = [
				"user" => $v["name"],
				"date" => date("d M Y H:i:s", strtotime($v["date"])),
				"resourse" => $v["resourse"],
				"bites" => $this->changeType($v["bites"], "GB", "B"),
			];
		}
		return $result;
	}

}
