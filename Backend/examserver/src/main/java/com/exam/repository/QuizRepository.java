package com.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.exam.models.exam.Category;
import com.exam.models.exam.Quiz;

import jakarta.transaction.Transactional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long>{
	
	@Modifying
    @Transactional
	@Query(value = "DELETE FROM quiz WHERE qid = ?1", nativeQuery = true)
	public void deletdQuiz(Long qid);
	
	public List<Quiz> findByActive(Boolean b);
	public List<Quiz> findByCategoryAndActive(Category category, Boolean b);

}
