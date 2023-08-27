# frozen_string_literal: true

require 'subroutine/association_fields'

class BaseOp < ::Subroutine::Op
  include ::Subroutine::AssociationFields
end
