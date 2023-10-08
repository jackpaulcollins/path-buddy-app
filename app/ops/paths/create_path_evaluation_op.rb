# frozen_string_literal: true

require 'subroutine/association_fields'

module Paths
  class CreatePathEvaluationOp < BaseOp
    include ::Subroutine::AssociationFields
    extend Memoist

    association :path
    date :date
    string :status

    validates :path, presence: true
    validates :date, presence: true
    validates :status, presence: true

    outputs :evaluation

    protected

    def perform
      if (evaluation = existing_evaluation)
        maybe_update_existing_evaluation
        output :evaluation, evaluation
      else
        output :evaluation, create_evaluation!
      end
    end

    def create_evaluation!
      path.path_evaluations.create!(date: date, status: status)
    end

    def maybe_update_existing_evaluation
      return if existing_evaluation.status == status

      if existing_evaluation.incomplete?
        existing_evaluation.update!(status: status)
      else
        existing_evaluation.toggle_status!
      end
    end

    def opposing_status(status)
      status == 'pass' ? 'fail' : 'pass'
    end

    def existing_evaluation
      PathEvaluation.find_by(date: date)
    end
    memoize :existing_evaluation
  end
end
