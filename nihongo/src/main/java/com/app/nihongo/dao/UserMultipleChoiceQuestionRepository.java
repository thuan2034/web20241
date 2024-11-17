package com.app.nihongo.dao;

import com.app.nihongo.entity.UserMultipleChoiceQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserMultipleChoiceQuestionRepository extends JpaRepository<UserMultipleChoiceQuestion, Integer> {
    @Query("SELECT umcq.isCompleted " +
            "FROM UserMultipleChoiceQuestion umcq " +
            "WHERE umcq.user.userId = :userId AND umcq.multipleChoiceQuestion.mcqId = :mcqId")
    Boolean isCompletedByUserAndQuestion(@Param("userId") Integer userId, @Param("mcqId") Integer mcqId);
    Boolean existsByUser_UserIdAndMultipleChoiceQuestion_McqId(Integer userId, Integer mcqId);
    Optional<UserMultipleChoiceQuestion> findByUser_UserIdAndMultipleChoiceQuestion_McqId(Integer userId, Integer mcqId);
}
