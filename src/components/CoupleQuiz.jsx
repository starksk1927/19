import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, XCircle, Award, Heart, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticData } from '../data/content';

export default function CoupleQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = romanticData.quiz;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === questions[currentQ].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#f472b6']
      });
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#22d3ee', '#f472b6', '#fed7e2', '#ffd700']
      });
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <section id="quiz" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-babyCyan-400/30 text-babyCyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Gift className="w-3.5 h-3.5 text-pink-400" />
          <span>Couple Trivia & Love Lock</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          How Well Do You Know Our Story? 🧩
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Answer 3 quick questions about our journey to unlock our Official Husband & Wife Promise Certificate!
        </p>
      </div>

      {/* Quiz Card */}
      <div className="glass-card-glow rounded-3xl p-6 sm:p-10 border border-white/15 max-w-2xl mx-auto shadow-2xl">
        {!quizCompleted ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono border-b border-white/10 pb-3">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span className="text-babyCyan-300 font-bold">Score: {score}</span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white mb-6 leading-snug">
              {questions[currentQ].question}
            </h3>

            {/* Options list */}
            <div className="space-y-3">
              {questions[currentQ].options.map((opt, idx) => {
                let btnStyle = "glass-card hover:border-babyCyan-400/40 text-slate-200";

                if (isAnswered) {
                  if (idx === questions[currentQ].correct) {
                    btnStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-200";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-rose-500/20 border-rose-400 text-rose-200";
                  } else {
                    btnStyle = "opacity-40 glass-card text-slate-400";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-medium border transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === questions[currentQ].correct && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== questions[currentQ].correct && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            {isAnswered && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-babyCyan-500 to-pink-500 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  {currentQ < questions.length - 1 ? "Next Question →" : "Reveal Certificate 📜"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Official Certificate Unlocked */
          <div className="text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Award className="w-9 h-9 text-slate-950" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
              Certificate of Eternal Love 💍
            </h3>
            <span className="text-xs text-pink-300 font-semibold tracking-widest uppercase">
              Official Promise Certificate
            </span>

            {/* Certificate Parchment Frame */}
            <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50/10 via-rose-50/5 to-amber-50/10 border-2 border-amber-300/40 text-left relative">
              <div className="flex items-center justify-between border-b border-amber-300/30 pb-3 mb-4">
                <span className="text-xs font-mono text-amber-300">Registration #PonnuSchool-C1-2025</span>
                <span className="text-xs font-serif font-bold text-pink-300">Status: Destined Forever</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200 font-light">
                <p>
                  This certifies that <strong className="text-pink-300 font-serif font-bold">Kaviii</strong> and <strong className="text-cyan-300 font-serif font-bold">Hari</strong> are officially registered as Soulmates & Husband and Wifee.
                </p>
                <p>
                  From the school bus silence, through the bold March 24 proposal, and March 27 birthday acceptance, their bond is sealed with endless patience, pride, and unconditional love.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-300/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Husband:</span>
                  <span className="font-cursive text-xl text-cyan-300 font-bold">Hari 🩵</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Wifee:</span>
                  <span className="font-cursive text-xl text-pink-300 font-bold">Kaviii (Tomato Thakali 🍅)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-5 py-2 rounded-full glass-card hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors"
              >
                Play Quiz Again 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
