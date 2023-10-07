# frozen_string_literal: true

require 'subroutine/association_fields'

module Paths
  class DetermineValidityOp < BaseOp
    include ::Subroutine::AssociationFields
    association :path
    date :date
    outputs :valid

    protected

    def perform
      output :valid, path.valid_for_date?(date)
    end
  end
end
