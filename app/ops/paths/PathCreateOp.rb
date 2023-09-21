# frozen_string_literal: true

module Paths
  class PathCreateOp < BaseOp
    string :path_name
    string :path_description
    date :path_start_date
    date :path_end_date
    array :path_disciplines
    outputs :path

    protected

    def perform
      path = create_path!
      output :path, path
    end

    def create_path!
      Path.create! do |path|
        path.name = path_name
        path.why = path_description
        path.start_date = path_start_date
        path.end_date = path_end_date
        path.user = User.last
      end
    end
  end
end
