# frozen_string_literal: true

class PathSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :state, :user_id, :start_date, :end_date, :why

  # rubocop:disable Style/SymbolProc
  attribute :path_units do |path|
    path.path_units
  end
  # rubocop:enable Style/SymbolProc
end
