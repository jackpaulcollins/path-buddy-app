# frozen_string_literal: true

module Api
  module V1
    class PathStreaksController < ApplicationController
      before_action :set_current_user, only: %i[current_streak]

      def current_streak
        streak = Paths::CurrentStreakOp.submit!(path_id: params['id'], user: @current_user).streak

        render json: { streak: }, status: :ok
      end

      private

      def set_current_user
        @current_user = validate_user!
      end
    end
  end
end
