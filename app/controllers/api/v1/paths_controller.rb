# frozen_string_literal: true

module Api
  module V1
    class PathsController < ApplicationController
      before_action :set_current_user, only: %i[create show valid_on_date]

      def create
        op = ::Paths::CreateOp.submit(path_params.merge(current_user_id: @current_user.id))

        if op.path.present?
          render json: { path: PathSerializer.new(op.path).serializable_hash[:data][:attributes] }, status: :created
        else
          render json: { errors: op.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        op = ::Paths::FetchOp.submit(user_id: @current_user.id)

        if op.path.present?
          render json: { path: PathSerializer.new(op.path).serializable_hash[:data][:attributes] }, status: :ok
        elsif op.path.nil? && op.errors.empty?
          render json: {}, status: :no_content
        else
          render json: { errors: op.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def valid_on_date
        valid = ::Paths::DetermineValidityOp.submit!(path_id: params['id'], date: params['date']).valid

        render json: { validity: valid }, status: :ok
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
    end
  end
end
