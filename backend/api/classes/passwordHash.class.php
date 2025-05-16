<?php

class passwordHash
{
  function hash($password)
  {
    return password_hash($password, PASSWORD_DEFAULT);
  }

  function verify($password, $hashed)
  {
    return password_verify($password, $hashed);
  }
}

?>
