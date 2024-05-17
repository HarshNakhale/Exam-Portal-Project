package com.exam.services.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.models.exam.Question;
import com.exam.models.exam.Quiz;
import com.exam.repository.QuestionRepository;
import com.exam.services.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService{
	
	@Autowired
	private QuestionRepository questionRepository;
	
	@Override
	public Question addQuestion(Question question) {
		// TODO Auto-generated method stub
		return this.questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		// TODO Auto-generated method stub
		return this.questionRepository.save(question);
	}

	@Override
	public Set<Question> getAllQuestions() {
		// TODO Auto-generated method stub
		return new LinkedHashSet<>(this.questionRepository.findAll());
	}

	@Override
	public Set<Question> getAllQuestionsByQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return new LinkedHashSet<>(this.questionRepository.findByQuiz(quiz));
	}

	@Override
	public Question getQuestion(Long questionId) {
		// TODO Auto-generated method stub
		return this.questionRepository.findById(questionId).get();
	}

	@Override
	public void deleteQuestion(Long questionId) {
		// TODO Auto-generated method stub
		this.questionRepository.deleteById(questionId);
		
	}

	@SuppressWarnings("deprecation")
	@Override
	public Question get(Long questionId) {
		// TODO Auto-generated method stub
		return this.questionRepository.getOne(questionId);
	}

}
