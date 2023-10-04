# frozen_string_literal: true

module Api
  module V1
    class PathUnitReportsController < ApplicationController
      def create
        op = PathUnitReports::CreateOp.submit!(path_unit_report_params.to_h)

        if op.report.present?
          report = op.report
          render json: { report: report }, status: :created
        else
          errors = op.errors
          render json: { errors: errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def path_unit_report_params
        params.require(:path_unit_report).permit(:path_unit_id, :status, :date)
      end
    end
  end
end
