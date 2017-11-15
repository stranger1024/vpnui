<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity {
    
    private $_id;
    /**
     * Authenticates a user.
     * The example implementation makes sure if the username and password
     * are both 'demo'.
     * In practical applications, this should be changed to authenticate
     * against some persistent user identity storage (e.g. database).
     * @return boolean whether authentication succeeds.
     */
    public function authenticate() {
        $user = Users::model()->findByAttributes(array(
            'user_email' => $this->username,
        ));
        if (is_object($user)) {
            if (UserCrypt::verify($this->password, $user->user_password)) {
                
                $user->user_password_recovered = 0;
                $user->save(false);
                
                # remove password from the users's object
                unset($user->user_password);

                # default CUserIdentity id is username, so this is needed like
                # getId() method below too.
                $this->_id = $user->user_id;

                # adding whole user attributes array into a user
                $this->setPersistentStates($user->getAttributes());
                $this->errorCode = self::ERROR_NONE;
            } else {
                $this->errorCode = self::ERROR_PASSWORD_INVALID;
            }
        } else {
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        }
        return !$this->errorCode;
    }

}
