# frozen_string_literal: true

require 'subroutine/association_fields'

module PathUnitReports
  class FetchOp < BaseOp
    include ::Subroutine::AssociationFields

    association :path_unit
    date :date

    validates :path_unit_id, presence: true
    validates :date, presence: true

    outputs :report

    protected

    def perform
      report = find_report
      output :report, report
    end

    def find_report
      path_unit.path_unit_reports.find_by(date: date)
    end
  end
end
