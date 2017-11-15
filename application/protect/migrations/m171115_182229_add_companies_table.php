<?php

class m171115_182229_add_companies_table extends CDbMigration
{
	public function up()
	{
		$this->createTable('companies', array(
			'id' => 'pk',
			'name' => 'TINYTEXT',
			'quota' => 'int(11) NOT NULL',
			'created' => 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
		));
	}

	public function down()
	{
//		echo "m171115_182229_add_companies_table does not support migration down.\n";
//		return false;
		$this->dropTable('companies');
	}

	/*
	// Use safeUp/safeDown to do migration with transaction
	public function safeUp()
	{
	}

	public function safeDown()
	{
	}
	*/
}