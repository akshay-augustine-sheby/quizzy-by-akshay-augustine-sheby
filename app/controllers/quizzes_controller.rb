# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[update destroy show]

  def index
    quizzes = @current_user.quizzes.all.order("created_at DESC").as_json(only: %i[name slug user_id])
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    @quiz = @current_user.quizzes.new(quiz_params)
    if @quiz.save
      render status: :ok,
        json: { notice: "Quiz is successfully created" }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: "Quiz is successfully deleted" }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def show
    hash_name = {}
    if @quiz
      @questions = @quiz.questions
      @questions.each do |question|
        @options = question.options
        arr_name = []
        @options.each do |option|
          arr_name.push(option.name)
        end
        hash_name[question.id] = arr_name
      end
      render status: :ok, json: { quiz: @quiz, questions: @questions, options: hash_name }
    else
      render status: :not_found, json: { error: "Quiz not found" }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :published)
    end

    def load_quiz
      @quiz = @current_user.quizzes.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { error: "Quiz not found" }
      end
    end
end
