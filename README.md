# vpnui

settings:

connect DB 

    application/protect/config/database.php
    
    'connectionString' => 'mysql:host=localhost;dbname=DB_NAME',
    'username' => 'USER_NAME',
    'password' => 'USER_PASSWORD',

run database migrate

    cd application/protect
    ./yiic migrate

set api url in file www/js/src/config.js

    baseDevUrl: "http://DOMAIN",
    baseProdUrl: "http://DOMAIN",
    
