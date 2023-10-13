# frozen_string_literal: true

require 'subroutine/association_fields'

module PathUnitReports
  class ToggleOp < BaseOp
    include ::Subroutine::AssociationFields
    extend Memoist

    association :path_unit
    date :date
    string :status

    validates :path_unit_id, presence: true
    validates :date, presence: true
    validates :status, presence: true

    outputs :report

    protected

    def perform
      report = path_unit.path_unit_reports.find_or_create_by(date: date)
      maybe_update_report(report)
      maybe_create_eval
      output :report, report
    end

    def maybe_update_report(report)
      if report.status == status && !report.unanswered?
        report.unanswered!
        maybe_mark_existing_eval_incomplete
      elsif report.unanswered?
        report.update!(status: status)
      else
        report.toggle_status!
      end
    end

    def maybe_mark_existing_eval_incomplete
      return unless existing_eval

      existing_eval.incomplete! if existing_eval.completed?
    end

    def existing_eval
      PathEvaluation.find_by(path: path, date: date)
    end
    memoize :existing_eval

    def maybe_create_eval
      return unless path.all_units_answered_for_date?(date)

      status = path.valid_for_date?(date) ? 'pass' : 'fail'

      ::Paths::CreatePathEvaluationOp.submit!(status: status, path: path, date: date)
    end

    def path
      path_unit.path
    end
    memoize :path
  end
end
