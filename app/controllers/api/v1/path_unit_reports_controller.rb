# frozen_string_literal: true

module Api
  module V1
    class PathUnitReportsController < ApplicationController
      def create_or_toggle
        op = PathUnitReports::ToggleOp.submit(path_unit_report_params.to_h)

        if op.report.present?
          render json: { report: op.report }, status: :created
        elsif op.errors.present?
          render json: { errors: op.errors.full_messages }, status: :unprocessable_entity
        else
          head :no_content
        end
      end

      def fetch_by_day
        report = PathUnitReports::FetchOp.submit!(path_unit_id: params['id'], date: params['date']).report

        render json: { report: report }, status: :ok
      end

      private

      def path_unit_report_params
        params.require(:path_unit_report).permit(:path_unit_id, :status, :date)
      end
    end
  end
end
