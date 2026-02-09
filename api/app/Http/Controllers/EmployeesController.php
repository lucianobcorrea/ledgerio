<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;

class EmployeesController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if (!$user->hasRole('company')) {
            return response()->json([
                'message' => "You don't have permission to access this resource"
            ], 403);
        }
        $company = $user->company;
        $companyId = $company->id;

        $perPage = request('per_page', 10);
        $employees = User::
            where('company_id', $companyId)
            ->paginate($perPage);
        return response()->json($employees);
    }
}
