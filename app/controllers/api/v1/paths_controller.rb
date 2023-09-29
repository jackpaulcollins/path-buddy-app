# frozen_string_literal: true

module Api
  module V1
    class PathsController < ApplicationController
      before_action :set_current_user, only: %i[create show]

      def create
        op = ::Paths::PathCreateOp.submit(path_params.merge(current_user_id: @current_user.id))

        if op.path.present?
          path = op.path
          render json: { path: PathSerializer.new(path).serializable_hash[:data][:attributes] }, status: :created
        else
          errors = op.errors
          render json: { errors: errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        op = ::Paths::PathFetchOp.submit(user_id: @current_user.id)

        if op.path.present?
          path = op.path
          render json: { path: PathSerializer.new(path).serializable_hash[:data][:attributes] }, status: :ok
        elsif op.path.nil? && op.errors.empty?
          render json: {}, status: :no_content
        else
          errors = op.errors
          render json: { errors: errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        # PathUpdateOp.submit!(path_params)
      end

      def destroy
        # PathDestroyOp.submit!(path_params)
      end

      private

      def set_current_user
        @current_user = validate_user!
      end

      # rubocop:disable Metrics/MethodLength
      def path_params
        params.require(:path).permit(
          :path_name,
          :path_description,
          :path_start_date,
          :path_end_date,
          :path_units => %i[
            index
            name
            polarity
            schedule
          ]
        )
      end
      # rubocop:enable Metrics/MethodLength
    end
  end
end
