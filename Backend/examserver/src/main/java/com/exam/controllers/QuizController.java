package com.exam.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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
import com.exam.models.exam.Question;
import com.exam.models.exam.Quiz;
import com.exam.services.CategoryService;
import com.exam.services.QuizService;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

	@Autowired
	private QuizService quizService;

	@Autowired
	private CategoryService categoryService;

	// add Quiz
	@PostMapping("/add")
	public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {

		Quiz retQuiz = this.quizService.addQuiz(quiz);
		return ResponseEntity.ok(retQuiz);
	}

	// update Quiz
	@PutMapping("/update")
	public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) {
		Quiz retQuiz = this.quizService.updateQuiz(quiz);
		return ResponseEntity.ok(retQuiz);
	}

	// getAllQuizzes
	@GetMapping("/")
	public ResponseEntity<Set<Quiz>> getAllQuizzes() {
		return ResponseEntity.ok(this.quizService.getAllQuizzes());
	}

	// getQuiz
	@GetMapping("/{quizId}")
	public Quiz getQuiz(@PathVariable("quizId") Long quizId) {
		return this.quizService.getQuiz(quizId);
	}

	// deleteQuiz
	@DeleteMapping("/{quizId}")
	public void deleteQuiz(@PathVariable("quizId") Long quizId) {
		this.quizService.deleteQuiz(quizId);
	}

	@GetMapping("/category/all/{cid}")
	public ResponseEntity<List<Quiz>> getQuizByCategory(@PathVariable("cid") Long cid) {

		Category cat = this.categoryService.getCategory(cid);
		Set<Quiz> quizByCategory = cat.getQuizzes();

		List<Quiz> listOfquizByCategory = new ArrayList<>(quizByCategory);

//		if(listOfquestionByQuiz.size() > Integer.parseInt(quiz.getNoOfQuestions())) {
//			listOfquestionByQuiz = listOfquestionByQuiz.subList(0, Integer.parseInt(quiz.getNoOfQuestions())+1);
//		}
		Collections.shuffle(listOfquizByCategory);
		return ResponseEntity.ok(listOfquizByCategory);

	}

	@GetMapping("/category/active/{cid}")
	public ResponseEntity<List<Quiz>> getActiveQuizByCategory(@PathVariable("cid") Long cid) {

		Category cat = this.categoryService.getCategory(cid);

		List<Quiz> listOfActivequizByCategory = this.quizService.getActiveQuizOfCategory(cat);
		Collections.shuffle(listOfActivequizByCategory);
		return ResponseEntity.ok(listOfActivequizByCategory);

	}

	// getAllActiveQuizzes
	@GetMapping("/active")
	public ResponseEntity<List<Quiz>> getAllActiveQuizzes() {
		return ResponseEntity.ok(this.quizService.getActiveQuiz());
	}

}
