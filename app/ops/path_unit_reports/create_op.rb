# frozen_string_literal: true

require 'subroutine/association_fields'

module PathUnitReports
  class CreateOp < BaseOp
    include ::Subroutine::AssociationFields

    association :path_unit
    date :date
    string :status

    validates :path_unit_id, presence: true
    validates :date, presence: true
    validates :status, presence: true, inclusion: { in: PathUnitReport::STATUSES }

    outputs :report

    protected

    def perform
      maybe_destroy_opposite_report
      report = maybe_create_report
      output :report, report
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

    def maybe_create_report
      path_unit.path_unit_reports.find_or_create_by!(date: date, status: status)
    end
  end
end
