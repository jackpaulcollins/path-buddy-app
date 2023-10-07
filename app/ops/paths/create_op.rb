# frozen_string_literal: true

module Paths
  class CreateOp < BaseOp
    string :path_name
    string :path_description
    integer :current_user_id
    date :path_start_date
    date :path_end_date
    array :path_units
    outputs :path

    validates :path_name, presence: true
    validates :path_start_date, presence: true
    validates :path_units, presence: true

    protected

    def perform
      path = create_path
      create_path_units(path)
      path.save!
      output :path, path
    end

    def create_path
      Path.new(
        name: path_name,
        why: path_description,
        start_date: path_start_date,
        end_date: path_end_date,
        user_id: current_user_id
      )
    end

    def create_path_units(path)
      path_units.each { |d| path.path_units.build(d.except(:index)) }
    end
  end
end
