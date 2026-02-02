<?php

namespace App\Exceptions;

use Exception;

class CompanyCreationException extends Exception
{
    public function render($request)
    {
        return response()->json(['message' => 'Company creation failed'], 400);
    }
}
