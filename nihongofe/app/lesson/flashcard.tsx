"use client";
import { redirect } from "next/navigation";
import React, { useState, useRef, useEffect, FC } from "react";
import {
  FaPlus,
  FaTrash,
  FaRandom,
  FaPencilAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import { SessionKey, SessionStorage } from "../utils/session-storage";
import { updateStatusLesson } from "@/db/queries";

interface FlashcardSetProps {
  initFlashCards: { id: number; word: string; meaning: string }[];
}

const FlashcardSet: FC<FlashcardSetProps> = (props) => {
  const [cards, setCards] = useState(props.initFlashCards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWord, setEditedWord] = useState("");
  const [editedMeaning, setEditedMeaning] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, [currentIndex]);

  const handleFlip = () => {
    if (!isEditing) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleAdd = () => {
    const newCard = {
      id: cards.length + 1,
      word: "New Word",
      meaning: "New Meaning",
    };
    setCards([...cards, newCard]);
  };

  const handleDelete = () => {
    if (cards.length > 1) {
      const newCards = cards.filter((_, index) => index !== currentIndex);
      setCards(newCards);
      setCurrentIndex(Math.min(currentIndex, newCards.length - 1));
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      const updatedCards = cards.map((card, index) =>
        index === currentIndex
          ? { ...card, word: editedWord, meaning: editedMeaning }
          : card
      );
      setCards(updatedCards);
    } else {
      setEditedWord(cards[currentIndex]?.word || "");
      setEditedMeaning(cards[currentIndex]?.meaning || "");
    }
    setIsEditing(!isEditing);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      const lesson_id = SessionStorage.get(SessionKey.LESSON_ID) ?? "";
      updateStatusLesson(Number(lesson_id));
      SessionStorage.delete(SessionKey.LESSON_ID);
      redirect("/learn");
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Flashcards</h1>
          {!isCompleted && (
            <p className="text-gray-600">
              Card {currentIndex + 1} of {cards.length}
            </p>
          )}
        </div>

        {isCompleted ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
            <h2 className="text-2xl font-bold text-green-600">
              Congratulations!
            </h2>
            <p className="text-gray-600">
              You have completed the flashcard set!
            </p>
          </div>
        ) : (
          <div
            ref={cardRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative w-full aspect-[3/2] max-w-2xl mx-auto"
            aria-label="Flashcard"
          >
            <div
              className={`w-full h-full transition-transform duration-700 transform-gpu preserve-3d cursor-pointer ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              onClick={handleFlip}
            >
              <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-2xl p-8 flex items-center justify-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedWord}
                    onChange={(e) => setEditedWord(e.target.value)}
                    className="text-4xl font-bold text-center w-full outline-none"
                    autoFocus
                  />
                ) : (
                  <h2 className="text-4xl font-bold text-gray-800">
                    {cards[currentIndex]?.word}
                  </h2>
                )}
              </div>
              <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-2xl p-8 flex items-center justify-center rotate-y-180">
                {isEditing ? (
                  <textarea
                    value={editedMeaning}
                    onChange={(e) => setEditedMeaning(e.target.value)}
                    className="text-2xl text-center w-full h-full resize-none outline-none"
                  />
                ) : (
                  <p className="text-2xl text-gray-600">
                    {cards[currentIndex]?.meaning}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {!isCompleted && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Previous card"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <button
              onClick={handleEdit}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Edit card"
            >
              <FaPencilAlt className="text-gray-600" />
            </button>
            <button
              onClick={handleDelete}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Delete card"
            >
              <FaTrash className="text-gray-600" />
            </button>
            <button
              onClick={handleShuffle}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Shuffle cards"
            >
              <FaRandom className="text-gray-600" />
            </button>
            <button
              onClick={handleAdd}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Add new card"
            >
              <FaPlus className="text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Next card"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
            <button
              onClick={handleComplete}
              className="p-3 rounded-full bg-green-500 text-white shadow-md hover:shadow-lg hover:bg-green-600 transition-all"
              aria-label="Complete learning"
            >
              <FaCheckCircle className="text-xl" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default FlashcardSet;
