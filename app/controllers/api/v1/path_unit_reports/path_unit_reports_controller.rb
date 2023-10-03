# frozen_string_literal: true

module Api
  module V1
    module PathUnitReports
      class PathUnitsReportsController < ApplicationController
        def index; end

        private

        def path_unit_reports_controller
          params.require(:path_unit_report).permit(:path_id, :status, :date)
        end
      end
    end
  end
end
