module Api
  module V1
    class PathsController < ApplicationController
      def create
        path = ::Paths::PathCreateOp.submit!(path_params).path
        render json: { path: }, status: :ok
      end

      def updated
        #PathUpdateOp.submit!(path_params)
      end
      
      def destroy
        #PathDestroyOp.submit!(path_params)
      end

      private

      def path_params
        params.require(:path).permit(
          :path_name,
          :path_description, 
          :path_start_date, 
          :path_end_date, 
          :path_disciplines => [
            :index,
            :discipline_name,
            :discipline_cardinality,
            :discipline_schedule
            ]
          )
      end

      # pathName: '',
      # pathWhy: '',
      # pathStartDate: '',
      # pathEndDate: null,
      # pathDisciplines: {},
    end
  end
end
