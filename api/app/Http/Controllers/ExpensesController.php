<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpensesController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $company = $user->company;
        $companyId = $company->id;

        $perPage = request('per_page', 10);
        $expenses = Expense::
            where('company_id', $companyId)
            ->paginate($perPage);
        return response()->json($expenses);
    }

    public function create()
    {

    }
}
