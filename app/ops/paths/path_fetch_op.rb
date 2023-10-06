# frozen_string_literal: true

require 'subroutine/association_fields'

module Paths
  class PathFetchOp < BaseOp
    include ::Subroutine::AssociationFields

    association :user
    validates :user, presence: true
    outputs :path

    protected

    def perform
      path = Path.includes(path_units: :path_unit_reports).find_by(user: user)
      output :path, path
    end
  end
end
