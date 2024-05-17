package com.exam.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.models.exam.Category;
import com.exam.services.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	//add Category
	@PostMapping("/add")
	public ResponseEntity<Category> addCategory(@RequestBody Category category){
		
		Category retCategory = this.categoryService.addCategory(category);
		return ResponseEntity.ok(retCategory);
	}
	
	//getAllCategories
	@GetMapping("/")
	public ResponseEntity<Set<Category>> getAllCategory(){
		return ResponseEntity.ok(this.categoryService.getAllCategories());
	}
	
	//getCategory
	@GetMapping("/{categoryId}")
	public Category getCategory(@PathVariable("categoryId") Long categoryId) {
		return this.categoryService.getCategory(categoryId);
	}
	
	//updateCategory
	@PutMapping("/update")
	public ResponseEntity<Category> updateCategory(@RequestBody Category category){
		
		Category retCategory = this.categoryService.updateCategory(category);
		return ResponseEntity.ok(retCategory);
	}
	
	//deleteCategory
	@DeleteMapping("/{categoryId}")
	public void deleteCategory(@PathVariable("categoryId") Long categoryId) {
		this.categoryService.deleteCategory(categoryId);
	}

	
}
