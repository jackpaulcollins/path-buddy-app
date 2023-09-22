# frozen_string_literal: true

module Api
  module V1
    class PathsController < ApplicationController
      def create
        current_user = validate_user!
        path = ::Paths::PathCreateOp.submit!(path_params.merge(current_user_id: current_user.id)).path
        render json: { path: }, status: :ok
      end

      def updated
        # PathUpdateOp.submit!(path_params)
      end

      def destroy
        # PathDestroyOp.submit!(path_params)
      end

      private

      # rubocop:disable Metrics/MethodLength
      def path_params
        params.require(:path).permit(
          :path_name,
          :path_description,
          :path_start_date,
          :path_end_date,
          :path_disciplines => %i[
            index
            discipline_name
            discipline_cardinality
            discipline_schedule
          ]
        )
      end
      # rubocop:enable Metrics/MethodLength
    end
  end
end
