package com.exam.controllers;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
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

import com.exam.models.exam.Question;
import com.exam.models.exam.Quiz;
import com.exam.services.QuestionService;
import com.exam.services.QuizService;


@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	//addQuestion
	@PostMapping("/add")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question){
		
		Question retQuestion = this.questionService.addQuestion(question);
		return ResponseEntity.ok(retQuestion);
	}
	
	//updateQuestion
	@PutMapping("/update")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
		
		Question retQuestion = this.questionService.updateQuestion(question);
		return ResponseEntity.ok(retQuestion);
	}
	
	//getAllQuestions
	@GetMapping("/")
	public ResponseEntity<Set<Question>> getAllQuestions(){
		
		return ResponseEntity.ok(this.questionService.getAllQuestions());
	}
	
	//getQuestion
	@GetMapping("/{questionId}")
	public Question getQuestion(@PathVariable("questionId") Long questionId) {
		return this.questionService.getQuestion(questionId);
	}
	
	@DeleteMapping("/{questionId}")
	public void deleteQuestion(@PathVariable("questionId") Long questionId) {
		this.questionService.deleteQuestion(questionId);
	}
	
	@PostMapping("/eval-quiz")
	public ResponseEntity<Map<String, Object>> evalQuiz(@RequestBody List<Question> questions) {
		Integer correctAnswer = 0;
		double marksGot = 0;
		Integer attemptedQuestions = 0;
		for(Question q: questions) {
			Question ques = this.questionService.getQuestion(q.getQuesId());
			if(ques.getAnswer().equals(q.getGivenAnswer())) {
				correctAnswer++;
				double marksSingle = Double.parseDouble(q.getQuiz().getMaxMarks())/questions.size();
				marksGot += marksSingle;
			    
			}
			
			if(q.getGivenAnswer() != null) {
				attemptedQuestions++;
			}
		}
		Map<String, Object> map = Map.of("correctAnswer", correctAnswer, "marksGot", marksGot, "attemptedQuestions", attemptedQuestions);
		return ResponseEntity.ok(map);
	}
	
	//getQuestionBySet
	@GetMapping("/quiz/{quizId}")
	public ResponseEntity<List<Question>> getQuestionsByQuiz(@PathVariable("quizId") Long quizId){
		
		Quiz quiz = this.quizService.getQuiz(quizId);
		Set<Question> questionByQuiz = quiz.getQuestions();
		
		List<Question> listOfquestionByQuiz = new ArrayList<>(questionByQuiz);
		listOfquestionByQuiz.forEach((q)->{
			q.setAnswer("");
		});
		if(listOfquestionByQuiz.size() > Integer.parseInt(quiz.getNoOfQuestions())) {
			listOfquestionByQuiz = listOfquestionByQuiz.subList(0, Integer.parseInt(quiz.getNoOfQuestions())+1);
		}
		
		
		Collections.shuffle(listOfquestionByQuiz);
		return ResponseEntity.ok(listOfquestionByQuiz);
		
	}
	
	//getQuestionBySet -- Admin
		@GetMapping("/quiz/all/{quizId}")
		public ResponseEntity<List<Question>> getQuestionsByQuizAll(@PathVariable("quizId") Long quizId){
			
			Quiz quiz = this.quizService.getQuiz(quizId);
			Set<Question> questionByQuiz = quiz.getQuestions();
			
			List<Question> listOfquestionByQuiz = new ArrayList<>(questionByQuiz);
			
//			if(listOfquestionByQuiz.size() > Integer.parseInt(quiz.getNoOfQuestions())) {
//				listOfquestionByQuiz = listOfquestionByQuiz.subList(0, Integer.parseInt(quiz.getNoOfQuestions())+1);
//			}
			Collections.shuffle(listOfquestionByQuiz);
			return ResponseEntity.ok(listOfquestionByQuiz);
			
		}
	
	
	

}
