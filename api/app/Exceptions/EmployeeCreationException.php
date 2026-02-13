<?php

namespace App\Exceptions;

use Exception;

class EmployeeCreationException extends Exception
{
    public function render($request)
    {
        return response()->json(['message' => 'Company creation failed'], 400);
    }
}
