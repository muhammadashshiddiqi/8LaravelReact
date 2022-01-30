<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isEmpty;

class ProductController extends Controller
{
    public function index(){

        $data = Product::get();
        
        return response()->json($data, 201);
    }

    public function add(Request $request){

        $hasil = Product::create([
            'name' => $request->name,
            'file_path' => $request->file('file_image')->store('products'),
            'description' => $request->description,
            'price' => $request->price
        ]);

        $rest = ['status' => 'success', 'message' => 'Product berhasil di input !', 'data' => $hasil];
        return response()->json($rest, 201);
    }

    public function delete(Request $request){
        $hasil = Product::where('id', $request->id)->delete();
        if(!$hasil){
            $rest = ['status' => 'error', 'message' => 'Product gagal di hapus !'];
        }else{
            $rest = ['status' => 'success', 'message' => 'Product berhasil di hapus !', 'data' => $hasil];
        }
        return response()->json($rest, 200);
    }

    public function update(Request $request)
    {
        $update = Product::find($request->id);
        if(!is_null($update)) {
            if($request->hasFile('file_image')){

                $update->file_path = $request->file('file_image')->store('products');

            }

            $update->name        = $request->name;
            $update->description = $request->description;
            $update->price       = $request->price;

            $update->save();

            $rest = ['status' => 'success', 'message' => 'Product berhasil di updated !', 'data' => $update];
            return response()->json($rest, 201);
        }else{

            $rest = ['status' => 'error', 'message' => 'Product tidak terdaftar', 'data' => $update];
            return response()->json($rest, 201);
        }
    }

    public function show(Request $request){
        
        $data = Product::where('id', $request->id)->get();
        return response()->json($data, 201);
    }

    public function search(Request $request){
        $data = Product::orWhere('name', 'LIKE', "%".$request->key."%")
                        ->orWhere('description', 'LIKE', "%".$request->key."%")
                        ->orWhere('price', 'LIKE', "%".$request->key."%")
                        ->get();

        return response()->json($data, 201);
    }
}
