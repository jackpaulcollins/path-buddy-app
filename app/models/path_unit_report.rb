# frozen_string_literal: true

class PathUnitReport < ApplicationRecord
  STATUSES = %w[pass fail].freeze
  belongs_to :path_unit

  validates :status, presence: true, inclusion: { in: STATUSES }
  validates_uniqueness_of :date, scope: :path_unit_id
end
