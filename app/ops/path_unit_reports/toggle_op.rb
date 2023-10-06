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
      # handles event in which user has clicked the same polarity twice, allowing them to 'delete' the report
      if existing_report.present?
        destroy_existing_report
        return output :report, nil
      end

      maybe_destroy_opposite_report
      report = create_report
      output :report, report
    end

    def existing_report
      path_unit.path_unit_reports.find_by(date: date, status: status)
    end
    memoize :existing_report

    def destroy_existing_report
      existing_report.destroy!
    end

    def maybe_destroy_opposite_report
      opposing_status = opposite_status(status)
      opposing_report = path_unit.path_unit_reports.find_by(date: date, status: opposing_status)

      return unless opposing_report

      opposing_report.destroy!
    end

    def opposite_status(status)
      status == 'pass' ? 'fail' : 'pass'
    end

    def create_report
      pu = path_unit.path_unit_reports.new(date: date, status: status)
      pu.save!
    end
  end
end
