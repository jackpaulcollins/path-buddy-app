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
      if (report = existing_report)
        update_existing_report
      else
        create_report
      end

      maybe_create_eval
      output :report, report
    end

    def existing_report
      path_unit.path_unit_reports.find_by(date: date)
    end
    memoize :existing_report

    def update_existing_report
      if existing_report.status == status && !existing_report.unanswered?
        existing_report.unanswered!
      elsif existing_report.unanswered?
        existing_report.update!(status: status)
      else
        existing_report.toggle_status!
      end
    end

    def opposing_status(_status)
      existing_report.status == 'pass' ? 'fail' : 'pass'
    end

    def create_report
      path_unit.path_unit_reports.create!(date: date, status: status)
    end

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
