<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RolesController extends Controller
{
    public function roles()
    {
        $roles = Auth::user()->getRoleNames();
        return $roles;
    }
}
