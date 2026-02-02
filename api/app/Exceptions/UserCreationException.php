<?php

namespace App\Exceptions;

use Exception;

class UserCreationException extends Exception
{
    public function render($request)
    {
        return response()->json(['message' => 'User creation failed'], 400);
    }
}
